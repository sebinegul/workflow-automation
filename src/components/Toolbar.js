// src/components/Toolbar.js
import React from "react";
import { RiEyeLine } from "react-icons/ri";

const Toolbar = ({
  handleUndo,
  handleRedo,
  handleClearAll,
  toggleSummaryTable,
}) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={toggleSummaryTable}
        className="bg-[#2a764c] text-[#c7f7cd] px-4 py-2 rounded hover:bg-[#1d5235] flex items-center justify-center gap-2"
      >
        <RiEyeLine />
        View Table
      </button>
      <button
        onClick={handleUndo}
        className="bg-[#942d81] text-[#ddd1de] px-4 py-2 rounded hover:bg-[#6e2160]"
      >
        Undo
      </button>
      <button
        onClick={handleRedo}
        className="bg-[#ddd1de] text-[#942d81] px-4 py-2 rounded hover:bg-[#ede0ee]"
      >
        Redo
      </button>
      <button
        onClick={handleClearAll}
        className="bg-[#f12027] text-[#d9e3e2] px-4 py-2 rounded hover:bg-red-600"
      >
        Clear All
      </button>
    </div>
  );
};

export default Toolbar;
