import React from "react";

function Admin() {

    const handleLogout = () => {
        window.location.href = "http://localhost:8080/auth/logout"; // Directly go to logout URL
      };
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md">
        Logout
      </button>
    </div>
    
  );
}

export default Admin;
