import type { Edge, NodeProps } from "@xyflow/react";
import type { LucideProps } from "lucide-react";
import type { nodeTypes } from "@/components/nodes";

// export type AppNode = InputNode | BasicNode | NumNode | SumNode | SelectorNode | KeyValueNode;
// export type AppNodeData = AppNode["data"];
// export type AppEdge = Edge;

// infer the prop types of each node component
type NodeComponents = typeof nodeTypes;
type ExtractNode<T> = T extends (props: NodeProps<infer N>) => unknown ? N : never;

// AppNode is a union of all inferred node types
export type AppNode = ExtractNode<NodeComponents[keyof NodeComponents]>;

// useful derived types
export type AppNodeData = AppNode["data"];
export type AppNodeDataByType<T extends AppNode["type"]> = Extract<AppNode, { type: T }>["data"];
export type AppNodeType = AppNode["type"];
export type AppEdge = Edge;

export type AppNodeNav = {
  [T in AppNodeType]: {
    type: T;
    // data: AppNodeDataByType<T>;
    data: AppNodeData;
    icon: React.ComponentType<LucideProps>;
    title: string;
    color: string;
  };
}[AppNodeType];
