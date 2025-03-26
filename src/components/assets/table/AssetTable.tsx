
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, Trash2, ArrowRightLeft, FileEdit, Download, CheckSquare } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface Asset {
  id: string;
  name: string;
  category: string;
  location: {
    id: string;
    name: string;
  };
  status: string;
  value: number;
}

interface AssetTableProps {
  assets: Asset[];
  onViewAsset: (id: string) => void;
  onDispose: (asset: Asset) => void;
  onTransferComplete: () => void;
  selectedAssets?: string[];
  onAssetSelect?: (assetId: string) => void;
  showSelection?: boolean;
}

export function AssetTable({ 
  assets, 
  onViewAsset, 
  onDispose,
  onTransferComplete,
  selectedAssets = [],
  onAssetSelect,
  showSelection = false
}: AssetTableProps) {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'In Service':
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case 'Under Repair':
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case 'Disposed':
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case 'In Transit':
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {showSelection && (
            <TableHead className="w-[50px]">
              <Checkbox />
            </TableHead>
          )}
          <TableHead>Asset ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Value</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assets.map((asset) => (
          <TableRow key={asset.id} className="hover:bg-muted/50">
            {showSelection && (
              <TableCell>
                <Checkbox 
                  checked={selectedAssets.includes(asset.id)}
                  onCheckedChange={() => onAssetSelect?.(asset.id)}
                  disabled={asset.status === 'Disposed'}
                />
              </TableCell>
            )}
            <TableCell className="font-medium">{asset.id}</TableCell>
            <TableCell>{asset.name}</TableCell>
            <TableCell>{asset.category}</TableCell>
            <TableCell>{asset.location.name}</TableCell>
            <TableCell>
              <Badge 
                variant="outline" 
                className={`font-normal ${getStatusColor(asset.status)}`}
              >
                {asset.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">${asset.value.toLocaleString()}</TableCell>
            <TableCell className="text-right relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white border rounded-lg shadow-lg z-[100] min-w-[180px]">
                  <DropdownMenuLabel className="font-semibold text-gray-700">Actions</DropdownMenuLabel>
                  <DropdownMenuItem 
                    onClick={() => onViewAsset(asset.id)}
                    className="cursor-pointer flex items-center py-2 hover:bg-primary/10"
                  >
                    <Eye className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-gray-800">View Details</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    disabled={asset.status === 'Disposed'} 
                    className="cursor-pointer flex items-center py-2 hover:bg-primary/10 data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed"
                  >
                    <FileEdit className="mr-2 h-4 w-4 text-gray-600" />
                    <span className="text-gray-800">Edit Asset</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    disabled={asset.status === 'Disposed'} 
                    className="cursor-pointer flex items-center py-2 hover:bg-primary/10 data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed"
                  >
                    <ArrowRightLeft className="mr-2 h-4 w-4 text-gray-600" />
                    <span className="text-gray-800">Transfer</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-100" />
                  <DropdownMenuItem 
                    onClick={() => onDispose(asset)} 
                    disabled={asset.status === 'Disposed'} 
                    className="cursor-pointer flex items-center py-2 hover:bg-red-50 data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed"
                  >
                    <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                    <span className="text-red-500">Dispose</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer flex items-center py-2 hover:bg-primary/10">
                    <Download className="mr-2 h-4 w-4 text-gray-600" />
                    <span className="text-gray-800">Export Data</span>
                  </DropdownMenuItem>
                  {showSelection && (
                    <DropdownMenuItem 
                      onClick={() => onAssetSelect?.(asset.id)} 
                      disabled={asset.status === 'Disposed'} 
                      className="cursor-pointer flex items-center py-2 hover:bg-primary/10 data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed"
                    >
                      <CheckSquare className="mr-2 h-4 w-4 text-gray-600" />
                      <span className="text-gray-800">{selectedAssets.includes(asset.id) ? 'Deselect' : 'Select'}</span>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
