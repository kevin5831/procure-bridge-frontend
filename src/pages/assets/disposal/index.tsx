
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { HorizontalAssetsTabs } from "@/components/assets/HorizontalAssetsTabs";
import { BulkDisposalDialog } from "@/components/assets/BulkDisposalDialog";

export default function AssetsDisposal() {
  const [isBulkDisposalOpen, setIsBulkDisposalOpen] = useState(false);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Asset Disposal</h1>
          <p className="text-muted-foreground">Manage asset disposal workflows and requests</p>
        </div>
        <Button 
          onClick={() => setIsBulkDisposalOpen(true)}
          className="inline-flex items-center justify-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Disposal Request
        </Button>
      </div>

      <HorizontalAssetsTabs />

      <div className="space-y-4 mt-6">
        <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/10">
          <div className="h-16 w-16 text-muted mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">Asset Disposal Management</h3>
          <p className="text-muted-foreground mb-6 max-w-lg">
            View and manage asset disposal requests, approvals, and financial impact reporting
          </p>
        </div>
      </div>
      
      <BulkDisposalDialog
        assets={[]}
        selectedAssetIds={[]}
        open={isBulkDisposalOpen}
        onOpenChange={setIsBulkDisposalOpen}
        onDisposalComplete={() => {}}
      />
    </main>
  );
}
