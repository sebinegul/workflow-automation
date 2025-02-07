// src/components/SummaryTable.js
import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import NodeSummaryTable from "./NodeSummaryTable";

const SummaryTable = ({
  nodes,
  setNodes,
  isSummaryTableOpen,
  setIsSummaryTableOpen,
}) => {
  return (
    isSummaryTableOpen && (
      <div className="absolute top-20 right-20 bg-white shadow-lg p-4 z-20 rounded-lg md:w-1/2">
        <button
          onClick={() => setIsSummaryTableOpen(false)}
          className="absolute top-2 right-2 p-2 bg-red-500 text-[#c7f7cd] rounded-full hover:bg-red-600"
        >
          <RiCloseCircleLine />
        </button>
        <NodeSummaryTable nodes={nodes} setNodes={setNodes} />
      </div>
    )
  );
};

export default SummaryTable;
