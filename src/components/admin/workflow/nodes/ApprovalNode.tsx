
import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Info, Trash2, User, UsersRound } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useState } from "react";

const roles = [
  { value: 'PROCUREMENT', label: 'Procurement', description: 'Reviews and approves purchase requests' },
  { value: 'FINANCE', label: 'Finance', description: 'Reviews financial implications' },
  { value: 'IT', label: 'IT', description: 'Technical review and approval' },
  { value: 'LEGAL', label: 'Legal', description: 'Legal compliance review' },
  { value: 'SECURITY', label: 'Security', description: 'Security assessment' },
  { value: 'EMPLOYEE', label: 'Employee', description: 'Initial request creation' }
];

interface ApprovalNodeProps {
  data: {
    id: string;
    label: string;
    role: string;
    approver: string;
    isActive?: boolean;
    approvalType?: 'ANY' | 'ALL';
    onDelete?: (id: string) => void;
  };
  isConnectable: boolean;
  selected?: boolean;
}

function ApprovalNodeComponent({ data, isConnectable, selected }: ApprovalNodeProps) {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleApproverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    data.approver = event.target.value;
  };

  const handleDelete = () => {
    if (data.onDelete) {
      data.onDelete(data.id);
    }
  };

  const toggleApprovalType = () => {
    data.approvalType = data.approvalType === 'ANY' ? 'ALL' : 'ANY';
  };

  return (
    <Card className={`w-[320px] ${selected ? 'ring-2 ring-primary' : ''}`}>
      <CardHeader className="p-4 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {data.isActive !== false ? (
            <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
              Active
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-gray-500/10 text-gray-600 border-gray-200">
              Inactive
            </Badge>
          )}
          {data.label}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Configure who needs to approve at this stage</p>
            </TooltipContent>
          </Tooltip>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Role</Label>
            <Switch
              checked={data.isActive !== false}
              onCheckedChange={(checked) => {
                data.isActive = checked;
              }}
              className="scale-75"
            />
          </div>
          <Select
            value={data.role}
            onValueChange={(value) => {
              data.role = value;
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select approver role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  <div className="flex flex-col">
                    <span>{role.label}</span>
                    <span className="text-xs text-muted-foreground">{role.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Approver</Label>
            <Button 
              variant="outline" 
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={toggleApprovalType}
            >
              {data.approvalType === 'ANY' ? (
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>Any One</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <UsersRound className="h-3 w-3" />
                  <span>All Members</span>
                </div>
              )}
            </Button>
          </div>
          <Input 
            placeholder="Enter approver email"
            value={data.approver}
            onChange={handleApproverChange}
          />
          <p className="text-xs text-muted-foreground">
            {data.approvalType === 'ANY' ? 
              "Any one member of this role can approve" : 
              "All members of this role must approve"}
          </p>
        </div>
      </CardContent>
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-muted-foreground/50 !w-3 !h-3 !border-2 !border-background"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-muted-foreground/50 !w-3 !h-3 !border-2 !border-background"
        isConnectable={isConnectable}
      />
    </Card>
  );
}

export const ApprovalNode = memo(ApprovalNodeComponent);
