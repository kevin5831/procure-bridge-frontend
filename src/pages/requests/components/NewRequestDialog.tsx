
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreateRequestForm } from "./CreateRequestForm";
import { CreateAssetRequestForm } from "./CreateAssetRequestForm";
import { useLocation } from "react-router-dom";
import { AssetCategory } from "../types";
import { useEffect } from "react";

interface NewRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assetCategory?: AssetCategory;
}

export function NewRequestDialog({ open, onOpenChange, assetCategory }: NewRequestDialogProps) {
  const location = useLocation();
  const isAssetRequest = location.pathname === "/assets/request";

  // If the dialog is opened, use the global side panel instead
  useEffect(() => {
    if (open) {
      // Close this dialog
      onOpenChange(false);
      
      // Open the global side panel instead
      // @ts-ignore
      if (window.openCreateRequestPanel) {
        // @ts-ignore
        window.openCreateRequestPanel();
      }
    }
  }, [open, onOpenChange]);

  // This component no longer renders the actual form,
  // it just triggers the global side panel
  return null;
}
