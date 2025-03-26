
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomSelect } from "@/components/ui/custom-select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { HelpCircle, Calendar as CalendarIcon } from "lucide-react";
import { AssetCategory } from "./types";
import { DEPRECIATION_METHODS } from "./constants";
import { cn } from "@/lib/utils";
import { AuditHistory } from "./AuditHistory";

interface CategoryDetailsProps {
  category: AssetCategory;
  pendingChanges: Partial<AssetCategory>;
  onPendingChangesUpdate: (changes: Partial<AssetCategory>) => void;
  onEdit: (category: AssetCategory) => void;
  onSave: () => void;
}

export function CategoryDetails({
  category,
  pendingChanges,
  onPendingChangesUpdate,
  onEdit,
  onSave,
}: CategoryDetailsProps) {
  return (
    <TooltipProvider>
      <Card className="lg:col-span-2 w-full">
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <h2 className="text-lg font-semibold">{category.name}</h2>
            <Button variant="outline" onClick={() => onEdit(category)}>
              Edit Category
            </Button>
          </div>

          <Tabs defaultValue="ifrs" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-4">
              <TabsTrigger
                value="ifrs"
                className="w-full py-2 sm:py-3 text-sm sm:text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm rounded-l-md"
              >
                IFRS Depreciation
              </TabsTrigger>
              <TabsTrigger
                value="tax"
                className="w-full py-2 sm:py-3 text-sm sm:text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm rounded-r-md"
              >
                Tax Depreciation
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ifrs" className="space-y-4">
              <div className="space-y-4 p-3 sm:p-4 bg-muted/50 rounded-md">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="text-sm sm:text-base">IFRS Depreciation Method</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-[250px] text-sm">
                          <strong>Straight-Line Method:</strong> Depreciates the asset evenly over its useful life.<br />
                          <strong>Declining Balance Method:</strong> Depreciates the asset at a higher rate initially, decreasing over its life.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <CustomSelect
                    options={DEPRECIATION_METHODS}
                    value={(pendingChanges.ifrsMethod || category.ifrsMethod)}
                    onChange={(value) => {
                      onPendingChangesUpdate({ ...pendingChanges, ifrsMethod: value });
                    }}
                    placeholder="Select depreciation method"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="text-sm sm:text-base">IFRS Useful Life</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-[250px] text-sm">The period over which the asset is expected to be economically useful to the business.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex gap-4 items-center mt-2">
                    <Input 
                      type="number" 
                      value={(pendingChanges.ifrsYears !== undefined ? pendingChanges.ifrsYears : category.ifrsYears) || ""} 
                      onChange={(e) => {
                        onPendingChangesUpdate({ 
                          ...pendingChanges, 
                          ifrsYears: parseInt(e.target.value) 
                        });
                      }}
                      className="w-20"
                    />
                    <span className="text-muted-foreground">years</span>
                  </div>
                </div>
                
                {/* New Residual Value field */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="text-sm sm:text-base">Residual Value</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-[250px] text-sm">Estimated value of the asset at the end of its useful life. Typically a percentage of the initial cost.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex gap-4 items-center mt-2">
                    <Input 
                      type="number" 
                      value={(pendingChanges.ifrsResidualValue !== undefined ? pendingChanges.ifrsResidualValue : category.ifrsResidualValue) || 0} 
                      onChange={(e) => {
                        onPendingChangesUpdate({ 
                          ...pendingChanges, 
                          ifrsResidualValue: parseFloat(e.target.value) 
                        });
                      }}
                      className="w-20"
                      min="0"
                      max="100"
                    />
                    <span className="text-muted-foreground">%</span>
                  </div>
                </div>
                
                {/* New Depreciation Start Date field */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="text-sm sm:text-base">Depreciation Start Date</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-[250px] text-sm">Date when asset depreciation starts. Typically asset in-service date or purchase date.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !pendingChanges.ifrsStartDate && !category.ifrsStartDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {pendingChanges.ifrsStartDate ? 
                          format(pendingChanges.ifrsStartDate, "PPP") : 
                          category.ifrsStartDate ? 
                            format(category.ifrsStartDate, "PPP") : 
                            "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={pendingChanges.ifrsStartDate || category.ifrsStartDate}
                        onSelect={(date) => 
                          onPendingChangesUpdate({ 
                            ...pendingChanges, 
                            ifrsStartDate: date || new Date() 
                          })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              {/* Audit History Component */}
              <AuditHistory categoryId={category.id} />
            </TabsContent>

            <TabsContent value="tax" className="space-y-4">
              <div className="space-y-4 p-3 sm:p-4 bg-muted/50 rounded-md">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="text-sm sm:text-base">Tax Depreciation Method</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-[250px] text-sm">
                          <strong>Straight-Line Method:</strong> Depreciates the asset evenly over its useful life.<br />
                          <strong>Declining Balance Method:</strong> Depreciates the asset at a higher rate initially, decreasing over its life.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <CustomSelect
                    options={DEPRECIATION_METHODS}
                    value={(pendingChanges.taxMethod || category.taxMethod)}
                    onChange={(value) => {
                      onPendingChangesUpdate({ ...pendingChanges, taxMethod: value });
                    }}
                    placeholder="Select depreciation method"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="text-sm sm:text-base">Tax Useful Life</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-[250px] text-sm">The depreciation period allowed by tax authorities, which may differ from IFRS useful life.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex gap-4 items-center mt-2">
                    <Input 
                      type="number" 
                      value={(pendingChanges.taxYears !== undefined ? pendingChanges.taxYears : category.taxYears) || ""} 
                      onChange={(e) => {
                        onPendingChangesUpdate({ 
                          ...pendingChanges, 
                          taxYears: parseInt(e.target.value) 
                        });
                      }}
                      className="w-20"
                    />
                    <span className="text-muted-foreground">years</span>
                  </div>
                </div>
                
                {/* New Residual Value field */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="text-sm sm:text-base">Residual Value</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-[250px] text-sm">Estimated value of the asset at the end of its useful life for tax purposes. Typically a percentage of the initial cost.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex gap-4 items-center mt-2">
                    <Input 
                      type="number" 
                      value={(pendingChanges.taxResidualValue !== undefined ? pendingChanges.taxResidualValue : category.taxResidualValue) || 0} 
                      onChange={(e) => {
                        onPendingChangesUpdate({ 
                          ...pendingChanges, 
                          taxResidualValue: parseFloat(e.target.value) 
                        });
                      }}
                      className="w-20"
                      min="0"
                      max="100"
                    />
                    <span className="text-muted-foreground">%</span>
                  </div>
                </div>
                
                {/* New Depreciation Start Date field */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="text-sm sm:text-base">Depreciation Start Date</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-[250px] text-sm">Date when asset depreciation starts for tax purposes. May differ from IFRS start date due to tax rules.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !pendingChanges.taxStartDate && !category.taxStartDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {pendingChanges.taxStartDate ? 
                          format(pendingChanges.taxStartDate, "PPP") : 
                          category.taxStartDate ? 
                            format(category.taxStartDate, "PPP") : 
                            "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={pendingChanges.taxStartDate || category.taxStartDate}
                        onSelect={(date) => 
                          onPendingChangesUpdate({ 
                            ...pendingChanges, 
                            taxStartDate: date || new Date() 
                          })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              {/* Audit History Component */}
              <AuditHistory categoryId={category.id} />
            </TabsContent>
          </Tabs>

          {Object.keys(pendingChanges).length > 0 && (
            <div className="flex justify-end">
              <Button onClick={onSave}>
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </Card>
    </TooltipProvider>
  );
}
