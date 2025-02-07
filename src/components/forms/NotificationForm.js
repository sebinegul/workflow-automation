const NotificationForm = ({ formData, handleInputChange }) => {
  return (
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
          name="notificationName"
          value={formData.notificationName}
          onChange={handleInputChange}
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
          name="notificationMessage"
          rows="4"
          value={formData.notificationMessage}
          onChange={handleInputChange}
        ></textarea>
      </div>
    </>
  );
};

export default NotificationForm;
