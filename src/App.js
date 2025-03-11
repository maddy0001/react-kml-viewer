import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import "leaflet/dist/leaflet.css";


const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Home />
      </main>
      <Footer />
    </div>
  );
};

export default App;
