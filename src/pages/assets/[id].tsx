
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, MapPin, Wrench, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { TransferDialog } from "@/components/assets/TransferDialog";
import { DepreciationTab } from "@/components/assets/tabs/DepreciationTab";
import { MaintenanceTab } from "@/components/assets/tabs/MaintenanceTab";
import { AttachmentsTab } from "@/components/assets/tabs/AttachmentsTab";
import { LocationTab } from "@/components/assets/tabs/LocationTab";
import type { MaintenanceTask } from "@/types/maintenance";

const mockAssetDetail = {
  id: "AST001",
  name: "HP Laptop EliteBook G8",
  category: "IT Equipment",
  location: "IT Department",
  status: "In Service",
  value: 1200.00,
  acquisitionDate: "2023-01-15",
  purchasePrice: 1500.00,
  currentBookValue: 1200.00,
  assignedTo: "John Doe",
  itCategory: "Laptop",
  brandModel: "HP EliteBook G8",
  processor: "Intel i7-1165G7",
  memory: "16GB DDR4",
  storage: "512GB SSD",
  color: "Silver",
  condition: "B",
  conditionNotes: "Minor wear on keyboard",
  otherSpecs: "Windows 11 Pro, 14-inch FHD Display",
  maintenanceHistory: [
    {
      id: "MAINT001",
      assetId: "AST001",
      assetName: "HP Laptop EliteBook G8",
      scheduledDate: "2023-06-15",
      description: "Regular maintenance check",
      cost: 50.00,
      status: "Completed",
      completedBy: "Mike Smith",
      vendor: "Tech Solutions Inc"
    }
  ] as MaintenanceTask[],
  depreciation: {
    method: "Straight Line",
    usefulLife: "3 years",
    salvageValue: 300.00,
    monthlyDepreciation: 33.33
  },
  attachments: [
    {
      id: 1,
      name: "Purchase Invoice",
      type: "invoice",
      date: "2023-01-15"
    },
    {
      id: 2,
      name: "Warranty Card",
      type: "warranty",
      date: "2023-01-15"
    }
  ]
};

export default function AssetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const asset = mockAssetDetail;
  const isITAsset = asset.category === "IT Equipment";

  const handleTransferComplete = () => {
    console.log("Asset transferred, refreshing data...");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/assets")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Assets
        </Button>
        <TransferDialog
          assetId={asset.id}
          assetName={asset.name}
          currentLocation={asset.location}
          onTransferComplete={handleTransferComplete}
        />
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Asset Details</h1>
        <p className="text-muted-foreground">
          Viewing detailed information for asset {id}
        </p>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="bg-card w-full justify-start">
          <TabsTrigger value="details">
            <Info className="h-4 w-4 mr-2" />
            Details
          </TabsTrigger>
          <TabsTrigger value="depreciation">
            <FileText className="h-4 w-4 mr-2" />
            Depreciation
          </TabsTrigger>
          <TabsTrigger value="location">
            <MapPin className="h-4 w-4 mr-2" />
            Location
          </TabsTrigger>
          <TabsTrigger value="maintenance">
            <Wrench className="h-4 w-4 mr-2" />
            Maintenance
          </TabsTrigger>
          <TabsTrigger value="attachments">
            <FileText className="h-4 w-4 mr-2" />
            Attachments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>{asset.name}</CardTitle>
              <CardDescription>Asset ID: {asset.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Category</p>
                  <p>{asset.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <p>{asset.status}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Location</p>
                  <p>{asset.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Assigned To</p>
                  <p>{asset.assignedTo}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Purchase Price</p>
                  <p>${asset.purchasePrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current Value</p>
                  <p>${asset.currentBookValue.toFixed(2)}</p>
                </div>
              </div>

              {isITAsset && (
                <>
                  <div className="mt-6 border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">IT Asset Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">IT Category</p>
                        <p>{asset.itCategory}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Brand/Model</p>
                        <p>{asset.brandModel}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Processor</p>
                        <p>{asset.processor}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Memory</p>
                        <p>{asset.memory}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Storage</p>
                        <p>{asset.storage}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Color</p>
                        <p>{asset.color}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Condition Grade</p>
                        <p>{asset.condition}</p>
                      </div>
                    </div>
                    {(asset.conditionNotes || asset.otherSpecs) && (
                      <div className="mt-4 grid grid-cols-1 gap-4">
                        {asset.conditionNotes && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Condition Notes</p>
                            <p className="mt-1">{asset.conditionNotes}</p>
                          </div>
                        )}
                        {asset.otherSpecs && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Other Specifications</p>
                            <p className="mt-1">{asset.otherSpecs}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="depreciation">
          <DepreciationTab depreciation={asset.depreciation} />
        </TabsContent>

        <TabsContent value="maintenance">
          <MaintenanceTab maintenanceHistory={asset.maintenanceHistory} />
        </TabsContent>

        <TabsContent value="attachments">
          <AttachmentsTab attachments={asset.attachments} />
        </TabsContent>

        <TabsContent value="location">
          <LocationTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
