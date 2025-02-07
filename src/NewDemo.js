import React, { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import "tailwindcss/tailwind.css";
import { MiniMap, Controls, Background } from "reactflow";

import { addNode, deleteNode, deleteEdge } from "./utils/nodeService";
import DeleteButtons from "./components/DeleteButtons";
import NodeConfigurationPanel from "./components/NodeConfigurationPanel";
import NodeButtons from "./components/NodeButtons";
import TaskNode from "./components/nodes/TaskNode";
import ConditionNode from "./components/nodes/ConditionNode";
import NotificationNode from "./components/nodes/NotificationNode";
import NodeSummaryTable from "./components/NodeSummaryTable";
import useUndoable from "use-undoable";
import { RiCloseCircleLine, RiEyeLine } from "react-icons/ri";

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true },
];
const initialNodes = [
  {
    id: "1",
    type: "task",
    position: { x: 650, y: 200 },
    data: { label: "Task 1" },
  },
  {
    id: "2",
    type: "condition",
    position: { x: 650, y: 350 },
    data: { label: "Condition 1" },
  },
  {
    id: "3",
    type: "notification",
    position: { x: 650, y: 500 },
    data: { label: "Notification 1" },
  },
];

const NewDemo = () => {
  const [nodes, setNodes, { undo: undoNodes, redo: redoNodes }] =
    useUndoable(initialNodes);
  const [edges, setEdges, { undo: undoEdges, redo: redoEdges }] =
    useUndoable(initialEdges);
  const [nodeIdCounter, setNodeIdCounter] = useState(4);
  const [taskCounter, setTaskCounter] = useState(2);
  const [conditionCounter, setConditionCounter] = useState(2);
  const [notificationCounter, setNotificationCounter] = useState(2);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSummaryTableOpen, setIsSummaryTableOpen] = useState(false);

  const handleUndo = useCallback(() => {
    undoNodes();
    undoEdges();
  }, [undoNodes, undoEdges]);

  const handleRedo = useCallback(() => {
    redoNodes();
    redoEdges();
  }, [redoNodes, redoEdges]);

  const handleClearAll = useCallback(() => {
    setNodes([]);
    setEdges([]);
  }, [setNodes, setEdges]);

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  const nodeTypes = useMemo(
    () => ({
      task: TaskNode,
      condition: ConditionNode,
      notification: NotificationNode,
    }),
    []
  );

  const toggleSummaryTable = () => {
    setIsSummaryTableOpen((prev) => !prev);
  };

  return (
    <div className="w-full h-screen relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={(changes) =>
          setNodes((nds) => applyNodeChanges(changes, nds))
        }
        onEdgesChange={(changes) =>
          setEdges((eds) => applyEdgeChanges(changes, eds))
        }
        onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
        onNodeClick={onNodeClick}
        className="absolute inset-0"
        nodeTypes={nodeTypes}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      <div className="flex items-center justify-between absolute top-4 z-10 gap-40 mx-8 md:gap-20 md:mx-4">
        <NodeButtons
          addNode={(type) =>
            addNode(
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
            )
          }
        />

        <NodeConfigurationPanel
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
          setNodes={setNodes}
        />

        <div className="flex items-center justify-center gap-4">
          <DeleteButtons
            nodes={nodes}
            edges={edges}
            deleteNode={(nodeId) => deleteNode(nodeId, setNodes, setEdges)}
            deleteEdge={(edgeId) => deleteEdge(edgeId, setEdges)}
          />
          <button
            onClick={toggleSummaryTable}
            className="bg-[#2a764c] text-[#c7f7cd] px-4 py-2 rounded hover:bg-[#1d5235]  flex items-center justify-center gap-2"
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

        {isSummaryTableOpen && (
          <div className="absolute top-20 right-20 bg-white shadow-lg p-4 z-20 rounded-lg md:w-1/2">
            <button
              onClick={toggleSummaryTable}
              className="absolute top-2 right-2 p-2 bg-red-500 text-[#c7f7cd] rounded-full hover:bg-red-600"
            >
              <RiCloseCircleLine />
            </button>
            <NodeSummaryTable nodes={nodes} setNodes={setNodes} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NewDemo;
