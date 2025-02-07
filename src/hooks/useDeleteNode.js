export const useDeleteNode = () => {
  const deleteNode = (nodeId, setNodes, setEdges) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId)); // Remove the node
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
  };

  return { deleteNode };
};
