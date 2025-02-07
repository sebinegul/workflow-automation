import { useState, useCallback, useEffect } from "react";

const useNodeForm = (initialValues, onSubmit) => {
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    setFormData(initialValues);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    onSubmit(formData);

    // setFormData(initialValues);
  }, [formData, onSubmit]);

  return { formData, handleInputChange, handleSubmit };
};

export default useNodeForm;
