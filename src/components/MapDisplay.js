import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapDisplay = ({ geojsonData }) => {
  const [showLayers, setShowLayers] = useState(true);
  const mapRef = useRef(null);

  if (!geojsonData || !geojsonData.features) {
    return <p className="text-center text-gray-500">No KML data to display.</p>;
  }

  // Function to Zoom into a Feature when Clicked from the Sidebar
  const zoomToFeature = (feature) => {
    if (mapRef.current) {
      const geometry = feature.geometry;
      let coordinates = [];

      if (geometry.type === "Point") {
        coordinates = geometry.coordinates;
      } else if (geometry.type === "LineString" || geometry.type === "Polygon") {
        coordinates = geometry.coordinates[0]; // Get the first set of coordinates
      }

      if (coordinates.length >= 2) {
        mapRef.current.flyTo([coordinates[1], coordinates[0]], 12, { duration: 1.5 });
      }
    }
  };

  return (
    <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
      {/* Sidebar for KML Data */}
      <div
        style={{
          width: "250px",
          background: "#f8f9fa",
          padding: "15px",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          overflowY: "auto",
          maxHeight: "500px",
        }}
      >
        <h3 style={{ textAlign: "center", color: "#333", marginBottom: "10px" }}>KML Elements</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {geojsonData.features.map((feature, index) => {
            const featureName = feature.properties?.name || `Feature ${index + 1}`;
            return (
              <li
                key={index}
                style={{
                  padding: "10px",
                  margin: "5px 0",
                  background: "#fff",
                  borderRadius: "5px",
                  cursor: "pointer",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  transition: "0.3s",
                }}
                onClick={() => zoomToFeature(feature)}
              >
                {featureName} ({feature.geometry.type})
              </li>
            );
          })}
        </ul>
      </div>

      {/* Main Map */}
      <div style={{ flex: 1, position: "relative" }}>
        <h2 style={{ textAlign: "center", fontWeight: "bold", color: "#333", marginBottom: "10px" }}>Map View</h2>
        <button
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "8px 15px",
            background: showLayers ? "#d9534f" : "#5cb85c",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
          }}
          onClick={() => setShowLayers(!showLayers)}
        >
          {showLayers ? "Hide KML" : "Show KML"}
        </button>

        <MapContainer
          center={[20.5937, 78.9629]} // Center of India
          zoom={5}
          style={{ width: "100%", height: "500px", borderRadius: "10px", overflow: "hidden" }}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {showLayers && geojsonData.features.length > 0 && <GeoJSON data={geojsonData} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapDisplay;
