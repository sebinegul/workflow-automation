import React, { useEffect, useState } from "react";
import { useTable } from "react-table";

const NodeSummaryTable = ({ nodes, setNodes }) => {
  const [editingNodeId, setEditingNodeId] = useState(null);

  const columns = React.useMemo(
    () => [
      {
        Header: "Label",
        accessor: "label",
        Cell: ({ row }) => {
          const handleLabelChange = (event) => {
            const updatedNodes = nodes.map((node) =>
              node.id === row.original.id
                ? {
                    ...node,
                    data: { ...node.data, label: event.target.value },
                  }
                : node
            );
            setNodes(updatedNodes);
          };

          return editingNodeId === row.original.id ? (
            <input
              type="text"
              value={row.original.data.label || ""}
              onChange={handleLabelChange}
              className="border rounded p-2"
            />
          ) : (
            row.original.data.label
          );
        },
      },
      {
        Header: "Type",
        accessor: "type",
        Cell: ({ row }) => {
          <> {row.original.data.type}</>;
        },
      },
      {
        Header: "Assignee",
        accessor: "assignee",
        Cell: ({ row }) => {
          const handleAssigneeChange = (event) => {
            const updatedNodes = nodes.map((node) =>
              node.id === row.original.id
                ? {
                    ...node,
                    data: { ...node.data, assignee: event.target.value },
                  }
                : node
            );
            setNodes(updatedNodes);
          };

          return editingNodeId === row.original.id ? (
            <input
              type="text"
              value={row.original.data.assignee || ""}
              onChange={handleAssigneeChange}
              className="border rounded p-2"
            />
          ) : (
            row.original.data.assignee
          );
        },
      },
      {
        Header: "Due Date",
        accessor: "dueDate",
        Cell: ({ row }) => {
          const handleDueDateChange = (event) => {
            const updatedNodes = nodes.map((node) =>
              node.id === row.original.id
                ? {
                    ...node,
                    data: { ...node.data, dueDate: event.target.value },
                  }
                : node
            );
            setNodes(updatedNodes);
          };

          return editingNodeId === row.original.id ? (
            <input
              type="date"
              value={row.original.data.dueDate || ""}
              onChange={handleDueDateChange}
              className="border rounded p-2"
            />
          ) : (
            row.original.data.dueDate
          );
        },
      },
      {
        Header: "Actions",
        id: "actions",
        Cell: ({ row }) => (
          <div>
            {editingNodeId === row.original.id ? (
              <button
                onClick={() => {
                  setEditingNodeId(null);
                }}
                className="mr-2"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setEditingNodeId(row.original.id)}
                className="mr-2"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => {
                setNodes(nodes.filter((node) => node.id !== row.original.id));
              }}
            >
              Delete
            </button>
          </div>
        ),
      },
    ], // eslint-disable-next-line
    [setNodes, editingNodeId]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: nodes });

  useEffect(() => {
    // Ensure React Flow is notified of changes
    setNodes((prevNodes) => [...prevNodes]);
  }, [nodes, setNodes]);

  return (
    <table {...getTableProps()} className="w-full divide-y divide-gray-200">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                className="bg-gray-100 text-left p-3"
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} className="p-3 text-left border">
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default NodeSummaryTable;
