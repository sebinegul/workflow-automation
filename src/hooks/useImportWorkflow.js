const useImportWorkflow = () => {
  const importWorkflow = (setNodes, setEdges) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const workflowData = JSON.parse(e.target.result);
          setNodes(workflowData.nodes);
          setEdges(workflowData.edges);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return importWorkflow;
};

export default useImportWorkflow;
