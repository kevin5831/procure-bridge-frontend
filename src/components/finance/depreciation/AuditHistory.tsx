
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Download } from "lucide-react";
import { AuditLogEntry } from "./types";
import { formatDate } from "@/lib/utils";

interface AuditHistoryProps {
  categoryId: string;
}

export function AuditHistory({ categoryId }: AuditHistoryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Mock audit logs - In a real app, these would come from an API or store
  const mockAuditLogs: AuditLogEntry[] = [
    {
      id: "1",
      timestamp: new Date(Date.now() - 86400000 * 2), // 2 days ago
      user: "John Doe",
      action: "EDIT",
      field: "IFRS Useful Life",
      oldValue: "3 years",
      newValue: "5 years"
    },
    {
      id: "2",
      timestamp: new Date(Date.now() - 86400000 * 5), // 5 days ago
      user: "Jane Smith",
      action: "EDIT",
      field: "Depreciation Method",
      oldValue: "Straight-Line",
      newValue: "Declining Balance"
    },
    {
      id: "3",
      timestamp: new Date(Date.now() - 86400000 * 10), // 10 days ago
      user: "Admin User",
      action: "CREATE",
      field: "Category",
      oldValue: "",
      newValue: "Created"
    }
  ];
  
  const exportAuditLogs = () => {
    // In a real app, this would generate a CSV/PDF
    const csvContent = "data:text/csv;charset=utf-8," +
      "Date,User,Action,Field,Old Value,New Value\n" +
      mockAuditLogs.map(log => 
        `${formatDate(log.timestamp.toISOString())},${log.user},${log.action},${log.field},"${log.oldValue}","${log.newValue}"`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `audit-history-${categoryId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="mt-4">
      <div 
        className="flex items-center justify-between cursor-pointer p-2 hover:bg-muted rounded-md"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="font-medium">Audit History</h3>
        <Button variant="ghost" size="sm" onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
      </div>
      
      {isExpanded && (
        <Card className="mt-2 p-3">
          <div className="flex justify-end mb-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={exportAuditLogs}
              className="flex items-center"
            >
              <Download size={14} className="mr-1" /> 
              Export CSV
            </Button>
          </div>
          
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {mockAuditLogs.map((log) => (
              <div key={log.id} className="border-b pb-2 text-sm">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{log.user}</span>
                  <span className="text-muted-foreground">{formatDate(log.timestamp.toISOString())}</span>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    log.action === "CREATE" ? "bg-green-100 text-green-800" : 
                    log.action === "EDIT" ? "bg-blue-100 text-blue-800" : 
                    "bg-red-100 text-red-800"
                  }`}>
                    {log.action}
                  </span>
                  <span className="ml-2">{log.field}</span>
                </div>
                {log.action === "EDIT" && (
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-muted-foreground text-xs">Previous</span>
                      <p className="text-sm">{log.oldValue}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">New</span>
                      <p className="text-sm">{log.newValue}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
