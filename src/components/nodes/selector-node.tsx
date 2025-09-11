import { type Node, type NodeProps, Position, useNodeConnections, useNodesData } from "@xyflow/react";
import type { AppNode } from "@/app/flow/types";
import { BaseNode, BaseNodeContent, BaseNodeHeader, BaseNodeHeaderTitle } from "../react-flow/base-node";
import { LabeledHandle } from "../react-flow/labeled-handle";

type SelectorNode = Node<
  {
    value: number;
  },
  "selector"
>;

export function SelectorNode({ id }: NodeProps<SelectorNode>) {
  const connections = useNodeConnections({ id: id, handleType: "target" });
  const sourceIds = connections.map((c) => c.source);
  const sourcesData = useNodesData<AppNode>(sourceIds);

  console.log(sourcesData);

  return (
    <BaseNode className="w-32">
      <BaseNodeHeader>
        <BaseNodeHeaderTitle>Selector</BaseNodeHeaderTitle>
      </BaseNodeHeader>

      <BaseNodeContent>x</BaseNodeContent>

      <footer className="bg-muted rounded-b-[6px]">
        <LabeledHandle title="x" id="x" type="target" position={Position.Left} />
        <LabeledHandle title="out" type="source" position={Position.Right} />
      </footer>
    </BaseNode>
  );
}
