import React, { useCallback, useMemo, useState, useEffect } from "react";
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import "tailwindcss/tailwind.css";
import { MiniMap, Controls, Background } from "reactflow";
import useUndoable from "use-undoable";

import DeleteButtons from "./components/DeleteButtons";
import NodeConfigurationPanel from "./components/NodeConfigurationPanel";
import NodeButtons from "./components/NodeButtons";
import TaskNode from "./components/nodes/TaskNode";
import ConditionNode from "./components/nodes/ConditionNode";
import NotificationNode from "./components/nodes/NotificationNode";
import Toolbar from "./components/Toolbar";
import SummaryTable from "./components/SummaryTable";
import { useAddNode } from "./hooks/useAddNode";
import { useDeleteNode } from "./hooks/useDeleteNode";
import { useDeleteEdge } from "./hooks/useDeleteEdge";

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
];

const initialNodes = [
  {
    id: "1",
    type: "task",
    position: { x: 380, y: 200 },
    data: { label: "Task 1" },
  },
  {
    id: "2",
    type: "condition",
    position: { x: 380, y: 350 },
    data: { label: "Condition 1" },
  },
  {
    id: "3",
    type: "notification",
    position: { x: 380, y: 500 },
    data: { label: "Notification 1" },
  },
];

const App = () => {
  const [nodes, setNodes, { undo: undoNodes, redo: redoNodes }] =
    useUndoable(initialNodes);
  const [edges, setEdges, { undo: undoEdges, redo: redoEdges }] =
    useUndoable(initialEdges);
  const {
    addNode,
    nodeIdCounter,
    setNodeIdCounter,
    taskCounter,
    setTaskCounter,
    conditionCounter,
    setConditionCounter,
    notificationCounter,
    setNotificationCounter,
  } = useAddNode();
  const { deleteNode } = useDeleteNode();
  const { deleteEdge } = useDeleteEdge();
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

  // Adjust node positions based on screen size
  useEffect(() => {
    const adjustNodePositions = () => {
      const isMobile = window.innerWidth < 768; // Adjust the breakpoint as needed
      const newNodes = nodes.map((node) => {
        if (isMobile) {
          return {
            ...node,
            position: { x: 130, y: node.position.y },
          };
        }
        return node;
      });
      setNodes(newNodes);
    };

    adjustNodePositions();
    window.addEventListener("resize", adjustNodePositions);

    return () => {
      window.removeEventListener("resize", adjustNodePositions);
    };
  }, [nodes, setNodes]);

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
      <div className="flex items-center w-full justify-between absolute top-4 z-10 mx-8 md:gap-20 md:mx-4">
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
            nodes={nodes}
            edges={edges}
            setNodes={setNodes}
            setEdges={setEdges}
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

export default App;