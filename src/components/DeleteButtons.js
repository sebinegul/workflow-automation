// src/components/DeleteButtons.js
import React, { useState } from "react";
import { RiDeleteBin4Line } from "react-icons/ri";

const DeleteDropdown = ({ items, deleteItem, setIsOpen, isOpen, label }) => {
  return (
    <div className="relative z-10">
      <button
        className="bg-[#45292b] text-[#f52727] px-4 py-2 rounded hover:bg-[#2e1b1c] flex items-center justify-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <RiDeleteBin4Line /> {label}
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded shadow-lg w-52">
          {items.map((item) => (
            <button
              key={`delete-${item.id}`}
              onClick={() => {
                deleteItem(item.id);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              <div className="flex items-center justify-center">
                <RiDeleteBin4Line />
                <div> Delete {item.data?.label || item.id}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const DeleteButtons = ({ nodes, edges, deleteNode, deleteEdge }) => {
  const [isNodeDropdownOpen, setIsNodeDropdownOpen] = useState(false);
  const [isEdgeDropdownOpen, setIsEdgeDropdownOpen] = useState(false);

  return (
    <div className="flex items-center justify-center gap-4">
      <DeleteDropdown
        items={nodes}
        deleteItem={deleteNode}
        setIsOpen={setIsNodeDropdownOpen}
        isOpen={isNodeDropdownOpen}
        label="Delete Node"
      />
      <DeleteDropdown
        items={edges}
        deleteItem={deleteEdge}
        setIsOpen={setIsEdgeDropdownOpen}
        isOpen={isEdgeDropdownOpen}
        label="Delete Edge"
      />
    </div>
  );
};

export default DeleteButtons;
