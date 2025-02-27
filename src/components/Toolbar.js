// src/components/Toolbar.js
import React from "react";
import {
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
  RiDownloadLine,
  RiEyeLine,
  RiRefreshLine,
  RiUploadLine,
} from "react-icons/ri";
import useExportWorkflow from "../hooks/useExportWorkflow";
import useImportWorkflow from "../hooks/useImportWorkflow";

const Toolbar = ({
  handleUndo,
  handleRedo,
  handleClearAll,
  toggleSummaryTable,
  nodes,
  edges,
  setNodes,
  setEdges,
}) => {
  const exportWorkflow = useExportWorkflow();
  const importWorkflow = useImportWorkflow();

  return (
    <div className="flex items-center justify-center gap-4 mr-10">
      <div className="flex items-start flex-col gap-6 absolute top-14 right-10">
        <button
          onClick={toggleSummaryTable}
          className="bg-[#2a764c] text-[#c7f7cd] px-4 py-2 rounded hover:bg-[#1d5235] flex items-center justify-center gap-2 sm:gap-4"
        >
          <RiEyeLine className="sm:text-lg" />
          <span className="hidden sm:inline">Table</span>
        </button>
        <button
          onClick={handleUndo}
          className="bg-[#942d81] text-[#ddd1de] px-4 py-2 rounded hover:bg-[#6e2160]"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <RiArrowGoBackLine className="sm:text-lg" />
            <span className="hidden sm:inline">Undo</span>
          </div>
        </button>
        <button
          onClick={handleRedo}
          className="bg-[#ddd1de] text-[#942d81] px-4 py-2 rounded hover:bg-[#ede0ee]"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <RiArrowGoForwardLine className="sm:text-lg" />
            <span className="hidden sm:inline">Redo</span>
          </div>
        </button>
        <button
          onClick={handleClearAll}
          className="bg-[#f12027] text-[#d9e3e2] px-4 py-2 rounded hover:bg-red-600"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <RiRefreshLine className="sm:text-lg" />
            <span className="hidden sm:inline">Clear</span>
          </div>
        </button>
        <button
          onClick={() => exportWorkflow(nodes, edges)}
          className="bg-[#4a117d] text-[#fca5ef] px-4 py-2 rounded hover:bg-[#347df1]"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <RiUploadLine className="sm:text-lg" />
            <span className="hidden sm:inline">Export</span>
          </div>
        </button>
        <button
          onClick={() => importWorkflow(setNodes, setEdges)}
          className="bg-[#fca5ef] text-[#4a117d] px-4 py-2 rounded hover:bg-[#347df1]"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <RiDownloadLine className="sm:text-lg" />
            <span className="hidden sm:inline">Import</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
