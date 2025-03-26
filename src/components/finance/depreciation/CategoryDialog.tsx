import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomSelect } from "@/components/ui/custom-select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HelpCircle, Calendar as CalendarIcon } from "lucide-react";
import { AssetCategory, DepreciationImpact, YearlyDepreciation } from "./types";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { 
  DEPRECIATION_METHODS, 
  IFRS_CLASSIFICATIONS,
  IFRS_CATEGORIES,
  TAX_CATEGORIES
} from "./constants";
import { DepreciationImpactPreview } from "./DepreciationImpactPreview";

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: AssetCategory;
  onSave: (category: Partial<AssetCategory>) => void;
}

export function CategoryDialog({ open, onOpenChange, category, onSave }: CategoryDialogProps) {
  const [formData, setFormData] = useState<Partial<AssetCategory>>(
    category || { 
      name: "", 
      ifrsMethod: "straight-line", 
      ifrsYears: 3,
      ifrsResidualValue: 0,
      ifrsStartDate: new Date(),
      taxMethod: "straight-line",
      taxYears: 3,
      taxResidualValue: 0,
      taxStartDate: new Date()
    }
  );
  
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const ifrsClassOptions = IFRS_CLASSIFICATIONS.map(c => ({
    value: c.class,
    label: `${c.name} (${c.class})`
  }));

  const ifrsCategories = IFRS_CATEGORIES.filter(cat => 
    !formData.ifrsClassification || cat.class === formData.ifrsClassification.class
  );

  const ifrsCategoryOptions = ifrsCategories.map(c => ({
    value: c.code,
    label: `${c.name} (${c.code})`
  }));

  const taxCategoryOptions = TAX_CATEGORIES.map(c => ({
    value: c.code,
    label: `${c.name} (${c.code})`
  }));

  const handleIFRSClassChange = (classCode: string) => {
    const classification = IFRS_CLASSIFICATIONS.find(c => c.class === classCode);
    setFormData(prev => ({
      ...prev,
      ifrsClassification: classification,
      ifrsCategory: undefined // Reset category when classification changes
    }));
  };

  const handleIFRSCategoryChange = (categoryCode: string) => {
    const category = IFRS_CATEGORIES.find(c => c.code === categoryCode);
    setFormData(prev => ({
      ...prev,
      ifrsCategory: category
    }));
  };

  const handleTaxCategoryChange = (categoryCode: string) => {
    const category = TAX_CATEGORIES.find(c => c.code === categoryCode);
    setFormData(prev => ({
      ...prev,
      taxCategory: category
    }));
  };

  const calculateDepreciationImpact = (): DepreciationImpact => {
    const assetCost = 10000;
    const ifrsResidualValue = assetCost * ((formData.ifrsResidualValue || 0) / 100);
    const depreciableAmount = assetCost - ifrsResidualValue;
    const monthlyDepreciation = formData.ifrsMethod === 'straight-line' 
      ? depreciableAmount / ((formData.ifrsYears || 1) * 12)
      : 0;
    
    const yearlyDepreciation: YearlyDepreciation[] = [];
    let remainingValue = assetCost;
    
    for (let year = 1; year <= (formData.ifrsYears || 1); year++) {
      const annualDep = formData.ifrsMethod === 'straight-line'
        ? depreciableAmount / (formData.ifrsYears || 1)
        : remainingValue * 0.2;
      
      remainingValue -= annualDep;
      remainingValue = Math.max(remainingValue, ifrsResidualValue);
      
      yearlyDepreciation.push({
        year,
        depreciation: annualDep,
        endingBookValue: remainingValue
      });
    }
    
    return {
      monthlyAmount: monthlyDepreciation,
      annualAmount: monthlyDepreciation * 12,
      yearlyDepreciation: yearlyDepreciation
    };
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{category ? "Edit Category" : "Add New Category"}</DialogTitle>
            <DialogDescription>
              Configure the IFRS and tax depreciation settings for this asset category.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Category Name</Label>
              <Input 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter category name"
              />
            </div>
            
            <Tabs defaultValue="ifrs" className="w-full">
              <TabsList className="sticky top-0 z-10 w-full grid grid-cols-2 mb-6 bg-background">
                <TabsTrigger 
                  value="ifrs"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  IFRS Depreciation
                </TabsTrigger>
                <TabsTrigger 
                  value="tax"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Tax Depreciation
                </TabsTrigger>
              </TabsList>
              
              <div className="overflow-y-auto max-h-[60vh] px-1">
                <TabsContent value="ifrs" className="space-y-4 mt-0">
                  <TooltipProvider delayDuration={0}>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label>IFRS Classification</Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" className="p-0 h-4 w-4 hover:bg-transparent">
                              <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="max-w-[300px]">
                            <p>Select from standard IFRS asset classifications. These determine the appropriate accounting treatment and disclosure requirements under IFRS.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <CustomSelect
                        options={ifrsClassOptions}
                        value={formData.ifrsClassification?.class || ""}
                        onChange={handleIFRSClassChange}
                        placeholder="Select IFRS classification"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label>IFRS Category</Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" className="p-0 h-4 w-4 hover:bg-transparent">
                              <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="max-w-[300px]">
                            <p>Specific categories within the selected classification. These help in proper asset categorization and reporting under IFRS standards.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <CustomSelect
                        options={ifrsCategoryOptions}
                        value={formData.ifrsCategory?.code || ""}
                        onChange={handleIFRSCategoryChange}
                        placeholder="Select IFRS category"
                        disabled={!formData.ifrsClassification}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label>IFRS Depreciation Method</Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" className="p-0 h-4 w-4 hover:bg-transparent">
                              <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="max-w-[300px]">
                            <p>The method used to allocate the asset's depreciable amount over its useful life:</p>
                            <ul className="mt-2 space-y-1">
                              <li><strong>Straight-Line Method:</strong> Depreciates the asset evenly over its useful life.</li>
                              <li><strong>Declining Balance Method:</strong> Depreciates the asset at a higher rate initially, decreasing over its life.</li>
                            </ul>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <CustomSelect
                        options={DEPRECIATION_METHODS}
                        value={formData.ifrsMethod || ""}
                        onChange={(value) => setFormData({ ...formData, ifrsMethod: value })}
                        placeholder="Select depreciation method"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label>IFRS Useful Life (Years)</Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" className="p-0 h-4 w-4 hover:bg-transparent">
                              <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="max-w-[300px]">
                            <p>The period over which an asset is expected to be available for use. Consider factors like expected usage, technical obsolescence, and legal restrictions.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Input 
                        type="number" 
                        value={formData.ifrsYears} 
                        onChange={(e) => setFormData({ ...formData, ifrsYears: parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label>Residual Value (%)</Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" className="p-0 h-4 w-4 hover:bg-transparent">
                              <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="max-w-[300px]">
                            <p>Estimated value of the asset at the end of its useful life. Typically a percentage of the initial cost.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input 
                          type="number" 
                          value={formData.ifrsResidualValue || 0} 
                          onChange={(e) => setFormData({ ...formData, ifrsResidualValue: parseFloat(e.target.value) })}
                          className="w-20"
                          min="0"
                          max="100"
                        />
                        <span className="text-muted-foreground">%</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label>Depreciation Start Date</Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" className="p-0 h-4 w-4 hover:bg-transparent">
                              <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="max-w-[300px]">
                            <p>Date when asset depreciation starts. Typically asset in-service date or purchase date.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.ifrsStartDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.ifrsStartDate ? format(formData.ifrsStartDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.ifrsStartDate}
                            onSelect={(date) => setFormData({ ...formData, ifrsStartDate: date || new Date() })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </TooltipProvider>
                </TabsContent>

                <TabsContent value="tax" className="space-y-4 mt-0">
                  <TooltipProvider delayDuration={0}>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label>Tax Category</Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" className="p-0 h-4 w-4 hover:bg-transparent">
                              <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="max-w-[300px]">
                            <p>Categories defined by tax authorities. Each category has specific depreciation rates and methods allowed for tax purposes. These may differ from IFRS treatment.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <CustomSelect
                        options={taxCategoryOptions}
                        value={formData.taxCategory?.code || ""}
                        onChange={handleTaxCategoryChange}
                        placeholder="Select tax category"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label>Tax Depreciation Method</Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" className="p-0 h-4 w-4 hover:bg-transparent">
                              <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="max-w-[300px]">
                            <p>The depreciation method accepted by tax authorities:</p>
                            <ul className="mt-2 space-y-1">
                              <li><strong>Straight-Line Method:</strong> Depreciates the asset evenly over its useful life.</li>
                              <li><strong>Declining Balance Method:</strong> Depreciates the asset at a higher rate initially, decreasing over its life.</li>
                            </ul>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <CustomSelect
                        options={DEPRECIATION_METHODS}
                        value={formData.taxMethod || ""}
                        onChange={(value) => setFormData({ ...formData, taxMethod: value })}
                        placeholder="Select depreciation method"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label>Tax Useful Life (Years)</Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" className="p-0 h-4 w-4 hover:bg-transparent">
                              <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="max-w-[300px]">
                            <p>The depreciation period allowed by tax authorities. This may differ from the IFRS useful life and is used to calculate tax deductions.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Input 
                        type="number" 
                        value={formData.taxYears} 
                        onChange={(e) => setFormData({ ...formData, taxYears: parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label>Residual Value (%)</Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" className="p-0 h-4 w-4 hover:bg-transparent">
                              <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="max-w-[300px]">
                            <p>Estimated value of the asset at the end of its useful life for tax purposes. Typically a percentage of the initial cost.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input 
                          type="number" 
                          value={formData.taxResidualValue || 0} 
                          onChange={(e) => setFormData({ ...formData, taxResidualValue: parseFloat(e.target.value) })}
                          className="w-20"
                          min="0"
                          max="100"
                        />
                        <span className="text-muted-foreground">%</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label>Depreciation Start Date</Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" className="p-0 h-4 w-4 hover:bg-transparent">
                              <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="max-w-[300px]">
                            <p>Date when asset depreciation starts for tax purposes. May differ from IFRS start date due to tax rules.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.taxStartDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.taxStartDate ? format(formData.taxStartDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.taxStartDate}
                            onSelect={(date) => setFormData({ ...formData, taxStartDate: date || new Date() })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </TooltipProvider>
                </TabsContent>
              </div>
            </Tabs>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setIsPreviewOpen(true)}
            >
              Preview Depreciation Impact
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={() => {
              onSave(formData);
              onOpenChange(false);
            }}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <DepreciationImpactPreview 
        open={isPreviewOpen} 
        onOpenChange={setIsPreviewOpen}
        impact={calculateDepreciationImpact()}
        category={formData}
      />
    </>
  );
}
