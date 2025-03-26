
import { Button } from "@/components/ui/button";
import { Send, X, Loader2 } from "lucide-react";

interface RequestFormActionsProps {
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function RequestFormActions({ onCancel, isSubmitting }: RequestFormActionsProps) {
  return (
    <div className="flex justify-end gap-4 pt-6 border-t">
      <Button
        type="button"
        variant="ghost"
        onClick={onCancel}
        disabled={isSubmitting}
      >
        <X className="h-4 w-4 mr-2" /> Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            Submit Request <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
}
