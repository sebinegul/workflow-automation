const NodeButtons = ({ addNode }) => {
  return (
    <div className="z-10">
      <button
        onClick={() => addNode("task")}
        className="bg-[#164577] text-[#25c1c1] px-4 py-2 rounded mr-4"
      >
        Add Task
      </button>
      <button
        onClick={() => addNode("condition")}
        className="bg-[#164577] text-[#25c1c1] px-4 py-2 rounded mr-4"
      >
        Add Condition
      </button>
      <button
        onClick={() => addNode("notification")}
        className="bg-[#164577] text-[#25c1c1] px-4 py-2 rounded"
      >
        Add Notification
      </button>
    </div>
  );
};

export default NodeButtons;
