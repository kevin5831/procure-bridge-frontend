
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Info } from "lucide-react";

export function ImpairmentNotes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Info className="h-5 w-5 mr-2" />
          Revaluation Guidelines
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="space-y-2">
          <h3 className="font-semibold">IFRS Compliance</h3>
          <p>
            Under IFRS, revaluations must be applied to entire classes (categories) of assets, 
            not just individual assets. This maintains consistency in your accounting approach.
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold">Upward Revaluation</h3>
          <p>
            Increases in value are credited to Other Comprehensive Income (OCI) and accumulated in equity 
            as Revaluation Surplus unless they reverse a previous impairment.
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold flex items-center text-amber-600">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Downward Revaluation (Impairment)
          </h3>
          <p>
            Decreases in value are recognized in profit or loss unless they offset previous increases. 
            Ensure you have valid reasons documented for any impairment recognized.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Record Keeping</h3>
          <p>
            All revaluations must be supported by appropriate documentation, including date of revaluation, 
            method used, and market value evidence. Attach supporting documents whenever possible.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
