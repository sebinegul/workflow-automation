// src/components/nodes/TaskNode.js
import React from "react";
import { Handle } from "reactflow";

const TaskNode = ({ data }) => {
  return (
    <div className="relative w-40 md:w-56 flex flex-col items-center">
      <Handle
        type="target"
        position="top"
        className="absolute top-0 w-3 h-3 bg-[#1d9e57] rounded-full z-20"
        style={{ top: "-0.5rem", left: "50%", transform: "translateX(-50%)" }}
      />

      {/* Node Content */}
      <div className="flex flex-col w-full h-full bg-[#a5e19d] rounded-lg p-2 md:p-4">
        <div className="font-semibold text-[#1d9e57]">{data.label}</div>
        <div>
          {data.assignee && (
            <div className="mt-2 text-sm text-[#1d9e57]">
              <b>Assignee: </b> {data.assignee}
            </div>
          )}
          {data.dueDate && (
            <div className="mt-2 text-sm text-[#1d9e77]">
              <b>Due Date: </b> {data.dueDate}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Handle */}
      <Handle
        type="source"
        position="bottom"
        className="absolute bottom-0 w-3 h-3 bg-[#1d9e57] rounded-full"
        style={{
          bottom: "-0.5rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
    </div>
  );
};

export default TaskNode;
