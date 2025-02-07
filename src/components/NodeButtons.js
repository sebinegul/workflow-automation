import React from "react";
import { RiAddCircleLine } from "react-icons/ri";

const nodeTypes = [
  { type: "task", label: "Task" },
  { type: "condition", label: "Condition" },
  { type: "notification", label: "Notification" },
];

const NodeButtons = ({ addNode }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 z-10">
      {nodeTypes.map((nodeType) => (
        <button
          key={nodeType.type}
          onClick={() => addNode(nodeType.type)}
          className="bg-[#164577] text-[#25c1c1] px-4 py-2 rounded"
        >
          <div className="flex items-center justify-center gap-2">
            {" "}
            <RiAddCircleLine /> {nodeType.label}
          </div>
        </button>
      ))}
    </div>
  );
};

export default NodeButtons;
