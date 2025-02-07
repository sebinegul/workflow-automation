const useExportWorkflow = () => {
  const exportWorkflow = (nodes, edges) => {
    const workflowData = { nodes, edges };
    const json = JSON.stringify(workflowData);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "workflow.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return exportWorkflow;
};

export default useExportWorkflow;
