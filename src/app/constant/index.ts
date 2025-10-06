import { jsonToGraph } from "@/utils/json";

export function getDefaultValue() {
  // const defaultJson = {
  //   glossary: {
  //     title: "example glossary",
  //     GlossDiv: {
  //       title: "S",
  //       GlossList: {
  //         GlossEntry: {
  //           ID: "SGML",
  //           SortAs: "SGML",
  //           GlossTerm: "Standard Generalized Markup Language",
  //           Acronym: "SGML",
  //           Abbrev: "ISO 8879:1986",
  //           GlossDef: {
  //             para: "A meta-markup language, used to create markup languages such as DocBook.",
  //             GlossSeeAlso: ["GML", "XML"],
  //           },
  //           GlossSee: "markup",
  //         },
  //       },
  //     },
  //   },
  // };

  // const initialNodes: AppNode[] = [
  //   { id: "n1", position: { x: -500, y: 0 }, data: { value: defaultJson }, type: "inputJson" },
  //   { id: "n1", position: { x: -500, y: 0 },  type: "keyValue", data: { value: defaultJson } },
  //   // { id: "n2", position: { x: 0, y: 0 }, data: { label: "Node 1" }, type: "basic" },
  //   { id: "n2", position: { x: 0, y: 100 }, data: { value: 2 }, type: "selector" },
  //   { id: "a", type: "num", data: { value: 0 }, position: { x: 0, y: 0 } },
  //   { id: "b", type: "num", data: { value: 0 }, position: { x: 0, y: 200 } },
  //   { id: "c", type: "sum", data: { value: 0 }, position: { x: 300, y: 100 } },
  //   { id: "d", type: "num", data: { value: 0 }, position: { x: 0, y: 400 } },
  //   { id: "e", type: "sum", data: { value: 0 }, position: { x: 600, y: 400 } },
  // ];

  // const initialEdges: AppEdge[] = [
  //   {
  //     id: "a->c",
  //     type: "data",
  //     data: { key: "value" },
  //     source: "a",
  //     target: "c",
  //     targetHandle: "x",
  //   },
  //   {
  //     id: "b->c",
  //     type: "data",
  //     data: { key: "value" },
  //     source: "b",
  //     target: "c",
  //     targetHandle: "y",
  //   },
  //   {
  //     id: "c->e",
  //     type: "data",
  //     data: { key: "value" },
  //     source: "c",
  //     target: "e",
  //     targetHandle: "x",
  //   },
  //   {
  //     id: "d->e",
  //     type: "data",
  //     data: { key: "value" },
  //     source: "d",
  //     target: "e",
  //     targetHandle: "y",
  //   },
  // ];

  const defaultJson = {
    name: "Apple",
    color: "#FF0000",
    details: {
      type: "Pome",
      season: "Fall",
    },
    names: ["ahmed", "samer"],
    nutrients: {
      calories: 52,
      fiber: "2.4g",
      vitaminC: "4.6mg",
      test: {
        name: "Apple",
      },
    },
  };

  const { nodes: initialNodes, edges: initialEdges } = jsonToGraph(defaultJson);

  return {
    defaultJson,
    initialNodes: [
      ...initialNodes,
      {
        id: "node-1757625122670",
        type: "inputJson",
        position: {
          x: 0,
          y: 287,
        },
        data: {
          value: {},
        },
        measured: {
          width: 320,
          height: 543,
        },
        selected: false,
        dragging: false,
        targetPosition: "left",
        sourcePosition: "right",
      },
      {
        id: "node-1757625124946",
        type: "selector",
        position: {
          x: 386,
          y: 491.5,
        },
        data: {
          value: 2,
        },
        measured: {
          width: 128,
          height: 134,
        },
        selected: true,
        dragging: false,
        targetPosition: "left",
        sourcePosition: "right",
      },
    ],
    initialEdges: [
      ...initialEdges,
      {
        source: "node-1757625122670",
        sourceHandle: "inputJson-out",
        target: "node-1757625124946",
        targetHandle: "x",
        id: "xy-edge__node-1757625122670inputJson-out-node-1757625124946x",
      },
    ],
  };
}
