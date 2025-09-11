import { BasicNode } from "./basic-node";
import { InputNode } from "./input-node";
import { KeyValueNode } from "./key-value-node";
import { NumNode } from "./num-node";
import { SelectorNode } from "./selector-node";
import { SumNode } from "./sum-node";

export const nodeTypes = {
  inputJson: InputNode,
  basic: BasicNode,
  num: NumNode,
  sum: SumNode,
  selector: SelectorNode,
  keyValue: KeyValueNode,
};
