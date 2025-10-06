import { type Node, type NodeProps, Position, useReactFlow } from "@xyflow/react";
import { useEffect } from "react";
import { BaseNode, BaseNodeContent, BaseNodeHeader, BaseNodeHeaderTitle } from "@/components/react-flow/base-node";
import { useStore } from "@/store";
import { BaseHandle } from "../react-flow/base-handle";

export type InputNode = Node<
  {
    value: object;
  },
  "inputJson"
>;

export function InputNode({ id, data, type }: NodeProps<InputNode>) {
  const { updateNodeData } = useReactFlow();

  const value = useStore((s) => s.value);

  useEffect(() => {
    updateNodeData(id, { value });
  }, [id, value, updateNodeData]);

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
