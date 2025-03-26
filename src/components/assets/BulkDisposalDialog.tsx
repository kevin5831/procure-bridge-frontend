
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { DisposalDatePicker } from "./disposal/DisposalDatePicker";
import { disposalReasons } from "./disposal/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, FileOutput, Upload } from "lucide-react";
import { csvToAssets } from "./disposal/utils";

interface Asset {
  id: string;
  name: string;
  assetNumber: string;
  category: string;
  location?: string;
  status: string;
  currentValue: number;
  ifrsValue?: number;
  taxValue?: number;
}

interface BulkDisposalDialogProps {
  assets?: Asset[];
  selectedAssetIds?: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDisposalComplete?: () => void;
}

export function BulkDisposalDialog({
  assets = [],
  selectedAssetIds = [],
  open,
  onOpenChange,
  onDisposalComplete,
}: BulkDisposalDialogProps) {
  const [reason, setReason] = useState("");
  const [date, setDate] = useState<Date>();
  const [salvageValue, setSalvageValue] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedBookValue, setSelectedBookValue] = useState<"IFRS" | "TAX">("IFRS");
  const [disposalMode, setDisposalMode] = useState<"selection" | "upload" | "criteria">("selection");
  const [selectedAssets, setSelectedAssets] = useState<string[]>(selectedAssetIds);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedAssets, setUploadedAssets] = useState<Asset[]>([]);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [criteria, setCriteria] = useState({
    category: "",
    location: "",
    olderThan: "",
    valueBelow: "",
  });
  
  // Merge selected assets with uploaded assets
  const getAssetsToDispose = (): Asset[] => {
    if (disposalMode === "upload") {
      return uploadedAssets;
    } else if (disposalMode === "selection") {
      return assets.filter(asset => selectedAssets.includes(asset.id));
    } else {
      // Filter assets based on criteria
      return assets.filter(asset => {
        const matchesCategory = !criteria.category || asset.category === criteria.category;
        const matchesLocation = !criteria.location || asset.location === criteria.location;
        const matchesValue = !criteria.valueBelow || asset.currentValue <= parseFloat(criteria.valueBelow);
        // Note: olderThan would need purchase date which isn't in our current model
        
        return matchesCategory && matchesLocation && matchesValue;
      });
    }
  };
  
  const totalAssetsToDispose = getAssetsToDispose().length;
  const totalDisposalValue = getAssetsToDispose().reduce((sum, asset) => {
    return sum + (selectedBookValue === "IFRS" 
      ? (asset.ifrsValue ?? asset.currentValue) 
      : (asset.taxValue ?? asset.currentValue));
  }, 0);
  
  const validateForm = () => {
    if (!reason) {
      toast.error("Please select a reason for disposal");
      return false;
    }
    if (!date) {
      toast.error("Please select a disposal date");
      return false;
    }
    if (salvageValue && isNaN(parseFloat(salvageValue))) {
      toast.error("Please enter a valid salvage value");
      return false;
    }
    if (parseFloat(salvageValue) < 0) {
      toast.error("Salvage value cannot be negative");
      return false;
    }
    if (totalAssetsToDispose === 0) {
      toast.error("No assets selected for disposal");
      return false;
    }
    return true;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadedFile(file);
    
    try {
      const parsedAssets = await csvToAssets(file);
      setUploadedAssets(parsedAssets);
      toast.success(`Successfully parsed ${parsedAssets.length} assets from CSV`);
    } catch (error) {
      console.error("Error parsing CSV:", error);
      toast.error("Failed to parse CSV file. Please check the format.");
    }
  };

  const handleBulkDisposal = async () => {
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      setShowProgress(true);
      const assetsToDispose = getAssetsToDispose();
      
      // Mock a batch processing simulation with progress updates
      for (let i = 0; i < assetsToDispose.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 50)); // Simulate processing time
        
        // Update progress
        const currentProgress = Math.round(((i + 1) / assetsToDispose.length) * 100);
        setProgress(currentProgress);
      }

      // Final disposal data that would be sent to the backend
      const disposalData = {
        reason,
        disposalDate: date,
        salvageValue: parseFloat(salvageValue) || 0,
        bookValueType: selectedBookValue,
        notes,
        assets: assetsToDispose.map(asset => ({
          id: asset.id,
          name: asset.name,
          assetNumber: asset.assetNumber,
          bookValue: selectedBookValue === "IFRS" 
            ? (asset.ifrsValue ?? asset.currentValue) 
            : (asset.taxValue ?? asset.currentValue)
        }))
      };

      console.log("Disposing bulk assets", disposalData);

      toast.success(`${assetsToDispose.length} assets disposed successfully`);
      onOpenChange(false);
      onDisposalComplete?.();
    } catch (error) {
      console.error("Error disposing assets:", error);
      toast.error("Failed to dispose assets. Please try again.");
    } finally {
      setIsSubmitting(false);
      setShowProgress(false);
      setProgress(0);
    }
  };

  const resetForm = () => {
    setReason("");
    setDate(undefined);
    setSalvageValue("");
    setNotes("");
    setSelectedBookValue("IFRS");
    setDisposalMode("selection");
    setSelectedAssets(selectedAssetIds);
    setUploadedFile(null);
    setUploadedAssets([]);
    setCriteria({
      category: "",
      location: "",
      olderThan: "",
      valueBelow: "",
    });
    setProgress(0);
    setShowProgress(false);
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const toggleAssetSelection = (assetId: string) => {
    setSelectedAssets(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };
  
  const selectAllAssets = () => {
    setSelectedAssets(assets.map(asset => asset.id));
  };
  
  const deselectAllAssets = () => {
    setSelectedAssets([]);
  };
  
  const downloadSampleCsv = () => {
    const csvContent = 
      "assetId,assetNumber,assetName,category,currentValue,ifrsValue,taxValue\n" +
      "1,AST-0001,Dell Laptop XPS 15,IT Equipment,1500,1400,1450\n" +
      "2,AST-0002,Office Chair,Furniture,300,280,290\n";
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'sample_asset_disposal.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose();
        else onOpenChange(true);
      }}
    >
      <DialogContent 
        className="sm:max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col"
        onPointerDownOutside={(e) => e.preventDefault()}
        aria-describedby="bulk-disposal-dialog-description"
      >
        <DialogHeader>
          <DialogTitle>Bulk Asset Disposal</DialogTitle>
          <DialogDescription id="bulk-disposal-dialog-description">
            Dispose of multiple assets at once
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 overflow-y-auto flex-1 pr-1">
          {/* Disposal Mode Selection */}
          <div className="space-y-2">
            <Label>Disposal Mode</Label>
            <RadioGroup
              defaultValue="selection"
              value={disposalMode}
              onValueChange={(value) => setDisposalMode(value as "selection" | "upload" | "criteria")}
              className="grid grid-cols-3 gap-4"
            >
              <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="selection" id="selection" />
                <Label htmlFor="selection" className="cursor-pointer">Selected Assets</Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="upload" id="upload" />
                <Label htmlFor="upload" className="cursor-pointer">Upload CSV</Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="criteria" id="criteria" />
                <Label htmlFor="criteria" className="cursor-pointer">By Criteria</Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Mode-specific UI */}
          <div className="border rounded-md p-4 bg-muted/20">
            {disposalMode === "selection" && (
              <div className="space-y-3">
                <div className="flex justify-between items-center mb-2">
                  <Label>Selected Assets ({selectedAssets.length}/{assets.length})</Label>
                  <div className="space-x-2">
                    <Button type="button" variant="outline" size="sm" onClick={selectAllAssets}>
                      Select All
                    </Button>
                    <Button type="button" variant="outline" size="sm" onClick={deselectAllAssets}>
                      Deselect All
                    </Button>
                  </div>
                </div>
                
                <ScrollArea className="h-[200px] border rounded-md bg-background">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]"></TableHead>
                        <TableHead>Asset Number</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Current Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assets.map((asset) => (
                        <TableRow key={asset.id}>
                          <TableCell>
                            <Checkbox 
                              checked={selectedAssets.includes(asset.id)} 
                              onCheckedChange={() => toggleAssetSelection(asset.id)}
                            />
                          </TableCell>
                          <TableCell>{asset.assetNumber}</TableCell>
                          <TableCell>{asset.name}</TableCell>
                          <TableCell>{asset.category}</TableCell>
                          <TableCell className="text-right">${asset.currentValue.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
            )}
            
            {disposalMode === "upload" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="csv-upload">Upload Asset CSV File</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="csv-upload"
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="flex-1"
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      size="icon"
                      onClick={downloadSampleCsv}
                    >
                      <FileOutput className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    CSV should contain columns: assetId, assetNumber, assetName, category, currentValue, ifrsValue, taxValue
                  </p>
                </div>
                
                {uploadedFile && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Parsed Assets ({uploadedAssets.length})</Label>
                      <span className="text-sm">{uploadedFile.name}</span>
                    </div>
                    
                    <ScrollArea className="h-[200px] border rounded-md bg-background">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Asset Number</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Current Value</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {uploadedAssets.map((asset) => (
                            <TableRow key={asset.id}>
                              <TableCell>{asset.assetNumber}</TableCell>
                              <TableCell>{asset.name}</TableCell>
                              <TableCell>{asset.category}</TableCell>
                              <TableCell className="text-right">${asset.currentValue.toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </div>
                )}
              </div>
            )}
            
            {disposalMode === "criteria" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={criteria.category} 
                      onValueChange={(value) => setCriteria({...criteria, category: value})}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Category</SelectItem>
                        <SelectItem value="IT Equipment">IT Equipment</SelectItem>
                        <SelectItem value="Furniture">Furniture</SelectItem>
                        <SelectItem value="Office Equipment">Office Equipment</SelectItem>
                        <SelectItem value="Vehicle">Vehicle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select 
                      value={criteria.location} 
                      onValueChange={(value) => setCriteria({...criteria, location: value})}
                    >
                      <SelectTrigger id="location">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Location</SelectItem>
                        <SelectItem value="Addis Ababa HQ">Addis Ababa HQ</SelectItem>
                        <SelectItem value="Dire Dawa Branch">Dire Dawa Branch</SelectItem>
                        <SelectItem value="Bahir Dar Office">Bahir Dar Office</SelectItem>
                        <SelectItem value="Hawassa Center">Hawassa Center</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="value-below">Value Below</Label>
                    <Input
                      id="value-below"
                      type="number"
                      placeholder="Enter amount"
                      value={criteria.valueBelow}
                      onChange={(e) => setCriteria({...criteria, valueBelow: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="older-than">Older Than (days)</Label>
                    <Input
                      id="older-than"
                      type="number"
                      placeholder="Days old"
                      value={criteria.olderThan}
                      onChange={(e) => setCriteria({...criteria, olderThan: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="border rounded p-3 bg-amber-50 flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-amber-800">Preview Mode</p>
                    <p className="text-xs text-amber-700">
                      Based on your criteria, <strong>{getAssetsToDispose().length}</strong> assets will be disposed
                      with a total value of <strong>${totalDisposalValue.toFixed(2)}</strong>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Common Disposal Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="book-value-type">Book Value Type</Label>
              <RadioGroup
                defaultValue="IFRS"
                value={selectedBookValue}
                onValueChange={(value) => setSelectedBookValue(value as "IFRS" | "TAX")}
                className="flex items-center space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="IFRS" id="ifrs" />
                  <Label htmlFor="ifrs">IFRS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TAX" id="tax" />
                  <Label htmlFor="tax">Tax</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reason" className="required">Reason for Disposal</Label>
              <Select 
                onValueChange={setReason} 
                value={reason}
                required
              >
                <SelectTrigger id="reason" className="bg-background">
                  <SelectValue placeholder="Select disposal reason" />
                </SelectTrigger>
                <SelectContent position="popper" sideOffset={4}>
                  {disposalReasons.map((reason) => (
                    <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="required">Disposal Date</Label>
              <DisposalDatePicker date={date} onDateChange={setDate} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salvage-value">Salvage Value (per asset)</Label>
              <Input
                id="salvage-value"
                type="number"
                placeholder="0.00"
                value={salvageValue}
                onChange={(e) => setSalvageValue(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes about this bulk disposal"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
          
          {/* Summary Section */}
          <div className="bg-muted/30 border rounded-md p-4">
            <h3 className="font-medium text-sm mb-2">Disposal Summary</h3>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <div>Assets to be Disposed:</div>
              <div className="font-medium">{totalAssetsToDispose}</div>
              
              <div>Total Book Value ({selectedBookValue}):</div>
              <div className="font-medium">${totalDisposalValue.toFixed(2)}</div>
              
              <div>Total Salvage Value:</div>
              <div className="font-medium">
                ${((parseFloat(salvageValue) || 0) * totalAssetsToDispose).toFixed(2)}
              </div>
              
              <div>Net Financial Impact:</div>
              <div className="font-medium text-destructive">
                -${(totalDisposalValue - ((parseFloat(salvageValue) || 0) * totalAssetsToDispose)).toFixed(2)}
              </div>
            </div>
          </div>
          
          {showProgress && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing assets...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>
        
        <DialogFooter className="mt-4">
          <Button 
            variant="outline" 
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleBulkDisposal}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Confirm Bulk Disposal"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
