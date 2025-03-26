
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Calendar, Building, User } from "lucide-react";

interface LocationHistory {
  id: string;
  fromLocation: string;
  toLocation: string;
  date: string;
  assignedTo?: string;
  department?: string;
}

// Mock data - replace with actual data from API
const locationHistory: LocationHistory[] = [
  {
    id: "LOC001",
    fromLocation: "IT Department",
    toLocation: "Finance Department",
    date: "2024-01-15",
    assignedTo: "Jane Smith",
    department: "Finance",
  },
  {
    id: "LOC002",
    fromLocation: "Finance Department",
    toLocation: "Marketing Department",
    date: "2024-02-01",
    assignedTo: "John Doe",
    department: "Marketing",
  },
];

export function LocationTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Location & Assignment History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {locationHistory.length === 0 ? (
            <p className="text-muted-foreground">No location changes recorded yet.</p>
          ) : (
            locationHistory.map((record, index) => (
              <div
                key={record.id}
                className="relative pl-8 pb-8 last:pb-0"
              >
                {/* Timeline connector */}
                {index !== locationHistory.length - 1 && (
                  <div className="absolute left-[15px] top-[24px] bottom-0 w-[2px] bg-border" />
                )}
                
                {/* Timeline dot */}
                <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{record.date}</span>
                  </div>

                  <div className="font-medium">
                    Transferred from {record.fromLocation} to {record.toLocation}
                  </div>

                  {(record.assignedTo || record.department) && (
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      {record.assignedTo && (
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>Assigned to: {record.assignedTo}</span>
                        </div>
                      )}
                      {record.department && (
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          <span>Department: {record.department}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
