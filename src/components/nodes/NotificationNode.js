import { Handle } from "reactflow";

const NotificationNode = ({ data }) => {
  return (
    <div className="relative w-40 md:w-56 flex flex-col items-center">
      <Handle
        type="target"
        position="top"
        className="absolute top-0 w-3 h-3 bg-[#f9650f] rounded-full z-20"
        style={{ top: "-0.5rem", left: "50%", transform: "translateX(-50%)" }}
      />

      {/* Node Content */}
      <div className="flex flex-col w-full h-full bg-[#f2e6d0] rounded-lg p-2 md:p-4">
        <div className="font-semibold text-[#f9650f]  p-2">{data.label}</div>
        <div className=" p-2">
          {data.notificationMessage && (
            <div className="mt-2 text-sm text-[#f9650f] ">
              <b>Message: </b> {data.notificationMessage}
            </div>
          )}
          {data.dueDate && (
            <div className="mt-2 text-sm text-[#f9650f]">
              <b>Due Date: </b> {data.dueDate}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Handle */}
      <Handle
        type="source"
        position="bottom"
        className="absolute bottom-0 w-3 h-3  bg-[#f9650f] rounded-full"
        style={{
          bottom: "-0.5rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
    </div>
  );
};

export default NotificationNode;
