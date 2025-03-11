import React, { useState } from "react";
import * as turf from "@turf/turf";

const SummaryDetails = ({ geojsonData }) => {
  const [summary, setSummary] = useState(null);
  const [detailed, setDetailed] = useState(null);

  const generateSummary = () => {
    if (!geojsonData) return;
    
    const summaryData = {};
    geojsonData.features.forEach((feature) => {
      const type = feature.geometry.type;
      summaryData[type] = (summaryData[type] || 0) + 1;
    });

    setSummary(summaryData);
  };

  const generateDetailed = () => {
    if (!geojsonData) return;

    const detailedData = {};
    geojsonData.features.forEach((feature) => {
      const { type, coordinates } = feature.geometry;
      if (type === "LineString" || type === "MultiLineString") {
        const line = turf.lineString(coordinates);
        const length = turf.length(line, { units: "kilometers" });

        detailedData[type] = (detailedData[type] || 0) + length;
      }
    });

    setDetailed(detailedData);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-700">KML Data</h2>
      <div className="flex space-x-4 mt-3">
        <button
          onClick={generateSummary}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Summary
        </button>
        <button
          onClick={generateDetailed}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Detailed
        </button>
      </div>

      {summary && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-600">Summary</h3>
          <table className="w-full mt-2 border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Element Type</th>
                <th className="border p-2">Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(summary).map(([type, count]) => (
                <tr key={type} className="hover:bg-gray-100">
                  <td className="border p-2">{type}</td>
                  <td className="border p-2">{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {detailed && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-600">Detailed</h3>
          <table className="w-full mt-2 border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Element Type</th>
                <th className="border p-2">Total Length (km)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(detailed).map(([type, length]) => (
                <tr key={type} className="hover:bg-gray-100">
                  <td className="border p-2">{type}</td>
                  <td className="border p-2">{length.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SummaryDetails;
