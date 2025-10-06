import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";
import { useShallow } from "zustand/shallow";
import { nodeTypes } from "@/components/nodes";
import { DataEdge } from "@/components/react-flow/data-edge";
import { type AppStore, useStore } from "@/store";
import { LayoutButtonsMemo } from "./components/layout-buttons";
import { SidebarMemo } from "./components/sidebar";

const edgeTypes = {
  data: DataEdge,
};

const selector = (state: AppStore) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  onDrop: state.onDrop,
  onDragOver: state.onDragOver,
  setFlowInstance: state.setFlowInstance,
  setRef: state.setRef,
});

export default function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onDrop, onDragOver, setFlowInstance, setRef } =
    useStore(useShallow(selector));

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
        onDrop={onDrop}
        onInit={setFlowInstance}
        ref={setRef}
        // onDragStart={onDragStart}
        onDragOver={onDragOver}
        fitView
      >
        <SidebarMemo position="top-left" />

        <LayoutButtonsMemo position="top-right" />

        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
