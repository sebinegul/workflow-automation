// src/components/forms/TaskForm.js
import React from "react";

const TaskForm = ({ formData, handleInputChange }) => {
  return (
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
          name="taskName"
          value={formData.taskName}
          onChange={handleInputChange}
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
          name="assignee"
          value={formData.assignee}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="dueDate">
          Due Date
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="dueDate"
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
};

export default TaskForm;
