
import { Button } from "@/components/ui/button";

interface RequestHeaderProps {
  title?: string;
  onCancel?: () => void;
}

export function RequestHeader({ title, onCancel }: RequestHeaderProps) {
  if (onCancel) {
    return (
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Create New Request</h1>
          <p className="text-muted-foreground">Fill in the details to submit a new asset request</p>
        </div>
        <Button
          variant="outline"
          onClick={onCancel}
        >
          Cancel Request
        </Button>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-primary">{title}</h1>
      <p className="text-muted-foreground">Manage and track procurement requests</p>
    </div>
  );
}
