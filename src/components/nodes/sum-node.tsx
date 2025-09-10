import { type Node, type NodeProps, Position, useNodeConnections, useNodesData, useReactFlow } from "@xyflow/react";
import { useEffect } from "react";
import type { AppNode } from "@/app/flow/type";
import { BaseNode, BaseNodeContent, BaseNodeHeader, BaseNodeHeaderTitle } from "../react-flow/base-node";
import { LabeledHandle } from "../react-flow/labeled-handle";

export type SumNode = Node<
  {
    value: number;
  },
  "sum"
>;

export function SumNode({ id, data }: NodeProps<SumNode>) {
  const { updateNodeData } = useReactFlow();

  // Method I - Use useNodeConnections and useNodesData hooks to get source nodes
  const connections = useNodeConnections({ id: id, handleType: "target" });
  const sourceIds = connections.map((c) => c.source);
  const sourcesData = useNodesData<AppNode>(sourceIds);
  const total = sourcesData.reduce((acc, node) => {
    const v = "value" in node?.data ? node.data.value : undefined;
    if (typeof v !== "number") return acc;
    if (node.type === "num" || node.type === "sum") return acc + v;
    return acc;
  }, 0);

  // Method II - Use store with selector and shallow to get source nodes
  // const selector = useCallback(
  //   (s: AppStore) => {
  //     const edges = s.edges.filter((e) => e.target === id);
  //     const nodes = s.nodes.filter((n) => edges.map((e) => e.source).includes(n.id));
  //     return nodes;
  //   },
  //   [id],
  // );
  // const sourceNodes = useStoreWithEqualityFn(useStore, selector, shallow);

  // const total = sourceNodes.reduce((acc, node) => {
  //   if (node.type === "num" || node.type === "sum") return acc + (node?.data.value ?? 0);
  //   return acc;
  // }, 0);

  useEffect(() => {
    updateNodeData(id, { value: total });
  }, [id, total, updateNodeData]);

  return (
    <BaseNode className="w-32">
      <BaseNodeHeader>
        <BaseNodeHeaderTitle>Sum {id}</BaseNodeHeaderTitle>
      </BaseNodeHeader>

      <BaseNodeContent>
        <pre>{data.value}</pre>
      </BaseNodeContent>

      <footer className="bg-muted rounded-b-[6px]">
        <LabeledHandle title="x" id="x" type="target" position={Position.Left} />
        <LabeledHandle title="y" id="y" type="target" position={Position.Left} />
        <LabeledHandle title="out" type="source" position={Position.Right} />
      </footer>
    </BaseNode>
  );
}
