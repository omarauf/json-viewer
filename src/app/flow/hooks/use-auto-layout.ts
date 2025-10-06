import { type Edge, type Node, useReactFlow } from "@xyflow/react";
import { useLayoutEffect, useRef } from "react";
import { getLayoutElements } from "@/utils/layout";

export function useAutoLayout(nodes: Node[], edges: Edge[]) {
  const run = useRef(false);
  const { fitView, setNodes, setEdges } = useReactFlow();

  useLayoutEffect(() => {
    if (run.current) return;
    if (nodes.length > 0) {
      // Small delay to ensure React Flow is properly initialized
      const timer = setTimeout(() => {
        const aligned = getLayoutElements(nodes, edges, { direction: "LR" });
        setNodes([...aligned.nodes]);
        setEdges([...aligned.edges]);
        fitView();
        run.current = true;
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [nodes, edges, fitView, setEdges, setNodes]);

  return null;
}
