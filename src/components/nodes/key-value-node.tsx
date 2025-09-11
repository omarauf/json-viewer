import { type Node, type NodeProps, Position } from "@xyflow/react";
import { BaseHandle } from "../react-flow/base-handle";
import { BaseNode, BaseNodeContent } from "../react-flow/base-node";

export type KeyValueNode = Node<{
  value: Record<string, object>;
}>;

export function KeyValueNode({ data }: NodeProps<KeyValueNode>) {
  const keys = Object.keys(data.value);

  return (
    <BaseNode className="w-fit min-w-40">
      <BaseNodeContent className="font-mono text-sm divide-y divide-gray-700 p-0 gap-0">
        {keys.map((k) => {
          const v = data.value[k];
          const value = typeof v === "object" ? JSON.stringify(v, null, 2) : String(v);

          return (
            <div key={k} className="flex space-x-2 px-2 py-1">
              <span className="text-blue-500">{k}:</span>
              <span className="text-emerald-500">{value}</span>
            </div>
          );
        })}
      </BaseNodeContent>

      <BaseHandle position={Position.Right} type="source" className="!bg-transparent !border-none !w-0 !h-0" />
      <BaseHandle position={Position.Left} type="target" className="!bg-transparent !border-none !w-0 !h-0" />
    </BaseNode>
  );
}
