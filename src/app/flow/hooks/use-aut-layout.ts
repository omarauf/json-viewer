import { type Edge, type Node, useReactFlow } from "@xyflow/react";
import { useLayoutEffect } from "react";
import { getLayoutElements } from "@/utils/layout";

export function useAutoLayout(nodes: Node[], edges: Edge[]) {
  const { fitView, setNodes, setEdges } = useReactFlow();

  useLayoutEffect(() => {
    if (nodes.length > 0) {
      // Small delay to ensure React Flow is properly initialized
      const timer = setTimeout(() => {
        const aligned = getLayoutElements(nodes, edges, { direction: "LR" });
        setNodes([...aligned.nodes]);
        setEdges([...aligned.edges]);
        fitView();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [nodes, edges, fitView, setNodes, setEdges]);

  return null;
}
