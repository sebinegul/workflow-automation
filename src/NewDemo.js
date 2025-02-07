// src/components/NewDemo.js
import React, { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import "tailwindcss/tailwind.css";
import { MiniMap, Controls, Background } from "reactflow";
import useUndoable from "use-undoable";
import { addNode, deleteNode, deleteEdge } from "./utils/nodeService";
import DeleteButtons from "./components/DeleteButtons";
import NodeConfigurationPanel from "./components/NodeConfigurationPanel";
import NodeButtons from "./components/NodeButtons";
import TaskNode from "./components/nodes/TaskNode";
import ConditionNode from "./components/nodes/ConditionNode";
import NotificationNode from "./components/nodes/NotificationNode";
import Toolbar from "./components/Toolbar";
import SummaryTable from "./components/SummaryTable";

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
          <Toolbar
            handleUndo={handleUndo}
            handleRedo={handleRedo}
            handleClearAll={handleClearAll}
            toggleSummaryTable={() => setIsSummaryTableOpen((prev) => !prev)}
            isSummaryTableOpen={isSummaryTableOpen}
          />
        </div>
      </div>
      <SummaryTable
        nodes={nodes}
        setNodes={setNodes}
        isSummaryTableOpen={isSummaryTableOpen}
        setIsSummaryTableOpen={setIsSummaryTableOpen}
      />
    </div>
  );
};

export default NewDemo;
