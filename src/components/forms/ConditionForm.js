const ConditionForm = ({ formData, handleInputChange }) => {
  return (
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
          name="conditionName"
          value={formData.conditionName}
          onChange={handleInputChange}
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
          name="conditionValue"
          value={formData.conditionValue}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
};

export default ConditionForm;
