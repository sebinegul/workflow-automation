// src/components/DeleteButtons.js
import React, { useState } from "react";
import { RiDeleteBin4Line } from "react-icons/ri";

const DeleteButtons = ({ nodes, edges, deleteNode, deleteEdge }) => {
  const [isNodeDropdownOpen, setIsNodeDropdownOpen] = useState(false);
  const [isEdgeDropdownOpen, setIsEdgeDropdownOpen] = useState(false);

  return (
    <div className="flex items-center justify-center gap-4">
      {/* Delete Node Button and Dropdown */}
      <div className="relative z-10">
        <button
          className="bg-[#45292b] text-[#f52727] px-4 py-2 rounded hover:bg-[#2e1b1c]  flex items-center justify-center gap-2"
          onClick={() => setIsNodeDropdownOpen(!isNodeDropdownOpen)}
        >
          <RiDeleteBin4Line /> Delete Node
        </button>
        {isNodeDropdownOpen && (
          <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded shadow-lg w-52">
            {nodes.map((node) => (
              <button
                key={`delete-node-${node.id}`}
                onClick={() => {
                  deleteNode(node.id);
                  setIsNodeDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 "
              >
                <div className="flex items-center justify-center">
                  <RiDeleteBin4Line />
                  <div> Delete {node.data.label}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Delete Edge Button and Dropdown */}
      <div className="relative z-10 ">
        <button
          className="bg-[#45292b] text-[#f52727] px-4 py-2 rounded hover:bg-[#2e1b1c]  flex items-center justify-center gap-2"
          onClick={() => setIsEdgeDropdownOpen(!isEdgeDropdownOpen)}
        >
          <RiDeleteBin4Line /> Delete Edge
        </button>

        {isEdgeDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg">
            {edges.map((edge) => (
              <button
                key={`delete-edge-${edge.id}`}
                onClick={() => {
                  deleteEdge(edge.id);
                  setIsEdgeDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                <RiDeleteBin4Line /> Delete {edge.id}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteButtons;
