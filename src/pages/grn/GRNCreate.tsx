
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileUp, Package, PackageCheck, Search, Trash2, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface GRNItem {
  item_name: string;
  description: string;
  quantity: number;
  unit_price: number;
  asset_category: string;
  condition_notes: string;
  request_id?: string;
  location?: string;
}

interface ApprovedRequest {
  id: string;
  title: string;
  asset_category: string;
  quantity: number;
  unit_cost: number;
  status: string;
  created_by: string;
  created_at: string;
  description?: string;
}

const LOCATIONS = [
  "Main Office",
  "Warehouse A",
  "Warehouse B",
  "Branch Office 1",
  "Branch Office 2",
  "IT Department",
  "Finance Department",
  "Operations"
];

export default function GRNCreate() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryNote, setDeliveryNote] = useState("");
  const [grnNumber, setGrnNumber] = useState("");
  const [purchaseOrderNumber, setPurchaseOrderNumber] = useState("");
  const [items, setItems] = useState<GRNItem[]>([]);
  const [supplierName, setSupplierName] = useState("");
  const [receivedDate, setReceivedDate] = useState("");
  const [notes, setNotes] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [approvedRequests, setApprovedRequests] = useState<ApprovedRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchApprovedRequests();
    generateDocumentNumbers();
  }, []);

  const generateDocumentNumbers = async () => {
    const today = format(new Date(), 'yyyyMMdd');
    
    // Get today's GRNs using eq and then filter with ilike
    const { data: todayGrns } = await supabase
      .from('goods_receipt_notes')
      .select('grn_number')
      .eq('status', 'DRAFT')
      .eq('grn_number', `GRN-${today}-%`);

    const { data: todayPos } = await supabase
      .from('goods_receipt_notes')
      .select('purchase_order_number')
      .eq('status', 'DRAFT')
      .eq('purchase_order_number', `PO-${today}-%`);

    // Calculate next sequence numbers
    const nextGrnSeq = String((todayGrns?.length || 0) + 1).padStart(4, '0');
    const nextPoSeq = String((todayPos?.length || 0) + 1).padStart(4, '0');

    // Set the generated numbers
    setGrnNumber(`GRN-${today}-${nextGrnSeq}`);
    setPurchaseOrderNumber(`PO-${today}-${nextPoSeq}`);
  };

  const fetchApprovedRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('requests')
        .select('*')
        .eq('status', 'APPROVED')
        .eq('grn_status', 'PENDING');

      if (error) throw error;

      setApprovedRequests(data || []);
      const initialItems = (data || []).map(request => ({
        item_name: request.title,
        description: request.description || '',
        quantity: request.quantity,
        unit_price: request.unit_cost,
        asset_category: request.asset_category,
        condition_notes: '',
        request_id: request.id,
        location: ''
      }));
      setItems(initialItems);
    } catch (error) {
      console.error('Error fetching approved requests:', error);
      toast({
        title: "Error",
        description: "Failed to load approved requests",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof GRNItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: grn, error: grnError } = await supabase
        .from('goods_receipt_notes')
        .insert({
          supplier_name: supplierName,
          received_date: receivedDate,
          notes,
          status: 'DRAFT',
          workflow_step: 1,
          grn_number: grnNumber,
          purchase_order_number: purchaseOrderNumber,
          created_by: (await supabase.auth.getUser()).data.user?.id
        })
        .select()
        .single();

      if (grnError) throw grnError;

      const { error: itemsError } = await supabase
        .from('grn_items')
        .insert(
          items.map(item => ({
            grn_id: grn.id,
            ...item,
            total_price: item.quantity * item.unit_price
          }))
        );

      if (itemsError) throw itemsError;

      for (const item of items) {
        if (item.request_id) {
          const { error: requestError } = await supabase
            .from('requests')
            .update({ grn_status: 'RECEIVED' })
            .eq('id', item.request_id);

          if (requestError) throw requestError;
        }
      }

      if (attachments.length > 0) {
        for (const file of attachments) {
          const fileExt = file.name.split('.').pop();
          const filePath = `${grn.id}/${crypto.randomUUID()}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from('grn-attachments')
            .upload(filePath, file);

          if (uploadError) throw uploadError;
        }
      }

      toast({
        title: "Success",
        description: "GRN created successfully",
      });

      navigate(`/grn/${grn.id}`);
    } catch (error) {
      console.error('Error creating GRN:', error);
      toast({
        title: "Error",
        description: "Failed to create GRN. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  return (
    <Sheet open onOpenChange={() => navigate('/grn')} modal>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-3xl overflow-y-auto"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <PackageCheck className="h-5 w-5" />
            Record Goods Receipt
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Package className="h-5 w-5" />
              Delivery Information
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="grnNumber">GRN Number</Label>
                <Input
                  id="grnNumber"
                  value={grnNumber}
                  readOnly
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purchaseOrderNumber">Purchase Order Number</Label>
                <Input
                  id="purchaseOrderNumber"
                  value={purchaseOrderNumber}
                  readOnly
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplierName">Supplier Name</Label>
                <Input
                  id="supplierName"
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                  placeholder="Enter supplier name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deliveryNote">Delivery Note #</Label>
                <Input
                  id="deliveryNote"
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  placeholder="Enter delivery note number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="receivedDate">Received Date</Label>
                <Input
                  id="receivedDate"
                  type="date"
                  value={receivedDate}
                  onChange={(e) => setReceivedDate(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any additional notes about this delivery"
                rows={3}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Package className="h-5 w-5" />
              Items to Receive
            </div>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="border p-4 rounded-lg space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="font-medium">{item.item_name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} items at ${item.unit_price} each
                      </p>
                      <Badge variant="outline" className="mt-1">
                        {item.asset_category}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`location-${index}`}>Receiving Location</Label>
                      <Select
                        value={item.location}
                        onValueChange={(value) => updateItem(index, 'location', value)}
                        required
                      >
                        <SelectTrigger id={`location-${index}`}>
                          <SelectValue placeholder="Select a location" />
                        </SelectTrigger>
                        <SelectContent>
                          {LOCATIONS.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`condition-${index}`}>Condition Notes</Label>
                      <Textarea
                        id={`condition-${index}`}
                        value={item.condition_notes}
                        onChange={(e) => updateItem(index, 'condition_notes', e.target.value)}
                        placeholder="Enter any notes about the condition of the items"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {items.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No approved requests awaiting delivery
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <FileUp className="h-5 w-5" />
              Supporting Documents
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="w-full"
                >
                  <FileUp className="h-4 w-4 mr-2" />
                  Upload Documents
                </Button>
              </div>
              {attachments.length > 0 && (
                <div className="space-y-2">
                  {attachments.map((file, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-2 bg-muted rounded-md"
                    >
                      <span className="text-sm truncate">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4 sticky bottom-0 py-4 bg-background border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/grn')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || items.length === 0}
            >
              {isSubmitting ? "Creating..." : "Create GRN"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
