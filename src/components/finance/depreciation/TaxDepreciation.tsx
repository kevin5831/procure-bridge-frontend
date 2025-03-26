
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomSelect } from "@/components/ui/custom-select";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";

const assetCategories = ["IT Equipment", "Furniture", "Vehicles"];
const depreciationMethods = [
  { value: "straight-line", label: "Straight-Line" },
  { value: "declining-balance", label: "Double Declining Balance" },
  { value: "sum-of-years", label: "Sum of Years Digits" },
  { value: "MACRS", label: "MACRS" },
];

interface TaxDepreciationProps {
  selectedCategory: string;
  onMethodChange: (method: string) => void;
  onLifeChange: (years: number) => void;
}

export function TaxDepreciation({ selectedCategory, onMethodChange, onLifeChange }: TaxDepreciationProps) {
  const [salvageValue, setSalvageValue] = useState("");
  const [usefulLife, setUsefulLife] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");

  const handleMethodChange = (method: string) => {
    setSelectedMethod(method);
    onMethodChange(method);
  };

  const handleLifeChange = (value: string) => {
    setUsefulLife(value);
    onLifeChange(parseInt(value) || 0);
  };

  return (
    <Card>
      <CardContent className="grid gap-4 pt-6">
        <div className="grid gap-2">
          <Label>Tax Depreciation Method</Label>
          <CustomSelect
            options={depreciationMethods}
            value={selectedMethod}
            onChange={handleMethodChange}
            placeholder="Select tax depreciation method"
          />
        </div>
        <div className="grid gap-2">
          <Label>Tax Life (Years)</Label>
          <div className="flex gap-4 items-center">
            <Input
              value={usefulLife}
              onChange={(e) => handleLifeChange(e.target.value)}
              type="number"
              placeholder="Enter tax life"
              className="w-20"
            />
            <span className="text-muted-foreground">years</span>
          </div>
        </div>
        <div className="grid gap-2">
          <Label>Salvage Value (Optional)</Label>
          <Input
            value={salvageValue}
            onChange={(e) => setSalvageValue(e.target.value)}
            type="number"
            placeholder="Enter salvage value"
          />
        </div>

        <div className="mt-4 p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">Tax Depreciation Notes</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• MACRS is the standard method for US tax depreciation</li>
            <li>• Double declining balance switches to straight-line when optimal</li>
            <li>• Tax life may differ from book depreciation life</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
