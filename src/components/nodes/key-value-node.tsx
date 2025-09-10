import {
  type Node,
  type NodeProps,
  Position,
  useNodeConnections,
  useNodesData,
  useReactFlow,
  useStore,
} from "@xyflow/react";
import { useEffect } from "react";
import type { AppNode } from "@/app/flow/type";
import { BaseNode, BaseNodeContent, BaseNodeHeader, BaseNodeHeaderTitle } from "../react-flow/base-node";
import { LabeledHandle } from "../react-flow/labeled-handle";

export type KeyValueNode = Node<{
  value: Record<string, object>;
}>;

export function KeyValueNode({ data }: NodeProps<KeyValueNode>) {
  const keys = Object.keys(data.value);

  return (
    <BaseNode className="w-32">
      <BaseNodeHeader>
        <BaseNodeHeaderTitle>KeyValue</BaseNodeHeaderTitle>
      </BaseNodeHeader>

      <BaseNodeContent>
        {keys.map((k) => {
          const v = data.value[k];
          if (typeof v === "object") {
            return (
              <div key={k}>
                {k}: {JSON.stringify(v)}
              </div>
            );
          }

          return (
            <div key={k}>
              {k}: {v}
            </div>
          );
        })}
      </BaseNodeContent>

      <footer className="bg-muted rounded-b-[6px]">
        <LabeledHandle title="x" id="x" type="target" position={Position.Left} />
        <LabeledHandle title="out" type="source" position={Position.Right} />
      </footer>
    </BaseNode>
  );
}
