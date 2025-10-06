import { type Node, type NodeProps, Position, useNodeConnections, useNodesData, useReactFlow } from "@xyflow/react";
import { useState } from "react";
import { BaseHandle } from "../react-flow/base-handle";
import { BaseNode, BaseNodeContent, BaseNodeHeader, BaseNodeHeaderTitle } from "../react-flow/base-node";
import { Button } from "../ui/button";
import type { InputNode } from "./input-node";
import type { Json } from "@/types";

type SelectorNode = Node<
  {
    value: Json;
  },
  "selector"
>;

export function SelectorNode({ id }: NodeProps<SelectorNode>) {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const connections = useNodeConnections({ id: id, handleType: "target" });
  const sourceIds = connections.map((c) => c.source);
  const sourcesData = useNodesData<InputNode>(sourceIds)[0]?.data.value;
  const keys = sourcesData ? Object.keys(sourcesData) : [];
  const { updateNodeData } = useReactFlow();

  const onClickHandler = (k: string) => {
    setSelectedKeys((prev) => {
      const newSelectedKeys = prev.includes(k) ? prev.filter((key) => key !== k) : [...prev, k];

      const selectedData = sourcesData
        ? Object.fromEntries(Object.entries(sourcesData).filter(([key]) => newSelectedKeys.includes(key)))
        : {};

      updateNodeData(id, { value: selectedData });

      return newSelectedKeys;
    });
  };

  return (
    <BaseNode className="w-32">
      <BaseNodeHeader className="border-b">
        <BaseNodeHeaderTitle>Selector</BaseNodeHeaderTitle>
      </BaseNodeHeader>

      <BaseNodeContent>
        {keys.map((k) => (
          <Button key={k} variant={selectedKeys.includes(k) ? "default" : "outline"} onClick={() => onClickHandler(k)}>
            <span className="font-mono text-sm">{k}</span>
          </Button>
        ))}
      </BaseNodeContent>

      <BaseHandle id="x" position={Position.Left} type="target" />
      <BaseHandle id="y" position={Position.Right} type="source" />
    </BaseNode>
  );
}
