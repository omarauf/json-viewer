import { type Node, type NodeProps, Position, useNodeConnections, useNodesData } from "@xyflow/react";
import { BaseHandle } from "../react-flow/base-handle";
import { BaseNode, BaseNodeContent } from "../react-flow/base-node";
import type { InputNode } from "./input-node";

type ViewerNode = Node<Record<string, unknown>, "viewer">;

export function ViewerNode({ id }: NodeProps<ViewerNode>) {
  const connections = useNodeConnections({ id: id, handleType: "target" });
  const sourceIds = connections.map((c) => c.source);
  const sourcesData = useNodesData<InputNode>(sourceIds)[0]?.data.value;
  const keys = Object.keys(sourcesData || {});

  return (
    <BaseNode className="w-fit min-w-40">
      <BaseNodeContent className="font-mono text-sm divide-y divide-gray-700 p-0 gap-0">
        {keys.map((k) => {
          const v = sourcesData?.[k];
          const value = typeof v === "object" ? JSON.stringify(v, null, 2) : String(v);

          return (
            <div key={k} className="flex space-x-2 px-2 py-1">
              <span className="text-blue-500">{k}:</span>
              <span className="text-emerald-500">{value}</span>
            </div>
          );
        })}

        {keys.length === 0 && <div className="p-2 text-gray-500 italic">No data</div>}
      </BaseNodeContent>

      <BaseHandle position={Position.Right} type="source" className="!bg-transparent !border-none !w-0 !h-0" />
      <BaseHandle position={Position.Left} type="target" className="!bg-transparent !border-none !w-0 !h-0" />
    </BaseNode>
  );
}
