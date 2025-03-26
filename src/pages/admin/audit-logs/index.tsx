import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const channel = supabase.channel('audit-logs');

    channel.on(
      'postgres_changes',
      'public',
      'audit_logs',
      (payload) => {
        console.log('Change received!', payload);
        // Update logs state with new data
        setLogs(prevLogs => [...prevLogs, payload]);
      }
    ).subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Audit Logs</h1>
      <div className="border rounded-lg">
        {logs.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No audit logs available
          </div>
        ) : (
          <div className="divide-y">
            {logs.map((log, index) => (
              <div key={index} className="p-4">
                <div className="font-medium">{log.type}</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(log.timestamp).toLocaleString()}
                </div>
                <pre className="mt-2 text-sm bg-muted p-2 rounded">
                  {JSON.stringify(log.data, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
