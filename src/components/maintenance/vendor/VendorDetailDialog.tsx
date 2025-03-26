
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { Vendor } from "@/types/vendor";
import { Star, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

interface VendorDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vendor: Vendor | null;
}

export function VendorDetailDialog({
  open,
  onOpenChange,
  vendor
}: VendorDetailDialogProps) {
  if (!vendor) return null;

  const handleStatusChange = () => {
    // In a real implementation, this would update the vendor's status
    toast.success(`Vendor status updated successfully`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Vendor Details</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{vendor.name}</h3>
            <Button
              variant={vendor.status === "Active" ? "destructive" : "default"}
              onClick={handleStatusChange}
            >
              {vendor.status === "Active" ? "Deactivate" : "Activate"}
            </Button>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{vendor.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{vendor.phone}</span>
            </div>
            {vendor.address && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{vendor.address}</span>
              </div>
            )}
          </div>

          <div>
            <Label>Service Categories</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {vendor.category.map((cat) => (
                <span
                  key={cat}
                  className="px-2 py-1 bg-primary/10 rounded-full text-sm"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          <div>
            <Label>Rating</Label>
            <div className="flex items-center gap-1 mt-2">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="font-semibold">{vendor.rating?.toFixed(1) || "N/A"}</span>
            </div>
          </div>

          {vendor.serviceHistory && vendor.serviceHistory.length > 0 && (
            <div>
              <Label>Recent Service History</Label>
              <div className="mt-2 space-y-2">
                {vendor.serviceHistory.map((service) => (
                  <div
                    key={service.taskId}
                    className="p-2 border rounded-md"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{service.taskId}</span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400" />
                        <span className="ml-1 text-sm">{service.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{service.date}</p>
                    {service.feedback && (
                      <p className="text-sm mt-1">{service.feedback}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
