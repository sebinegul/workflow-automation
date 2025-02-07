import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import "tailwindcss/tailwind.css";

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
    position: { x: 650, y: 300 },
    data: { label: "Condition 1" },
  },
  {
    id: "3",
    type: "notification",
    position: { x: 650, y: 400 },
    data: { label: "Notification 1" },
  },
];

const Demo = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeIdCounter, setNodeIdCounter] = useState(4); // Counter for new node IDs
  const [taskCounter, setTaskCounter] = useState(2); // Counter for task nodes
  const [conditionCounter, setConditionCounter] = useState(2); // Counter for condition nodes
  const [notificationCounter, setNotificationCounter] = useState(2); // Counter for notification nodes
  const [selectedNode, setSelectedNode] = useState(null); // State for the selected node

  const { register, handleSubmit, reset } = useForm();

  // Function to handle connecting nodes
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Function to add a new node with a specific type
  const addNode = (type) => {
    let label;

    switch (type) {
      case "task":
        label = `Task ${taskCounter}`;
        setTaskCounter(taskCounter + 1);
        break;
      case "condition":
        label = `Condition ${conditionCounter}`;
        setConditionCounter(conditionCounter + 1);
        break;
      case "notification":
        label = `Notification ${notificationCounter}`;
        setNotificationCounter(notificationCounter + 1);
        break;
      default:
        label = `Node ${nodeIdCounter}`;
    }

    const newNode = {
      id: `${nodeIdCounter}`, // Use the counter to generate unique IDs
      type: type, // Set the node type
      position: { x: Math.random() * 500, y: Math.random() * 500 }, // Random position
      data: { label: label }, // Label the node with its type and counter
    };

    setNodes((nds) => nds.concat(newNode)); // Add the new node to the nodes array
    setNodeIdCounter((prev) => prev + 1); // Increment the global node counter
  };

  // Function to handle node click
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  // Function to handle form submission
  const onSubmit = (data) => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode.id
            ? { ...node, data: { ...node.data, ...data } }
            : node
        )
      );
      setSelectedNode(null);
      reset();
    }
  };

  // Function to delete a node and its associated edges
  const deleteNode = (nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId)); // Remove the node
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    ); // Remove connected edges
  };

  // Function to delete an edge by its ID
  const deleteEdge = (edgeId) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== edgeId)); // Remove the edge
  };

  return (
    <div className="w-full h-screen relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        className="absolute inset-0"
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>

      {/* Buttons and form for dynamic functionality */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => addNode("task")}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
        >
          Add Task
        </button>
        <button
          onClick={() => addNode("condition")}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
        >
          Add Condition
        </button>
        <button
          onClick={() => addNode("notification")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Notification
        </button>
      </div>

      {/* Side panel for node configuration */}
      {selectedNode && (
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white shadow-lg p-4 z-20">
          <h2 className="text-2xl font-bold mb-4">
            {selectedNode.data.label} Configuration
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {selectedNode.type === "task" && (
              <>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="taskName"
                  >
                    Task Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="taskName"
                    type="text"
                    {...register("taskName")}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="assignee"
                  >
                    Assignee
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="assignee"
                    type="text"
                    {...register("assignee")}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="dueDate"
                  >
                    Due Date
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="dueDate"
                    type="date"
                    {...register("dueDate")}
                  />
                </div>
              </>
            )}
            {selectedNode.type === "condition" && (
              <>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="conditionName"
                  >
                    Condition Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="conditionName"
                    type="text"
                    {...register("conditionName")}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="conditionValue"
                  >
                    Condition Value
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="conditionValue"
                    type="text"
                    {...register("conditionValue")}
                  />
                </div>
              </>
            )}
            {selectedNode.type === "notification" && (
              <>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="notificationName"
                  >
                    Notification Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="notificationName"
                    type="text"
                    {...register("notificationName")}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="notificationMessage"
                  >
                    Notification Message
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="notificationMessage"
                    rows="4"
                    {...register("notificationMessage")}
                  ></textarea>
                </div>
              </>
            )}
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              type="submit"
            >
              Save
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-4"
              type="button"
              onClick={() => {
                setSelectedNode(null);
                reset();
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Dynamic delete buttons for nodes */}
      <div className="absolute top-4 right-4 z-10">
        {nodes.map((node) => (
          <button
            key={`delete-node-${node.id}`}
            onClick={() => deleteNode(node.id)}
            className="bg-red-500 text-white px-4 py-2 rounded mr-4"
          >
            Delete Node {node.data.label}
          </button>
        ))}
      </div>

      {/* Dynamic delete buttons for edges */}
      <div className="absolute bottom-4 right-4 z-10">
        {edges.map((edge) => (
          <button
            key={`delete-edge-${edge.id}`}
            onClick={() => deleteEdge(edge.id)}
            className="bg-red-500 text-white px-4 py-2 rounded mr-4"
          >
            Delete Edge {edge.id}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Demo;
