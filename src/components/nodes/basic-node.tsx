import { type Node, type NodeProps, Position } from "@xyflow/react";
import { BaseNode, BaseNodeContent } from "../react-flow/base-node";
import { NodeTooltip, NodeTooltipContent, NodeTooltipTrigger } from "../react-flow/node-tooltip";

type BasicNode = Node<
  {
    label: string;
  },
  "basic"
>;

export function BasicNode({ data }: NodeProps<BasicNode>) {
  return (
    <NodeTooltip>
      <NodeTooltipContent position={Position.Top}>{data.label}</NodeTooltipContent>
      <BaseNode>
        <BaseNodeContent>
          <NodeTooltipTrigger>Hover</NodeTooltipTrigger>
        </BaseNodeContent>
      </BaseNode>
    </NodeTooltip>
  );
}
