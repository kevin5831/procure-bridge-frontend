
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Save } from "lucide-react";
import { useState } from "react";
import type { WorkflowConfiguration, WorkflowRule } from "@/types/workflow";
import { assetCategories } from "@/pages/requests/types";
import { WorkflowCreator } from "./WorkflowCreator";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function WorkflowRules() {
  const [config, setConfig] = useState<WorkflowConfiguration>({
    rules: []
  });

  const [selectedCategory, setSelectedCategory] = useState<string>(assetCategories[0]);
  const [selectedRange, setSelectedRange] = useState<{ min: number; max: number }>({ min: 0, max: 1000 });

  const addRule = () => {
    if (config.rules.some(rule => rule.assetCategory === selectedCategory)) {
      toast.error("A rule for this category already exists");
      return;
    }

    setConfig(prev => ({
      rules: [
        ...prev.rules,
        {
          assetCategory: selectedCategory,
          ranges: [
            {
              min: selectedRange.min,
              max: selectedRange.max,
              approvers: [] // This will be populated by the WorkflowCreator
            }
          ]
        }
      ]
    }));
  };

  const handleSave = () => {
    console.log("Saving configuration:", config);
    toast.success("Workflow configuration saved successfully");
  };

  const handleWorkflowUpdate = (categoryIndex: number, nodes: any[]) => {
    setConfig(prev => {
      const newRules = [...prev.rules];
      newRules[categoryIndex].ranges[0].approvers = nodes
        .filter(node => node.type === 'approvalNode')
        .map(node => ({
          role: node.data.role,
          action: 'approve'
        }));
      return { rules: newRules };
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Approval Workflow Rules</h3>
        <div className="flex gap-2">
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Add New Workflow Rule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Asset Category</label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {assetCategories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={addRule} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6">
        {config.rules.map((rule, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-base">
                {rule.assetCategory} Approval Workflow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <WorkflowCreator 
                onNodesChange={(nodes) => handleWorkflowUpdate(index, nodes)}
                initialRole={rule.ranges[0]?.approvers[0]?.role}
              />
            </CardContent>
          </Card>
        ))}
      </div>
      
      {config.rules.length === 0 && (
        <div className="text-center p-8 border rounded-lg bg-muted/10">
          <p className="text-muted-foreground">
            No approval workflows configured. Select a category above to create one.
          </p>
        </div>
      )}
    </div>
  );
}
