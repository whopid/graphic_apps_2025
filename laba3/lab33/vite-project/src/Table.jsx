import React, { useState } from 'react';
import { Table } from 'react-bootstrap';

const SortableTable = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });

  if (!data || data.length === 0) {
    return <p className="text-muted">Нет данных для отображения</p>;
  }

  const columns = Object.keys(data[0]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    const sortableData = [...data];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  return (
    <Table striped bordered hover responsive className="mt-3">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column}
              onClick={() => handleSort(column)}
              style={{ cursor: 'pointer' }}
              className="user-select-none"
            >
              {column}
              {sortConfig.key === column && (
                <span className="ms-1">
                  {sortConfig.direction === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={`${index}-${column}`}>{item[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SortableTable;