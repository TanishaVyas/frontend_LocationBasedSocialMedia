import React, { useEffect, useState } from "react";

function Dashboard() {
  const [isLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [imageFile, setImageFile] = useState(null);

  const handleLogout = () => {
    window.location.href = "http://localhost:8080/auth/logout";
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("http://localhost:8080/auth/current_user", {
        credentials: "include",
      });
      const userData = await response.json();
      setUser(userData);
      setUpdatedUser({
        email: userData.email, // Add email to the updatedUser state
        username: userData.username,
        bio: userData.bio,
        profilePic: userData.profilePic,
      });
    };

    fetchUser();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setUpdatedUser({ ...updatedUser, profilePic: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/update-profile", {
        method: "POST",
        credentials: "include", // Add this to include cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setUser(updatedData);
        setIsEditing(false);
        console.log("Profile updated successfully:", updatedData);
      } else {
        const errorData = await response.json();
        console.error("Failed to update profile:", errorData.error);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">User Profile</h2>
      {user.profilePic && (
        <img
          src={user.profilePic}
          alt={`${user.username}'s Profile`}
          className="w-24 h-24 rounded-full mb-4"
        />
      )}
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4"
            />
          </div>
          <div>
            <input
              type="text"
              name="username"
              value={updatedUser.username || ''}
              onChange={handleChange}
              placeholder="Username"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <textarea
              name="bio"
              value={updatedUser.bio || ''}
              onChange={handleChange}
              placeholder="Bio"
              className="w-full p-2 border rounded h-32"
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={handleEditToggle}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p><span className="font-semibold">Username:</span> {user.username}</p>
          <p><span className="font-semibold">Name:</span> {user.name}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Bio:</span> {user.bio}</p>
          <p><span className="font-semibold">Phone:</span> {user.phone}</p>
          <p><span className="font-semibold">Date of Birth:</span> {user.dob}</p>
          <button
            onClick={handleEditToggle}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Modify
          </button>
        </div>
      )}
      
      <div className="mt-8">
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
    </div>
  );
}

export default Dashboard;