
import { RequestList } from "@/components/dashboard/RequestList";
import { RequestHeader } from "./components/RequestHeader";

export default function DeliveryRequests() {
  return (
    <div className="space-y-6">
      <RequestHeader title="Delivery Tracking" />
      
      {/* Approved requests waiting for GRN creation */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Awaiting Delivery</h2>
        <p className="text-sm text-muted-foreground">
          Create GRN when items are delivered
        </p>
        <RequestList 
          showActions={true} 
          status="APPROVED" 
          showCreateGRN={true}
        />
      </div>

      {/* Requests that have been received */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Received Items</h2>
        <p className="text-sm text-muted-foreground">
          Items have been received and processed
        </p>
        <RequestList 
          showActions={true} 
          status="APPROVED" 
          grnStatus="RECEIVED"
        />
      </div>
    </div>
  );
}
