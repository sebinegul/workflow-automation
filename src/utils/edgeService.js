// src/utils/edgeService.js
import { addEdge } from "reactflow";

export const onConnect = (setEdges) => (params) => {
  setEdges((eds) => addEdge(params, eds));
};