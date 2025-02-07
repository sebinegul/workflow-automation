import { useState, useCallback } from "react";

const useNodeForm = (initialValues, onSubmit) => {
  const [formData, setFormData] = useState(initialValues);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    onSubmit(formData);
    setFormData(initialValues);
  }, [formData, initialValues, onSubmit]);

  return { formData, handleInputChange, handleSubmit };
};

export default useNodeForm;
