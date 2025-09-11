import type { PanelPosition } from "@xyflow/react";
import { Panel, useEdges, useNodes, useReactFlow } from "@xyflow/react";
import { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { getLayoutElements } from "@/utils/layout";
import { useAutoLayout } from "../hooks/use-aut-layout";

type Props = {
  position: PanelPosition;
};

function LayoutButtons({ position }: Props) {
  const nodes = useNodes();
  const edges = useEdges();
  const { fitView, setEdges, setNodes } = useReactFlow();
  useAutoLayout(nodes, edges);

  const onLayout = useCallback(
    (direction: "TB" | "LR") => {
      console.log(nodes);
      const aligned = getLayoutElements(nodes, edges, { direction });

      setNodes([...aligned.nodes]);
      setEdges([...aligned.edges]);

      fitView();
    },
    [nodes, edges, fitView, setEdges, setNodes],
  );

  return (
    <Panel position={position}>
      <div className="flex gap-4">
        {/* <Button variant="outline" type="button" onClick={() => onLayout("TB")}>
          vertical layout
        </Button> */}
        <Button variant="default" type="button" onClick={() => onLayout("LR")}>
          horizontal layout
        </Button>
      </div>
    </Panel>
  );
}

export const LayoutButtonsMemo = memo(LayoutButtons);
