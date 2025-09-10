import { memo, useCallback } from "react";
import type { PanelPosition } from "@xyflow/react";
import { Panel, useEdges, useNodes, useReactFlow } from "@xyflow/react";
import { getLayoutElements } from "@/utils/layout";
import { Button } from "@/components/ui/button";

type Props = {
  position: PanelPosition;
};

function LayoutButtons({ position }: Props) {
  const nodes = useNodes()
  const edges = useEdges()
  const { fitView, setEdges, setNodes } = useReactFlow();

  const onLayout = useCallback(
    (direction: "TB" | "LR") => {
      console.log(nodes);
      const layouted = getLayoutElements(nodes, edges, { direction });

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

      fitView();
    },
    [nodes, edges],
  );


  return (
    <Panel position={position}>
      <div className='flex gap-4'>
        <Button variant="outline" type="button" onClick={() => onLayout("TB")}>
          vertical layout
        </Button>
        <Button variant="outline" type="button" onClick={() => onLayout("LR")}>
          horizontal layout
        </Button>
        x
      </div>
    </Panel>
  );
}

export const LayoutButtonsMemo = memo(LayoutButtons);
