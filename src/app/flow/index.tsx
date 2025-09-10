import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";
import { useShallow } from "zustand/shallow";
import { BasicNode } from "@/components/nodes/basic-node";
import { InputNode } from "@/components/nodes/input-node";
import { KeyValueNode } from "@/components/nodes/key-value-node";
import { NumNode } from "@/components/nodes/num-node";
import { SelectorNode } from "@/components/nodes/selector-node";
import { SumNode } from "@/components/nodes/sum-node";
import { DataEdge } from "@/components/react-flow/data-edge";
import { type AppStore, useStore } from "@/store";
import { LayoutButtonsMemo } from "./layout-buttons";

const nodeTypes = {
  inputJson: InputNode,
  basic: BasicNode,
  num: NumNode,
  sum: SumNode,
  selector: SelectorNode,
  keyValue: KeyValueNode,
};

const edgeTypes = {
  data: DataEdge,
};

const selector = (state: AppStore) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export default function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(useShallow(selector));

  return (
    <div className="border" style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        // isValidConnection={(e) => {
        //   console.log(e);
        //   return true;
        // }}
        fitView
      >
        <LayoutButtonsMemo position="top-right" />


        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
