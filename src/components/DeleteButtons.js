// src/components/DeleteButtons.js
import React, { useState } from "react";
import { RiDeleteBin4Line } from "react-icons/ri";

const DeleteButtons = ({ nodes, edges, deleteNode, deleteEdge }) => {
  const [isNodeDropdownOpen, setIsNodeDropdownOpen] = useState(false);
  const [isEdgeDropdownOpen, setIsEdgeDropdownOpen] = useState(false);

  return (
    <div className="flex md:flex-row items-center justify-center gap-4 relative -right-4 -top-10 md:top-0 md:right-0">
      <div className="relative z-10">
        <button
          className="bg-[#45292b] text-[#f52727] px-2 py-1 rounded hover:bg-[#2e1b1c] flex items-center justify-center gap-2 sm:px-4 sm:py-2"
          onClick={() => setIsNodeDropdownOpen(!isNodeDropdownOpen)}
        >
          <RiDeleteBin4Line className="sm:text-lg" />
          <span className="hidden sm:inline">Delete Node</span>
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
                className="w-full text-left px-2 py-1 hover:bg-gray-100 sm:px-4 sm:py-2"
              >
                <div className="flex items-center justify-center">
                  <RiDeleteBin4Line />
                  <div className="hidden sm:inline">
                    {" "}
                    Delete {node.data?.label || node.id}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative z-10">
        <button
          className="bg-[#45292b] text-[#f52727] px-2 py-1 rounded hover:bg-[#2e1b1c] flex items-center justify-center gap-2 sm:px-4 sm:py-2"
          onClick={() => setIsEdgeDropdownOpen(!isEdgeDropdownOpen)}
        >
          <RiDeleteBin4Line className="sm:text-lg" />
          <span className="hidden sm:inline">Delete Edge</span>
        </button>
        {isEdgeDropdownOpen && (
          <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded shadow-lg w-52">
            {edges.map((edge) => (
              <button
                key={`delete-edge-${edge.id}`}
                onClick={() => {
                  deleteEdge(edge.id);
                  setIsEdgeDropdownOpen(false);
                }}
                className="w-full text-left px-2 py-1 hover:bg-gray-100 sm:px-4 sm:py-2"
              >
                <div className="flex items-center justify-center">
                  <RiDeleteBin4Line />
                  <div className="hidden sm:inline"> Delete {edge.id}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteButtons;
