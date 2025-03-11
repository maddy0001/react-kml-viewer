import React from 'react';

const DetailedTable = ({ detailedData }) => (
  <table border="1" cellPadding="5">
    <thead>
      <tr>
        <th>Geometry Type</th>
        <th>Total Length (km)</th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(detailedData).map(([type, length]) => (
        <tr key={type}>
          <td>{type}</td>
          <td>{length.toFixed(2)}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default DetailedTable;
