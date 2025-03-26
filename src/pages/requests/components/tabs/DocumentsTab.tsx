
import { Card, CardContent } from "@/components/ui/card";

export function DocumentsTab() {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-center text-muted-foreground">No documents attached to this request.</p>
      </CardContent>
    </Card>
  );
}
