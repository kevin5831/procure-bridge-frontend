
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { CategoryDialog } from "@/components/finance/depreciation/CategoryDialog";
import { CategoriesList } from "@/components/finance/depreciation/CategoriesList";
import { CategoryDetails } from "@/components/finance/depreciation/CategoryDetails";
import { AssetCategory, TaxCategory } from "@/components/finance/depreciation/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  IFRS_CLASSIFICATIONS,
  IFRS_CATEGORIES,
  TAX_CATEGORIES
} from "@/components/finance/depreciation/constants";

export default function DepreciationSetup() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"categories" | "mappings">("categories");
  const [categories, setCategories] = useState<AssetCategory[]>([
    { 
      id: "1", 
      name: "IT Equipment", 
      ifrsMethod: "straight-line", 
      ifrsYears: 3,
      ifrsResidualValue: 10, // 10% residual value
      ifrsStartDate: new Date(),
      taxMethod: "declining-balance",
      taxYears: 2,
      taxResidualValue: 5, // 5% residual value
      taxStartDate: new Date(),
      ifrsClassification: IFRS_CLASSIFICATIONS[0],
      ifrsCategory: IFRS_CATEGORIES[0],
      taxCategory: TAX_CATEGORIES[0]
    },
    { 
      id: "2", 
      name: "Office Furniture", 
      ifrsMethod: "straight-line", 
      ifrsYears: 5,
      ifrsResidualValue: 15, // 15% residual value
      ifrsStartDate: new Date(),
      taxMethod: "straight-line",
      taxYears: 4,
      taxResidualValue: 10, // 10% residual value
      taxStartDate: new Date()
    },
    { 
      id: "3", 
      name: "Vehicles", 
      ifrsMethod: "declining-balance", 
      ifrsYears: 4,
      ifrsResidualValue: 20, // 20% residual value
      ifrsStartDate: new Date(),
      taxMethod: "declining-balance",
      taxYears: 3,
      taxResidualValue: 15, // 15% residual value
      taxStartDate: new Date()
    },
  ]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [editingCategory, setEditingCategory] = useState<AssetCategory | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<Partial<AssetCategory>>({});
  const [customTaxCategories, setCustomTaxCategories] = useState<TaxCategory[]>(TAX_CATEGORIES);

  const handleTaxRateChange = (code: string, newRate: string) => {
    const rate = parseFloat(newRate) / 100; // Convert percentage to decimal
    if (!isNaN(rate) && rate >= 0 && rate <= 1) {
      setCustomTaxCategories(prevCategories =>
        prevCategories.map(cat =>
          cat.code === code
            ? { ...cat, depreciationRate: rate, isCustom: true }
            : cat
        )
      );
      toast({
        title: "Tax Rate Updated",
        description: `Tax rate for ${code} has been updated to ${(rate * 100).toFixed(0)}%`
      });
    }
  };

  const handleResetTaxRate = (code: string) => {
    const originalCategory = TAX_CATEGORIES.find(cat => cat.code === code);
    if (originalCategory) {
      setCustomTaxCategories(prevCategories =>
        prevCategories.map(cat =>
          cat.code === code
            ? { ...originalCategory, isCustom: false }
            : cat
        )
      );
      toast({
        title: "Tax Rate Reset",
        description: `Tax rate for ${code} has been reset to default`
      });
    }
  };

  const handleSave = (categoryData: Partial<AssetCategory>) => {
    if (editingCategory) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, ...categoryData }
          : cat
      ));
      toast({
        title: "Category Updated",
        description: "The asset category has been updated successfully."
      });
    } else {
      const newCategory = {
        ...categoryData,
        id: Math.random().toString(36).substr(2, 9),
      } as AssetCategory;
      setCategories([...categories, newCategory]);
      toast({
        title: "Category Added",
        description: "New asset category has been added successfully."
      });
    }
    setEditingCategory(undefined);
    setPendingChanges({});
  };

  return (
    <div className="space-y-6 max-w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Depreciation Setup</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Configure depreciation methods and policies for asset categories
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "categories" | "mappings")} className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-4">
          <TabsTrigger
            value="categories"
            className="w-full py-3 text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm rounded-l-md"
          >
            Asset Categories
          </TabsTrigger>
          <TabsTrigger
            value="mappings"
            className="w-full py-3 text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm rounded-r-md"
          >
            IFRS & Tax Reference
          </TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <div className="flex justify-end mb-4">
            <Button onClick={() => {
              setEditingCategory(undefined);
              setIsDialogOpen(true);
            }}>Add Category</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="w-full overflow-x-auto">
              <CategoriesList
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={setSelectedCategoryId}
                onEditCategory={(category) => {
                  setEditingCategory(category);
                  setIsDialogOpen(true);
                }}
                onDeleteCategory={(id) => {
                  setCategories(categories.filter(cat => cat.id !== id));
                  if (selectedCategoryId === id) {
                    setSelectedCategoryId("");
                  }
                  toast({
                    title: "Category Deleted",
                    description: "The asset category has been deleted."
                  });
                }}
              />
            </div>

            {selectedCategoryId && (
              <CategoryDetails
                category={categories.find(cat => cat.id === selectedCategoryId)!}
                pendingChanges={pendingChanges}
                onPendingChangesUpdate={setPendingChanges}
                onEdit={(category) => {
                  setEditingCategory(category);
                  setIsDialogOpen(true);
                }}
                onSave={() => {
                  if (Object.keys(pendingChanges).length > 0) {
                    setCategories(categories.map(cat =>
                      cat.id === selectedCategoryId
                        ? { ...cat, ...pendingChanges }
                        : cat
                    ));
                    setPendingChanges({});
                    toast({
                      title: "Changes Saved",
                      description: "Category changes have been saved successfully."
                    });
                  }
                }}
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="mappings">
          <Card className="p-6">
            <div className="space-y-8">
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">How Classifications Work</h2>
                <p className="text-muted-foreground mb-4">
                  When setting up asset categories, you'll need to map them to both IFRS and Tax classifications. 
                  This ensures proper financial reporting and tax compliance.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-semibold">IFRS Classifications</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Highest Level</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  These are the main asset classes as defined by International Financial Reporting Standards.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {IFRS_CLASSIFICATIONS.map((classification) => (
                    <Card key={classification.class} className="p-4 border-blue-200">
                      <h4 className="font-medium">{classification.name}</h4>
                      <p className="text-sm text-muted-foreground">{classification.description}</p>
                      <div className="mt-2 text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded inline-block">
                        Class: {classification.class}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-semibold">IFRS Categories</h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Sub-classifications</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  More specific categories that fall under each IFRS classification. Each asset must be assigned to one of these categories.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {IFRS_CATEGORIES.map((category) => (
                    <Card key={category.code} className="p-4 border-green-200">
                      <h4 className="font-medium">{category.name}</h4>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded">
                          Code: {category.code}
                        </span>
                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                          Class: {category.class}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-semibold">Tax Categories</h3>
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Local Tax Rules</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Categories defined by local tax authorities. Customize these rates to match your jurisdiction's requirements.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {customTaxCategories.map((category) => (
                    <Card key={category.code} className="p-4 border-purple-200">
                      <h4 className="font-medium">{category.name}</h4>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded">
                            Code: {category.code}
                          </span>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value={(category.depreciationRate * 100).toFixed(0)}
                              onChange={(e) => handleTaxRateChange(category.code, e.target.value)}
                              className="w-20 h-7 text-xs"
                              min="0"
                              max="100"
                            />
                            <span className="text-xs text-muted-foreground">%</span>
                          </div>
                        </div>
                        {category.isCustom && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs h-7"
                            onClick={() => handleResetTaxRate(category.code)}
                          >
                            Reset to Default
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <CategoryDialog 
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        category={editingCategory}
        onSave={handleSave}
      />
    </div>
  );
}
