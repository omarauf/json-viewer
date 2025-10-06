import type { PanelPosition } from "@xyflow/react";
import { Panel } from "@xyflow/react";
import { memo } from "react";
import { nodeList } from "@/components/nodes";
import { cn } from "@/lib/utils";
import type { AppNodeNav } from "../types";

function Sidebar({ position }: { position: PanelPosition }) {
  return (
    <Panel position={position} style={{ bottom: 0 }}>
      <div className="overflow-hidden p-3  flex flex-col gap-2 border-r border rounded-md shadow-sm bg-background border-border">
        {nodeList.map((node) => (
          <Pill key={node.type} {...node} />
        ))}
      </div>
    </Panel>
  );
}

function Pill({
  disabled,
  icon: Icon,
  type,
}: AppNodeNav & {
  disabled?: boolean;
}) {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable={!disabled}
      onDragStart={onDragStart}
      className={cn(
        "flex items-center justify-center gap-2 rounded-md border transition-colors cursor-move",
        disabled
          ? "border-gray-300 bg-gray-100 text-gray-400"
          : "border-gray-300 bg-gray-50 text-gray-900 hover:border-primary-500 active:bg-primary-100",
      )}
    >
      <Icon />
      <span className="text-sm font-medium">{type}</span>
    </div>
  );
}

export const SidebarMemo = memo(Sidebar);
