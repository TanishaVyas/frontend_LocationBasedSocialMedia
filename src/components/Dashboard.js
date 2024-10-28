import React from "react";

function Dashboard() {
  

  const handleLogout = () => {
    window.location.href = "http://localhost:8080/auth/logout"; // Directly go to logout URL
  };

  return (
    <div>
      <h2>Hi, I'm the dashboard</h2>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md">
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
