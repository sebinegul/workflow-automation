import { Handle } from "reactflow";

const ConditionNode = ({ data }) => {
  console.log("data", data);
  return (
    <div className="relative w-40 md:w-56 flex flex-col items-center">
      <Handle
        type="target"
        position="top"
        className="absolute top-0 w-3 h-3 bg-[#e022b0] rounded-full z-20"
        style={{ top: "-0.5rem", left: "50%", transform: "translateX(-50%)" }}
      />

      {/* Node Content */}
      <div className="flex flex-col w-full h-full bg-[#efd9ea] rounded-lg p-2 md:p-4">
        <div className="font-semibold text-[#e022b0]  p-2">{data.label}</div>
        <div className=" p-2">
          {data.conditionValue && (
            <div className="mt-2 text-sm text-[#e022b0] ">
              <b>Condition: </b> {data.conditionValue}
            </div>
          )}
          {data.dueDate && (
            <div className="mt-2 text-sm text-[#e022b0]">
              <b>Due Date: </b> {data.dueDate}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Handle */}
      <Handle
        type="source"
        position="bottom"
        className="absolute bottom-0 w-3 h-3  bg-[#e022b0] rounded-full"
        style={{
          bottom: "-0.5rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
    </div>
  );
};

export default ConditionNode;
