
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import type { MaintenanceTask } from "@/types/maintenance";
import { Upload, FileCheck } from "lucide-react";
import { toast } from "sonner";

interface MaintenanceDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: MaintenanceTask | null;
}

export function MaintenanceDetailDialog({
  open,
  onOpenChange,
  task
}: MaintenanceDetailDialogProps) {
  if (!task) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real implementation, this would upload the file to a server
      console.log("Uploading file:", file.name);
      toast.success("Invoice uploaded successfully");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Maintenance Task Details</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Task ID</Label>
            <div className="col-span-3">
              <Input value={task.id} readOnly />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Asset</Label>
            <div className="col-span-3">
              <Input value={task.assetName} readOnly />
              <p className="text-sm text-muted-foreground mt-1">ID: {task.assetId}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Scheduled Date</Label>
            <div className="col-span-3">
              <Input 
                value={format(new Date(task.scheduledDate), 'PPP')} 
                readOnly 
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Cost</Label>
            <div className="col-span-3">
              <Input value={`$${task.cost.toFixed(2)}`} readOnly />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Status</Label>
            <div className="col-span-3">
              <Input value={task.status} readOnly />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Vendor</Label>
            <div className="col-span-3">
              <Input value={task.vendor || 'Not specified'} readOnly />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Description</Label>
            <div className="col-span-3">
              <Textarea 
                value={task.description || 'No description provided'} 
                readOnly 
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Invoice</Label>
            <div className="col-span-3">
              {task.invoiceUrl ? (
                <div className="flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-green-500" />
                  <a 
                    href={task.invoiceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Invoice
                  </a>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="invoice-upload"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('invoice-upload')?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Invoice
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
