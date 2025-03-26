
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, DollarSign } from "lucide-react";
import { HorizontalAssetsTabs } from "@/components/assets/HorizontalAssetsTabs";

export default function AssetsCapitalisation() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Asset Capitalisation</h1>
          <p className="text-muted-foreground">Manage asset capitalisation and financial reporting</p>
        </div>
        <Button className="inline-flex items-center justify-center">
          <Plus className="h-4 w-4 mr-2" />
          Capitalize Asset
        </Button>
      </div>

      <HorizontalAssetsTabs />

      <div className="space-y-4 mt-6">
        <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/10">
          <DollarSign className="h-16 w-16 text-muted mb-4" />
          <h3 className="text-lg font-medium mb-2">Asset Capitalisation</h3>
          <p className="text-muted-foreground mb-6 max-w-lg">
            Manage the process of capitalizing assets and tracking their financial impact
          </p>
        </div>
      </div>
    </main>
  );
}
