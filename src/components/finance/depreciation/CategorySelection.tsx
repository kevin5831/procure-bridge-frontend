
import { useState } from "react";
import { CustomSelect } from "@/components/ui/custom-select";
import { Label } from "@/components/ui/label";
import { AssetCategory, IFRSClassification, IFRSCategory, TaxCategory } from "./types";
import { IFRS_CLASSIFICATIONS, IFRS_CATEGORIES, TAX_CATEGORIES } from "./constants";

interface CategorySelectionProps {
  selectedCategory?: AssetCategory;
  onCategoryChange: (category: Partial<AssetCategory>) => void;
}

export function CategorySelection({ selectedCategory, onCategoryChange }: CategorySelectionProps) {
  const ifrsClassOptions = IFRS_CLASSIFICATIONS.map(cls => ({
    value: cls.class,
    label: cls.name
  }));

  const ifrsCategoryOptions = IFRS_CATEGORIES.map(cat => ({
    value: cat.code,
    label: cat.name
  }));

  const taxCategoryOptions = TAX_CATEGORIES.map(cat => ({
    value: cat.code,
    label: cat.name
  }));

  const handleIFRSClassChange = (value: string) => {
    const classification = IFRS_CLASSIFICATIONS.find(cls => cls.class === value);
    if (classification) {
      onCategoryChange({ ifrsClassification: classification });
    }
  };

  const handleIFRSCategoryChange = (value: string) => {
    const category = IFRS_CATEGORIES.find(cat => cat.code === value);
    if (category) {
      onCategoryChange({ ifrsCategory: category });
    }
  };

  const handleTaxCategoryChange = (value: string) => {
    const category = TAX_CATEGORIES.find(cat => cat.code === value);
    if (category) {
      onCategoryChange({ taxCategory: category });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>IFRS Classification</Label>
        <CustomSelect
          options={ifrsClassOptions}
          value={selectedCategory?.ifrsClassification?.class || ""}
          onChange={handleIFRSClassChange}
          placeholder="Select IFRS Classification"
        />
      </div>

      <div>
        <Label>IFRS Category</Label>
        <CustomSelect
          options={ifrsCategoryOptions}
          value={selectedCategory?.ifrsCategory?.code || ""}
          onChange={handleIFRSCategoryChange}
          placeholder="Select IFRS Category"
        />
      </div>

      <div>
        <Label>Tax Category</Label>
        <CustomSelect
          options={taxCategoryOptions}
          value={selectedCategory?.taxCategory?.code || ""}
          onChange={handleTaxCategoryChange}
          placeholder="Select Tax Category"
        />
      </div>
    </div>
  );
}
