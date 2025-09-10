import type { AppEdge, AppNode } from "@/app/flow/type";
import Dagre from "@dagrejs/dagre";

import { Position } from "@xyflow/react";

const dagreGraph = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

export const getLayoutElements = (
  nodes: AppNode[],
  edges: AppEdge[],
  options: { direction: "TB" | "LR" }
) => {
  const isHorizontal = options.direction === "LR";
  dagreGraph.setGraph({ rankdir: options.direction });

  edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: node.measured?.width, height: node.measured?.height });
  });

  Dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    const newNode = {
      ...node,
      targetPosition: isHorizontal ? Position.Left : Position.Top,
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,

      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      position: {
        x: nodeWithPosition.x - nodeWithPosition.width / 2,
        y: nodeWithPosition.y - nodeWithPosition.height / 2,
      },
    };

    return newNode;
  });

  return { nodes: newNodes, edges };
};
