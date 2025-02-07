export const useDeleteEdge = () => {
  const deleteEdge = (edgeId, setEdges) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== edgeId)); // Remove the edge
  };

  return { deleteEdge };
};
