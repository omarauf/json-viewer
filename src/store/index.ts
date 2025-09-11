import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
} from "@xyflow/react";
import { create, type StateCreator } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { getDefaultValue } from "@/app/constant";
import type { AppEdge, AppNode } from "@/app/flow/types";

const { defaultJson, initialEdges, initialNodes } = getDefaultValue();

export type AppStore = {
  // JSON
  value: object;
  setValue: (value: object) => void;

  // Flow
  nodes: AppNode[];
  edges: AppEdge[];
  onNodesChange: OnNodesChange<AppNode>;
  onEdgesChange: OnEdgesChange<AppEdge>;
  onConnect: OnConnect;
  setNodes: (nodes: AppNode[]) => void;
  setEdges: (edges: AppEdge[]) => void;
  getSourceNodes: (node: string) => AppNode[];
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
});

// export const useStore = create<AppStore>()(subscribeWithSelector(persist(appStore, { name: "json-viewer" })));
export const useStore = create<AppStore>()(subscribeWithSelector(appStore));
