import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Admin() {
  const navigate = useNavigate();
  const goToLocationFinder = () => {
    navigate("/location-finder");
  };
  const [isLoading] = useState(false); // Remove setIsLoading if not using it
  const [error] = useState(null); // Remove setError if not using it

  const handleLogout = () => {
    window.location.href = "http://localhost:8080/auth/logout"; // Directly go to logout URL
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className={`${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          } text-white px-6 py-2 rounded-md transition-colors duration-200 flex items-center`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Logging out...
            </>
          ) : (
            "Logout"
          )}
        </button>
      </div>
      <button
        onClick={goToLocationFinder}
        className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4"
      >
        Go to Location Finder
      </button>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Add your admin dashboard content here */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">
          Welcome to Admin Dashboard
        </h3>
        {/* Add your admin features/content here */}
      </div>
    </div>
  );
}

export default Admin;
