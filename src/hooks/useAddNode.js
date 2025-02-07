import { useState } from "react";

export const useAddNode = () => {
  const [nodeIdCounter, setNodeIdCounter] = useState(4);
  const [taskCounter, setTaskCounter] = useState(2);
  const [conditionCounter, setConditionCounter] = useState(2);
  const [notificationCounter, setNotificationCounter] = useState(2);

  const addNode = (
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

  return {
    addNode,
    nodeIdCounter,
    setNodeIdCounter,
    taskCounter,
    setTaskCounter,
    conditionCounter,
    setConditionCounter,
    notificationCounter,
    setNotificationCounter,
  };
};
