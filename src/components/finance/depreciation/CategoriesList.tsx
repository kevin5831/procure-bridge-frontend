
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import { AssetCategory } from "./types";

interface CategoriesListProps {
  categories: AssetCategory[];
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
  onEditCategory: (category: AssetCategory) => void;
  onDeleteCategory: (id: string) => void;
}

export function CategoriesList({
  categories,
  selectedCategoryId,
  onSelectCategory,
  onEditCategory,
  onDeleteCategory,
}: CategoriesListProps) {
  return (
    <Card className="md:col-span-1">
      <div className="p-4 space-y-4">
        <h2 className="font-semibold">Asset Categories</h2>
        <div className="space-y-2">
          {categories.map(category => (
            <div
              key={category.id}
              className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                selectedCategoryId === category.id
                  ? "bg-accent"
                  : "hover:bg-accent/50"
              }`}
              onClick={() => onSelectCategory(category.id)}
            >
              <span className="font-medium">{category.name}</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditCategory(category);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteCategory(category.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
