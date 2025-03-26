
import { useState, useCallback, useEffect, useRef } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Panel,
  ReactFlowProvider,
  useReactFlow
} from 'reactflow';
import { Button } from "@/components/ui/button";
import { Plus, Save, Undo } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import 'reactflow/dist/style.css';
import { ApprovalNode } from './nodes/ApprovalNode';

const nodeTypes = {
  approvalNode: ApprovalNode,
};

interface WorkflowCreatorProps {
  onNodesChange?: (nodes: Node[]) => void;
  initialRole?: string;
  savedWorkflow?: { nodes: Node[]; edges: Edge[] };
  onSave?: (workflow: { nodes: Node[]; edges: Edge[] }) => void;
}

function WorkflowCreatorInner({ 
  onNodesChange: onNodesChangeCallback, 
  initialRole = 'PROCUREMENT',
  savedWorkflow,
  onSave
}: WorkflowCreatorProps) {
  const { toast } = useToast();
  const reactFlowInstance = useReactFlow();

  const initialNodes = savedWorkflow?.nodes || [
    {
      id: 'start',
      type: 'approvalNode',
      position: { x: 250, y: 0 },
      data: { 
        id: 'start',
        label: 'Initial Approval',
        role: initialRole,
        approver: '',
        isActive: true,
        approvalType: 'ANY'
      }
    },
  ];

  const initialEdges = savedWorkflow?.edges || [];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const prevNodesRef = useRef<Node[]>([]);
  const flowWrapper = useRef<HTMLDivElement>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleDeleteNode = useCallback((id: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
  }, [setNodes, setEdges]);

  const addNewNode = useCallback(() => {
    const newNodeId = `approval_${Date.now()}`;
    const lastNode = nodes[nodes.length - 1];
    const newY = lastNode ? lastNode.position.y + 180 : 0;

    const newNode: Node = {
      id: newNodeId,
      type: 'approvalNode',
      position: { x: 250, y: newY },
      data: {
        id: newNodeId,
        label: `Approval Step ${nodes.length}`,
        role: 'FINANCE',
        approver: '',
        isActive: true,
        approvalType: 'ANY',
        onDelete: handleDeleteNode
      }
    };

    setNodes((nds) => [...nds, newNode]);

    if (lastNode) {
      const newEdge: Edge = {
        id: `e${lastNode.id}-${newNodeId}`,
        source: lastNode.id,
        target: newNodeId,
        type: 'smoothstep',
      };
      setEdges((eds) => [...eds, newEdge]);
    }
  }, [nodes, setNodes, setEdges, handleDeleteNode]);

  // Update all nodes with the delete handler
  useEffect(() => {
    setNodes((nds) => 
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onDelete: handleDeleteNode
        }
      }))
    );
  }, [handleDeleteNode, setNodes]);

  useEffect(() => {
    if (onNodesChangeCallback && JSON.stringify(prevNodesRef.current) !== JSON.stringify(nodes)) {
      prevNodesRef.current = nodes;
      onNodesChangeCallback(nodes);
    }
  }, [nodes, onNodesChangeCallback]);

  const handleSaveWorkflow = useCallback(() => {
    if (onSave) {
      onSave({ nodes, edges });
      toast({
        title: "Workflow saved",
        description: "Your workflow has been saved successfully.",
      });
    }
  }, [nodes, edges, onSave, toast]);

  const fitView = useCallback(() => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView({ padding: 0.2 });
    }
  }, [reactFlowInstance]);

  // Add a small delay before fitting view to ensure proper rendering
  useEffect(() => {
    const timer = setTimeout(() => {
      fitView();
    }, 100);

    return () => clearTimeout(timer);
  }, [fitView]);

  return (
    <div ref={flowWrapper} className="h-[500px] border rounded-lg bg-background">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-muted/10"
      >
        <Background />
        <Controls />
        <Panel position="top-right" className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={fitView}
          >
            <Undo className="h-4 w-4 mr-2" />
            Fit View
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={addNewNode}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Approval Step
          </Button>
          {onSave && (
            <Button 
              size="sm" 
              onClick={handleSaveWorkflow}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Workflow
            </Button>
          )}
        </Panel>
      </ReactFlow>
    </div>
  );
}

// Wrap the component with ReactFlowProvider to handle context properly
export function WorkflowCreator(props: WorkflowCreatorProps) {
  return (
    <ReactFlowProvider>
      <WorkflowCreatorInner {...props} />
    </ReactFlowProvider>
  );
}
