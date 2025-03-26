
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Clock, CheckCircle2, XCircle, AlertCircle, Calendar, User, DollarSign, FileText } from "lucide-react";
import { WorkflowInstance, ApprovalStatus } from "./types";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Mock data - replace with actual API call
const mockPendingApprovals: WorkflowInstance[] = [
  {
    id: "1",
    requestId: "REQ-001",
    requestTitle: "New Laptops for Dev Team",
    amount: 4500,
    currency: "USD",
    category: "IT Equipment",
    currentStep: 1,
    status: "IN_PROGRESS",
    requester: "John Smith",
    priority: "Medium",
    createdAt: new Date("2023-05-15"),
    dueDate: new Date("2023-05-22"),
    approvalSteps: [
      {
        order: 1,
        role: "IT_MANAGER",
        status: "PENDING",
        assignedTo: "Sarah Connor"
      },
      {
        order: 2,
        role: "FINANCE",
        status: "PENDING",
        assignedTo: "Michael Scott"
      }
    ]
  },
  {
    id: "2",
    requestId: "REQ-002",
    requestTitle: "Office Furniture",
    amount: 2300,
    currency: "USD",
    category: "Furniture",
    currentStep: 1,
    status: "IN_PROGRESS",
    requester: "Alice Brown",
    priority: "Low",
    createdAt: new Date("2023-05-18"),
    dueDate: new Date("2023-05-30"),
    approvalSteps: [
      {
        order: 1,
        role: "PROCUREMENT",
        status: "PENDING",
        assignedTo: "Robert Palmer"
      }
    ]
  },
  {
    id: "3",
    requestId: "REQ-003",
    requestTitle: "Video Conference Equipment",
    amount: 7800,
    currency: "USD",
    category: "IT Equipment",
    currentStep: 2,
    status: "IN_PROGRESS",
    requester: "Emma Thompson",
    priority: "High",
    createdAt: new Date("2023-05-10"),
    dueDate: new Date("2023-05-17"),
    approvalSteps: [
      {
        order: 1,
        role: "IT_MANAGER",
        status: "APPROVED",
        assignedTo: "James Wilson",
        approvedBy: "James Wilson",
        approvedAt: new Date("2023-05-12"),
        comments: "Approved as per IT roadmap"
      },
      {
        order: 2,
        role: "FINANCE",
        status: "PENDING",
        assignedTo: "Michael Scott"
      },
      {
        order: 3,
        role: "PROCUREMENT",
        status: "PENDING",
        assignedTo: "Robert Palmer"
      }
    ]
  }
];

interface ApprovalActionProps {
  status: ApprovalStatus;
}

