import React, { useEffect, useState } from "react";
import MapComponent from "../pages/MapComponent";
import Sidebar from "../pages/LocationsSidebar";
import SearchBar from "../pages/SearchBar";
import { FaBars } from "react-icons/fa";
import { IoCaretBackSharp } from "react-icons/io5";

export default function MapView() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  useEffect(() => {
    // Function to check screen size
    const handleResize = () => {
      if (window.innerWidth < 995) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="container-body">
      <div className="card card-container">
        <div className="card-body p-0">
          <div className="row m-0">
            <div className="col-lg-3 sidebar-section ">
              <SearchBar />
              {sidebarOpen && (
                <div className="overlay" onClick={toggleSidebar}></div>
              )}
              <IoCaretBackSharp
                size={20}
                color="#6D6D6D"
                className={`expand-icon  sidebar ${
                  sidebarOpen ? "open" : "closed"
                }`}
                onClick={toggleSidebar}
              />
              <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
                <Sidebar />
              </div>
              <div onClick={toggleSidebar}>
                <FaBars color="#646567" className="toggle-button" />
              </div>
            </div>
            <div className="col-lg-9 col-12 p-1">
              <MapComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
