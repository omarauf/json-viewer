import { type Node, type NodeProps, Position } from "@xyflow/react";
import { BaseNode, BaseNodeContent, BaseNodeHeader, BaseNodeHeaderTitle } from "@/components/react-flow/base-node";
import { BaseHandle } from "../react-flow/base-handle";

export type InputNode = Node<
  {
    value: object;
  },
  "inputJson"
>;

export function InputNode({ data, type }: NodeProps<InputNode>) {
  return (
    <BaseNode className="w-80">
      <BaseNodeHeader className="border-b">
        <BaseNodeHeaderTitle>Input</BaseNodeHeaderTitle>
      </BaseNodeHeader>

      <BaseNodeContent className="relative">
        <div className="flex gap-2 items-center overflow-hidden">
          <pre>{JSON.stringify(data.value, null, 2)}</pre>
        </div>
        <BaseHandle type="source" position={Position.Right} className="w-2" id={`${type}-out`} />
      </BaseNodeContent>
    </BaseNode>
  );
}
