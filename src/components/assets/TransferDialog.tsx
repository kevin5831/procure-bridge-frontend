
import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { CustomSelect } from "@/components/ui/custom-select";

interface TransferDialogProps {
  assetId: string;
  assetName: string;
  currentLocation: string;
  onTransferComplete?: () => void;
}

// Mock data - replace with API call to match admin locations
const locations = [
  {
    id: "1",
    name: "Head Office",
    code: "HO-001",
    type: "Head Office",
    country: "US",
    city: "New York",
  },
  {
    id: "2",
    name: "Downtown Branch",
    code: "BR-001",
    type: "Branch",
    country: "US",
    city: "Los Angeles",
  },
];

export function TransferDialog({ assetId, assetName, currentLocation, onTransferComplete }: TransferDialogProps) {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date>();
  const [notes, setNotes] = useState("");

  const availableLocations = locations
    .filter(loc => `${loc.name} (${loc.code})` !== currentLocation)
    .map(loc => ({
      value: loc.id,
      label: `${loc.name} (${loc.code}) - ${loc.city}, ${loc.country}`
    }));

  const handleTransfer = () => {
    if (!location || !date) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Here you would typically make an API call to update the asset's location
    console.log("Transferring asset", {
      assetId,
      newLocationId: location,
      transferDate: date,
      notes,
    });

    toast.success("Asset transferred successfully");
    setOpen(false);
    onTransferComplete?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Transfer Asset</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transfer Asset</DialogTitle>
          <DialogDescription>
            Transfer {assetName} to a new location
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="current-location">Current Location</Label>
            <Input
              id="current-location"
              value={currentLocation}
              disabled
              className="bg-muted"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new-location">New Location</Label>
            <CustomSelect
              options={availableLocations}
              value={location}
              onChange={setLocation}
              placeholder="Select new location"
            />
          </div>
          <div className="grid gap-2">
            <Label>Transfer Date</Label>
            <div className="relative">
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  const calendarElement = document.getElementById('transfer-calendar');
                  if (calendarElement) {
                    calendarElement.style.display = calendarElement.style.display === 'none' ? 'block' : 'none';
                  }
                }}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
              <div
                id="transfer-calendar"
                className="absolute top-[calc(100%+4px)] left-0 z-[9999] bg-white border rounded-md shadow-lg p-3"
                style={{ display: 'none' }}
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate);
                    const calendarElement = document.getElementById('transfer-calendar');
                    if (calendarElement) {
                      calendarElement.style.display = 'none';
                    }
                  }}
                  initialFocus
                />
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleTransfer}>Confirm Transfer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