function ApprovalStatusBadge({ status }: ApprovalActionProps) {
  const variants: Record<ApprovalStatus, { variant: "default" | "destructive" | "outline" | "secondary", label: string, icon: React.ReactNode }> = {
    PENDING: { variant: "outline", label: "Pending", icon: <Clock className="w-4 h-4" /> },
    APPROVED: { variant: "default", label: "Approved", icon: <CheckCircle2 className="w-4 h-4" /> },
    REJECTED: { variant: "destructive", label: "Rejected", icon: <XCircle className="w-4 h-4" /> },
    CHANGES_REQUESTED: { variant: "secondary", label: "Changes Requested", icon: <AlertCircle className="w-4 h-4" /> }
  };

  const { variant, label, icon } = variants[status];

  return (
    <Badge variant={variant} className="flex items-center gap-1">
      {icon}
      {label}
    </Badge>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const variants: Record<string, { color: string, bgColor: string }> = {
    "High": { color: "text-red-600", bgColor: "bg-red-100" },
    "Medium": { color: "text-amber-600", bgColor: "bg-amber-100" },
    "Low": { color: "text-green-600", bgColor: "bg-green-100" }
  };
  
  const { color, bgColor } = variants[priority] || { color: "text-gray-600", bgColor: "bg-gray-100" };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color} ${bgColor}`}>
      {priority}
    </span>
  );
}

export function ApprovalDashboard() {
  const [selectedRequest, setSelectedRequest] = useState<WorkflowInstance | null>(null);
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const { toast } = useToast();

  const handleApprovalAction = (action: 'approve' | 'reject' | 'request_changes') => {
    if (!selectedRequest) return;

    const actionMessages = {
      approve: "Request approved successfully",
      reject: "Request rejected",
      request_changes: "Changes requested from submitter"
    };

    toast({
      title: actionMessages[action],
      description: comment ? `Comment: ${comment}` : undefined,
    });

    setComment("");
    // In a real app, you would update the selected request status and refresh the data
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left side - Approvals List */}
      <div className="col-span-5 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center justify-between">
              <span>Pending Approvals</span>
              <Badge variant="outline" className="ml-2">
                {mockPendingApprovals.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-14rem)]">
              <div className="space-y-4">
                {mockPendingApprovals.map((approval) => (
                  <Card 
                    key={approval.id}
                    className={`cursor-pointer transition-colors hover:bg-muted ${
                      selectedRequest?.id === approval.id ? 'border-primary ring-1 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedRequest(approval)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{approval.requestTitle}</h3>
                          <p className="text-sm text-muted-foreground">
                            {approval.requestId} · {approval.category}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <ApprovalStatusBadge status="PENDING" />
                          <PriorityBadge priority={approval.priority} />
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <DollarSign className="w-4 h-4" />
                          <span>{approval.amount.toLocaleString()} {approval.currency}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>Due: {formatDate(approval.dueDate)}</span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center text-sm">
                        <User className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">Requested by: </span>
                        <span className="font-medium ml-1">{approval.requester}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Right side - Request Details & Actions */}
      <div className="col-span-7">
        <Card className="h-[calc(100vh-12rem)]">
          <CardContent className="p-6">
            {selectedRequest ? (
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-start">
                    <h2 className="text-lg font-semibold">{selectedRequest.requestTitle}</h2>
                    <Badge className="ml-2 text-md px-2 py-1">
                      {selectedRequest.amount.toLocaleString()} {selectedRequest.currency}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Request ID: {selectedRequest.requestId}
                  </p>
                </div>

                <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="timeline">Approval Timeline</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="space-y-1">
                        <label className="text-sm font-medium">Category</label>
                        <p className="text-sm">{selectedRequest.category}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium">Priority</label>
                        <p className="text-sm">
                          <PriorityBadge priority={selectedRequest.priority} />
                        </p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium">Requested By</label>
                        <p className="text-sm">{selectedRequest.requester}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium">Request Date</label>
                        <p className="text-sm">{formatDate(selectedRequest.createdAt)}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium">Due Date</label>
                        <p className="text-sm">{formatDate(selectedRequest.dueDate)}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium">Current Approval Step</label>
                        <p className="text-sm">{selectedRequest.currentStep} of {selectedRequest.approvalSteps.length}</p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <label className="text-sm font-medium">Your Comment</label>
                      <Textarea 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add your comments here..."
                        className="mt-1"
                      />
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button 
                        onClick={() => handleApprovalAction('approve')}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => handleApprovalAction('request_changes')}
                        className="flex-1"
                      >
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Request Changes
                      </Button>
                      <Button 
                        variant="destructive"
                        onClick={() => handleApprovalAction('reject')}
                        className="flex-1"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="timeline" className="space-y-4">
                    <div className="space-y-4">
                      {selectedRequest.approvalSteps.map((step) => (
                        <div 
                          key={step.order}
                          className={`flex items-start gap-4 p-4 rounded-lg border ${
                            step.status === 'APPROVED' ? 'bg-green-50 border-green-200' : 
                            step.status === 'REJECTED' ? 'bg-red-50 border-red-200' : 
                            'bg-white'
                          }`}
                        >
                          <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center shrink-0
                            ${step.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 
                              step.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 
                              'bg-gray-100 text-gray-700'}
                          `}>
                            {step.order}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <p className="font-medium">{step.role.replace('_', ' ')}</p>
                                <p className="text-sm text-muted-foreground">
                                  Assigned to: {step.assignedTo}
                                </p>
                              </div>
                              <ApprovalStatusBadge status={step.status} />
                            </div>
                            
                            {step.approvedBy && (
                              <div className="mt-3 flex items-center gap-2">
                                <Avatar className="w-6 h-6">
                                  <AvatarFallback className="text-xs">
                                    {getInitials(step.approvedBy)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm">{step.approvedBy}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {step.approvedAt && formatDate(step.approvedAt)}
                                  </p>
                                </div>
                              </div>
                            )}
                            
                            {step.comments && (
                              <div className="mt-2 text-sm p-2 bg-background rounded border">
                                <p className="italic">"{step.comments}"</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="documents" className="space-y-4">
                    <div className="text-center p-8">
                      <p className="text-muted-foreground">No documents attached to this request</p>
                      <Button variant="outline" className="mt-4">
                        Upload Document
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                <img src="/placeholder.svg" className="w-32 h-32 opacity-20 mb-4" alt="Select a request" />
                <p>Select a request to view details and take action</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
