import { BaseNode, BaseNodeContent } from "@/components/base-node";
import { NodeTooltip, NodeTooltipContent, NodeTooltipTrigger } from "@/components/node-tooltip";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  type Edge,
  type Node,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
  Position,
  ReactFlow,
} from "@xyflow/react";
import { useCallback, useState } from "react";


import { NumNode } from '@/components/nodes/num-node';
import { SumNode } from '@/components/nodes/sum-node';

import { DataEdge } from '@/components/data-edge';


function Tooltip() {
  return (
    <NodeTooltip>
      <NodeTooltipContent position={Position.Top}>Hidden Content</NodeTooltipContent>
      <BaseNode>
        <BaseNodeContent>
          <NodeTooltipTrigger>Hover</NodeTooltipTrigger>
        </BaseNodeContent>
      </BaseNode>
    </NodeTooltip>
  );
}

const nodeTypes = {
  tooltip: Tooltip, num: NumNode,
  sum: SumNode,
};

const initialNodes: Node[] = [
  // { id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" }, type: "tooltip" },
  // { id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" }, type: "tooltip" },
  { id: 'a', type: 'num', data: { value: 0 }, position: { x: 0, y: 0 } },
  { id: 'b', type: 'num', data: { value: 0 }, position: { x: 0, y: 200 } },
  { id: 'c', type: 'sum', data: { value: 0 }, position: { x: 300, y: 100 } },
  { id: 'd', type: 'num', data: { value: 0 }, position: { x: 0, y: 400 } },
  { id: 'e', type: 'sum', data: { value: 0 }, position: { x: 600, y: 400 } },
];

const edgeTypes = {
  data: DataEdge,
};


const initialEdges: Edge[] = [
  // { id: "n1-n2", source: "n1", target: "n2" },
  {
    id: 'a->c',
    type: 'data',
    data: { key: 'value' },
    source: 'a',
    target: 'c',
    targetHandle: 'x',
  },
  {
    id: 'b->c',
    type: 'data',
    data: { key: 'value' },
    source: 'b',
    target: 'c',
    targetHandle: 'y',
  },
  {
    id: 'c->e',
    type: 'data',
    data: { key: 'value' },
    source: 'c',
    target: 'e',
    targetHandle: 'x',
  },
  {
    id: 'd->e',
    type: 'data',
    data: { key: 'value' },
    source: 'd',
    target: 'e',
    targetHandle: 'y',
  },
];

export default function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange: OnNodesChange<Node> = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange: OnEdgesChange<Edge> = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect: OnConnect = useCallback((params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)), []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
