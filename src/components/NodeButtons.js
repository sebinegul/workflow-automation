const nodeTypes = [
  { type: "task", label: "Add Task" },
  { type: "condition", label: "Add Condition" },
  { type: "notification", label: "Add Notification" },
];

const NodeButtons = ({ addNode }) => {
  return (
    <div className="z-10">
      {nodeTypes.map((nodeType) => (
        <button
          key={nodeType.type}
          onClick={() => addNode(nodeType.type)}
          className="bg-[#164577] text-[#25c1c1] px-4 py-2 rounded mr-4"
        >
          {nodeType.label}
        </button>
      ))}
    </div>
  );
};

export default NodeButtons;
