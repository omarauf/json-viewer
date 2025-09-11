import type { AppEdge, AppNode } from "@/app/flow/types";

interface Result {
  nodes: AppNode[];
  edges: AppEdge[];
}

export function jsonToGraph(obj: object): Result {
  const nodes: AppNode[] = [];
  const edges: AppEdge[] = [];
  let nodeCounter = 1;

  function processObject(currentObj: object): string {
    const currentId = nodeCounter.toString();
    nodeCounter++;

    const nodeData: Record<string, any> = {};

    for (const [key, value] of Object.entries(currentObj)) {
      if (Array.isArray(value)) {
        nodeData[key] = `${value.length} items`;

        // Process array items
        value.forEach((item) => {
          if (typeof item === "object" && item !== null) {
            const childId = processObject(item);
            edges.push({
              id: `e${currentId}-${childId}`,
              source: currentId,
              target: childId,
            });
          } else {
            // For primitive array items, create a node with the value as both key and value
            const childId = nodeCounter.toString();
            nodeCounter++;
            nodes.push({ id: childId, position: { x: 0, y: 0 }, data: { value: { [item]: item } }, type: "keyValue" });
            edges.push({
              id: `e${currentId}-${childId}`,
              source: currentId,
              target: childId,
            });
          }
        });
      } else if (typeof value === "object" && value !== null) {
        const objectKeys = Object.keys(value);
        nodeData[key] = `${objectKeys.length} keys`;

        const childId = processObject(value);
        edges.push({
          id: `e${currentId}-${childId}`,
          source: currentId,
          target: childId,
        });
      } else {
        nodeData[key] = value;
      }
    }

    nodes.push({ id: currentId, position: { x: 0, y: 0 }, data: { value: nodeData }, type: "keyValue" });

    return currentId;
  }

  processObject(obj);

  return { nodes, edges };
}
