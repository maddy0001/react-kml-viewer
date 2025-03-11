import React from "react";

const SummaryTable = ({ summaryData }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-700">KML Summary</h2>
      <table className="w-full mt-2 border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Element Type</th>
            <th className="border p-2">Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(summaryData).map(([type, count]) => (
            <tr key={type} className="hover:bg-gray-100">
              <td className="border p-2">{type}</td>
              <td className="border p-2">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SummaryTable;
