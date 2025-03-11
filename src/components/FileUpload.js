import React, { useState } from "react";
import * as toGeoJSON from "togeojson";

const FileUpload = ({ onDataParsed }) => {
  const [fileName, setFileName] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const parser = new DOMParser();
      const kml = parser.parseFromString(e.target.result, "text/xml");
      const geojson = toGeoJSON.kml(kml);
      onDataParsed(geojson);
    };

    reader.readAsText(file);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
      <input type="file" accept=".kml" onChange={handleFileUpload} className="hidden" id="kml-upload" />
      <label htmlFor="kml-upload" className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
        {fileName ? `Uploaded: ${fileName}` : "Upload KML File"}
      </label>
    </div>
  );
};

export default FileUpload;
