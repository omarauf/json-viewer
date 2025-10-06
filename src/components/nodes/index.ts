import { Key } from "lucide-react";
import type { AppNodeNav } from "@/app/flow/types";
import { BasicNode } from "./basic-node";
import { InputNode } from "./input-node";
import { KeyValueNode } from "./key-value-node";
import { NumNode } from "./num-node";
import { SelectorNode } from "./selector-node";
import { SumNode } from "./sum-node";
import { ViewerNode } from "./viewer-node";

export const nodeTypes = {
  inputJson: InputNode,
  basic: BasicNode,
  num: NumNode,
  sum: SumNode,
  selector: SelectorNode,
  keyValue: KeyValueNode,
  viewer: ViewerNode,
};

export const nodeList: AppNodeNav[] = [
  {
    type: "selector",
    icon: Key,
    title: "Selector",
    color: "#256D7B",
    data: {
      value: 2,
    },
    // behavior: "output",
  },
  {
    type: "inputJson",
    icon: Key,
    title: "Input JSON",
    color: "#256D7B",
    data: { value: 2 },
  },
  {
    type: "keyValue",
    icon: Key,
    title: "Key Value",
    color: "#256D7B",
    data: { value: {} },
  },
  {
    type: "viewer",
    icon: Key,
    title: "Viewer",
    color: "#256D7B",
    data: { value: {} },
  },
];
