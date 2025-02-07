export const addNode = (
    type,
    setNodes,
    nodeIdCounter,
    setNodeIdCounter,
    taskCounter,
    setTaskCounter,
    conditionCounter,
    setConditionCounter,
    notificationCounter,
    setNotificationCounter
  ) => {
    let label;
  
    switch (type) {
      case "task":
        label = `Task ${taskCounter}`;
        setTaskCounter((prev) => prev + 1);
        break;
      case "condition":
        label = `Condition ${conditionCounter}`;
        setConditionCounter((prev) => prev + 1);
        break;
      case "notification":
        label = `Notification ${notificationCounter}`;
        setNotificationCounter((prev) => prev + 1);
        break;
      default:
        label = `Node ${nodeIdCounter}`;
    }
  
    const newNode = {
      id: `${nodeIdCounter}`, // Use the counter to generate unique IDs
      type: type, // Set the node type
      position: { x: Math.random() * 500, y: Math.random() * 500 }, // Random position
      data: { label: label }, // Label the node with its type and counter
    };
  
    setNodes((nds) => nds.concat(newNode)); // Add the new node to the nodes array
    setNodeIdCounter((prev) => prev + 1); // Increment the global node counter
  };
  
  export const deleteNode = (nodeId, setNodes, setEdges) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId)); // Remove the node
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    ); // Remove connected edges
  };
  
  export const deleteEdge = (edgeId, setEdges) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== edgeId)); // Remove the edge
  };