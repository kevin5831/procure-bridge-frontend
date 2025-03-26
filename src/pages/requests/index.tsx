
import { Button } from "@/components/ui/button";
import { RequestList } from "@/components/dashboard/RequestList";
import { useState } from "react";
import { NewRequestDialog } from "./components/NewRequestDialog";
import { RequestHeader } from "./components/RequestHeader";
import { useLocation } from "react-router-dom";

export default function Requests() {
  const [showNewRequest, setShowNewRequest] = useState(false);
  const location = useLocation();
  
  // Check if this page is being accessed from the assets sidebar
  const isFromAssets = location.pathname === "/assets/request";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <RequestHeader title={isFromAssets ? "Asset Requests" : "My Purchase Requests"} />
        <Button onClick={() => setShowNewRequest(true)}>
          Create New Request
        </Button>
      </div>

      <RequestList showActions={true} filterByCurrentUser={!isFromAssets} />

      <NewRequestDialog 
        open={showNewRequest} 
        onOpenChange={setShowNewRequest}
      />
    </div>
  );
}
