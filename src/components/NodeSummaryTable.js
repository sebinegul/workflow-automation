// src/components/NodeSummaryTable.js
import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';

const NodeSummaryTable = ({ nodes, setNodes }) => {
  const [editingNodeId, setEditingNodeId] = useState(null);
  const [editingNodeData, setEditingNodeData] = useState({});

  const columns = React.useMemo(
    () => [
      {
        Header: 'Label',
        accessor: 'label',
        Cell: ({ row }) => {
          const handleLabelChange = (event) => {
            setEditingNodeData((prev) => ({
              ...prev,
              [row.original.id]: {
                ...prev[row.original.id],
                label: event.target.value,
              },
            }));
          };

          return editingNodeId === row.original.id ? (
            <input
              type="text"
              value={editingNodeData[row.original.id]?.label || row.original.data.label || ''}
              onChange={handleLabelChange}
              className="border border-gray-300 rounded p-2 w-full"
            />
          ) : (
            <span className="text-gray-700">{row.original.data.label}</span>
          );
        },
      },
      {
        Header: 'Type',
        accessor: 'type',
        Cell: ({ row }) => (
          <span className="text-gray-700">{row.original.type}</span>
        ),
      },
      {
        Header: 'Assignee',
        accessor: 'assignee',
        Cell: ({ row }) => {
          const handleAssigneeChange = (event) => {
            setEditingNodeData((prev) => ({
              ...prev,
              [row.original.id]: {
                ...prev[row.original.id],
                assignee: event.target.value,
              },
            }));
          };

          return editingNodeId === row.original.id ? (
            <input
              type="text"
              value={editingNodeData[row.original.id]?.assignee || row.original.data.assignee || ''}
              onChange={handleAssigneeChange}
              className="border border-gray-300 rounded p-2 w-full"
            />
          ) : (
            <span className="text-gray-700">{row.original.data.assignee}</span>
          );
        },
      },
      {
        Header: 'Due Date',
        accessor: 'dueDate',
        Cell: ({ row }) => {
          const handleDueDateChange = (event) => {
            setEditingNodeData((prev) => ({
              ...prev,
              [row.original.id]: {
                ...prev[row.original.id],
                dueDate: event.target.value,
              },
            }));
          };

          return editingNodeId === row.original.id ? (
            <input
              type="date"
              value={editingNodeData[row.original.id]?.dueDate || row.original.data.dueDate || ''}
              onChange={handleDueDateChange}
              className="border border-gray-300 rounded p-2 w-full"
            />
          ) : (
            <span className="text-gray-700">{row.original.data.dueDate}</span>
          );
        },
      },
      {
        Header: 'Actions',
        id: 'actions',
        Cell: ({ row }) => (
          <div className="flex gap-2">
            {editingNodeId === row.original.id ? (
              <button
                onClick={() => {
                  const updatedNodes = nodes.map((node) =>
                    node.id === row.original.id
                      ? {
                          ...node,
                          data: {
                            ...node.data,
                            ...editingNodeData[row.original.id],
                          },
                        }
                      : node
                  );
                  setNodes(updatedNodes);
                  setEditingNodeId(null);
                }}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditingNodeId(row.original.id);
                  setEditingNodeData((prev) => ({
                    ...prev,
                    [row.original.id]: { ...row.original.data },
                  }));
                }}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => {
                setNodes(nodes.filter((node) => node.id !== row.original.id));
              }}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [setNodes, editingNodeId, editingNodeData, nodes]
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
          <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100">
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                className="text-left p-3 font-bold"
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className="hover:bg-gray-100">
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} className="p-3 text-left border">
                  {cell.render('Cell')}
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