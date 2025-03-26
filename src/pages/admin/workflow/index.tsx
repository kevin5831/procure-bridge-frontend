
import { WorkflowCreator } from "@/components/admin/workflow/WorkflowCreator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WorkflowRule } from "@/components/admin/workflow/types";
import { WorkflowRuleCard } from "@/components/admin/workflow/WorkflowRuleCard";
import { EditRuleDialog } from "@/components/admin/workflow/EditRuleDialog";
import { CreateRuleDialog } from "@/components/admin/workflow/CreateRuleDialog";
import { ApprovalDashboard } from "@/components/admin/workflow/ApprovalDashboard";
import { useWorkflowRules } from "@/hooks/useWorkflowRules";
import { useToast } from "@/components/ui/use-toast";

const initialRules: WorkflowRule[] = [
  {
    id: "1",
    name: "IT Equipment Low Cost",
    description: "Approval workflow for IT equipment purchases under $5000",
    category: "IT Equipment",
    costRange: {
      min: 0,
      max: 5000,
      currency: 'USD'
    },
    status: 'live',
    approvalSteps: [
      { order: 1, role: 'IT_MANAGER', requiredLevel: 'ANY' },
      { order: 2, role: 'FINANCE', requiredLevel: 'ANY' }
    ]
  },
  {
    id: "2",
    name: "IT Equipment High Cost",
    description: "Approval workflow for IT equipment purchases over $5000",
    category: "IT Equipment",
    costRange: {
      min: 5000,
      max: 100000,
      currency: 'USD'
    },
    status: 'live',
    approvalSteps: [
      { order: 1, role: 'IT_MANAGER', requiredLevel: 'ANY' },
      { order: 2, role: 'FINANCE', requiredLevel: 'ANY' },
      { order: 3, role: 'PROCUREMENT', requiredLevel: 'ANY' }
    ]
  },
];

export default function Workflow() {
  console.log('Workflow component rendered'); // Added debug log
  const { rules, setRules, validateRuleCoverage } = useWorkflowRules();
  const { toast } = useToast();
  const [selectedRule, setSelectedRule] = useState<WorkflowRule | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<WorkflowRule | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newRule, setNewRule] = useState<Omit<WorkflowRule, 'id'>>({
    name: '',
    description: '',
    category: 'IT Equipment',
    costRange: {
      min: 0,
      max: 0,
      currency: 'USD'
    },
    status: 'draft',
    approvalSteps: []
  });

  useEffect(() => {
    console.log('Setting initial rules'); // Added debug log
    setRules(initialRules);
  }, []);

  useEffect(() => {
    const gaps = validateRuleCoverage();
    if (gaps.length > 0) {
      toast({
        title: "Workflow Coverage Gaps Detected",
        description: "There are gaps in the workflow rules coverage. Some requests might not have a matching workflow.",
        variant: "destructive",
      });
    }
  }, [rules]);

  const handleEditClick = (rule: WorkflowRule) => {
    setEditingRule({ ...rule });
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingRule) {
      setRules(rules => 
        rules.map(rule => rule.id === editingRule.id ? editingRule : rule)
      );
    }
    setEditDialogOpen(false);
    setEditingRule(null);
  };

  const handleCreateRule = () => {
    const newId = `${rules.length + 1}`;
    const ruleToAdd = {
      ...newRule,
      id: newId,
    };
    
    setRules(prev => [...prev, ruleToAdd]);
    setCreateDialogOpen(false);
    setNewRule({
      name: '',
      description: '',
      category: 'IT Equipment',
      costRange: {
        min: 0,
        max: 0,
        currency: 'USD'
      },
      status: 'draft',
      approvalSteps: []
    });
  };

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Workflow Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Configure and manage approval workflows</p>
        </div>
        <Button className="gap-2" onClick={() => setCreateDialogOpen(true)}>
          <span className="text-lg leading-none">+</span>
          Add New Rule
        </Button>
      </div>

      <Tabs defaultValue="rules">
        <TabsList className="mb-4">
          <TabsTrigger value="rules">Workflow Rules</TabsTrigger>
          <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
        </TabsList>

        <TabsContent value="rules">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Sidebar - Rules List */}
            <div className="col-span-4 space-y-4">
              {rules.map((rule) => (
                <WorkflowRuleCard
                  key={rule.id}
                  rule={rule}
                  isSelected={selectedRule?.id === rule.id}
                  onSelect={setSelectedRule}
                  onEdit={handleEditClick}
                />
              ))}
            </div>

            {/* Right Side - Rule Configuration */}
            <div className="col-span-8">
              <Card className="h-[calc(100vh-12rem)]">
                <CardContent className="p-6">
                  {selectedRule ? (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-semibold">{selectedRule.name}</h2>
                        <p className="text-sm text-muted-foreground">{selectedRule.description}</p>
                      </div>
                      <WorkflowCreator initialRole={selectedRule.category === "IT Equipment" ? "IT" : "PROCUREMENT"} />
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                      Select a workflow rule to start configuring
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="approvals">
          <ApprovalDashboard />
        </TabsContent>
      </Tabs>

      <EditRuleDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        rule={editingRule}
        onRuleChange={setEditingRule}
        onSave={handleSaveEdit}
      />

      <CreateRuleDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        newRule={newRule}
        onRuleChange={setNewRule}
        onSave={handleCreateRule}
      />
    </div>
  );
}
