// src/components/NodeConfigurationPanel.js
import React from "react";
import useNodeForm from "../hooks/useNodeForm";
import TaskForm from "./forms/TaskForm";
import ConditionForm from "./forms/ConditionForm";
import NotificationForm from "./forms/NotificationForm";

const NodeConfigurationPanel = ({
  selectedNode,
  setSelectedNode,
  setNodes,
}) => {
  const initialValues = {
    taskName: selectedNode?.data?.taskName || "",
    assignee: selectedNode?.data?.assignee || "",
    dueDate: selectedNode?.data?.dueDate || "",
    conditionName: selectedNode?.data?.conditionName || "",
    conditionValue: selectedNode?.data?.conditionValue || "",
    notificationName: selectedNode?.data?.notificationName || "",
    notificationMessage: selectedNode?.data?.notificationMessage || "",
  };

  const handleSubmit = (formData) => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode.id
            ? {
                ...node,
                data: {
                  ...node.data,
                  ...formData,
                },
              }
            : node
        )
      );
      setSelectedNode(null);
    }
  };

  const {
    formData,
    handleInputChange,
    handleSubmit: handleFormSubmit,
  } = useNodeForm(initialValues, handleSubmit);

  return (
    selectedNode && (
      <div className="fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg p-4 z-20 overflow-y-auto md:w-1/4">
        <h2 className="text-2xl font-bold mb-4">
          {selectedNode.data.label} Configuration
        </h2>
        <form onSubmit={handleFormSubmit}>
          {selectedNode.type === "task" && (
            <TaskForm
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}
          {selectedNode.type === "condition" && (
            <ConditionForm
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}
          {selectedNode.type === "notification" && (
            <NotificationForm
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            type="submit"
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-4"
            type="button"
            onClick={() => setSelectedNode(null)}
          >
            Cancel
          </button>
        </form>
      </div>
    )
  );
};

export default NodeConfigurationPanel;
