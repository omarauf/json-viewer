import type { Edge, NodeProps } from "@xyflow/react";
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
export type AppEdge = Edge;
