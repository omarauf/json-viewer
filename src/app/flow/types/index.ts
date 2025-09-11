import type { Edge } from "@xyflow/react";
import type { BasicNode } from "@/components/nodes/basic-node";
import type { InputNode } from "@/components/nodes/input-node";
import type { KeyValueNode } from "@/components/nodes/key-value-node";
import type { NumNode } from "@/components/nodes/num-node";
import type { SelectorNode } from "@/components/nodes/selector-node";
import type { SumNode } from "@/components/nodes/sum-node";

export type AppNode = InputNode | BasicNode | NumNode | SumNode | SelectorNode | KeyValueNode;
export type AppNodeData = AppNode["data"];
export type AppEdge = Edge;
