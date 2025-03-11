import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import MapDisplay from "../components/MapDisplay";
import SummaryDetails from "../components/SummaryDetails";

const Home = () => {
  const [geojsonData, setGeojsonData] = useState(null);

  return (
    <div className="container mx-auto p-5">
      <FileUpload onDataParsed={setGeojsonData} />
      {geojsonData && <MapDisplay geojsonData={geojsonData} />}
      {geojsonData && <SummaryDetails geojsonData={geojsonData} />}
    </div>
  );
};

export default Home;
