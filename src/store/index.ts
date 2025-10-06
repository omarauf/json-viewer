import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
  type ReactFlowInstance,
} from "@xyflow/react";
import { createRef, type MutableRefObject, type RefObject } from "react";
import { create, type StateCreator } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { getDefaultValue } from "@/app/constant";
import type { AppEdge, AppNode, AppNodeType } from "@/app/flow/types";
import { nodeList } from "@/components/nodes";

const { defaultJson, initialEdges, initialNodes } = getDefaultValue();

export type AppStore = {
  // JSON
  value: object;
  setValue: (value: object) => void;

  // Flow
  flowInstance?: ReactFlowInstance<AppNode, AppEdge>;
  flowRef: RefObject<HTMLDivElement | null>;
  setRef(ref: HTMLDivElement | null): void;
  setFlowInstance(instance: ReactFlowInstance<AppNode, AppEdge>): void;
  nodes: AppNode[];
  edges: AppEdge[];
  onNodesChange: OnNodesChange<AppNode>;
  onEdgesChange: OnEdgesChange<AppEdge>;
  onConnect: OnConnect;
  setNodes: (nodes: AppNode[]) => void;
  setEdges: (edges: AppEdge[]) => void;
  getSourceNodes: (node: string) => AppNode[];
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
};

const appStore: StateCreator<AppStore> = (set, get) => ({
  // JSON
  value: defaultJson,
  setValue: (value) => {
    console.log(get().nodes);
    set({
      value,
      nodes: get().nodes.map((node) => {
        if (node.type === "inputJson") {
          return { ...node, data: { ...node.data, value: value as Record<string, object> } };
        }

        return node;
      }),
    });
  },

  // Flow
  flowInstance: undefined,
  flowRef: createRef<HTMLDivElement>(),
  nodes: initialNodes,
  edges: initialEdges,
  onNodesChange: (changes) => set({ nodes: applyNodeChanges(changes, get().nodes) }),
  onEdgesChange: (changes) => set({ edges: applyEdgeChanges(changes, get().edges) }),
  onConnect: (connection) => set({ edges: addEdge(connection, get().edges) }),
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  getSourceNodes: (node: string) => {
    const edges = get().edges.filter((e) => e.target === node);
    const nodes = get().nodes.filter((n) => edges.map((e) => e.source).includes(n.id));
    return nodes;
  },

  setFlowInstance: (instance) => {
    set({ flowInstance: instance });
  },

  setRef: (elementRef) => {
    if (!elementRef) {
      return;
    }
    const newRef = createRef() as MutableRefObject<HTMLDivElement>;
    newRef.current = elementRef;
    set({ flowRef: newRef });
  },

  // Dreg & Drop
  onDrop: (event) => {
    const { nodes, flowRef, flowInstance } = get();
    event.preventDefault();
    if (flowRef === undefined || flowRef.current === null || flowInstance === undefined) return;

    const target = event.target as HTMLElement;

    if (target.className !== "react-flow__pane draggable") return; // mean it drop outside the flow or on one of the panel

    const type = event.dataTransfer.getData("application/reactflow") as AppNodeType;

    // check if the dropped element is valid
    if (typeof type === "undefined" || !type) {
      return;
    }

    const position = flowInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const node = nodeList.find((n) => n.type === type);

    if (!node) {
      throw new Error(`Node type ${type} is not defined`);
    }

    // @ts-expect-error
    const newNode: AppNode = {
      id: `node-${Date.now()}`,
      type,
      position,
      data: node.data,
    };

    set({ nodes: [...nodes, newNode] });
  },

  onDragOver: (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  },
});

// export const useStore = create<AppStore>()(subscribeWithSelector(persist(appStore, { name: "json-viewer" })));
export const useStore = create<AppStore>()(subscribeWithSelector(appStore));
