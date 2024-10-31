import axios from "axios";
import { fetchCurrentUser } from "./UserService";

export const fetchGroupDetails = async (groupId) => {
  const response = await fetch(`http://localhost:8080/api/groups/${groupId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch group details");
  }
  return await response.json();
};

export const fetchGroupById = async (id) => {
  const response = await axios.get(`http://localhost:8080/users/groups/${id}`);
  return response.data;
};

export const fetchNearbyGroups = async (latitude, longitude) => {
  try {
    const response = await fetch(
      "http://localhost:8080/nearby/fetch-locations-in-radius",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude, longitude }),
      }
    );

    if (!response.ok) throw new Error("Failed to fetch nearby groups");

    const result = await response.json();
    console.log("Response from server:", result);

    return result.data || [];
  } catch (error) {
    console.error("Error fetching nearby groups:", error);
    return [];
  }
};

export const fetchNearbyGroupsByCategory = async (
  latitude,
  longitude,
  category
) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/nearby/fetch-locations-in-radius-category`,
      {
        latitude,
        longitude,
        category,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching locations by category:", error);
    throw error;
  }
};

export const joinGroup = async (userId, groupId) => {
  const response = await axios.post("http://localhost:8080/user/join-group", {
    userId,
    groupId,
  });
  return response.data;
};

export const getUserAndNearbyGroups = async (setUser, setGroups) => {
  try {
    const userData = await fetchCurrentUser();
    if (userData) {
      setUser(userData);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            console.log("Position:", latitude, longitude);

            const nearbyGroups = await fetchNearbyGroups(latitude, longitude);
            setGroups(nearbyGroups);
          },
          (error) => {
            console.error("Error getting location:", error);
            alert("Unable to retrieve your location.");
          }
        );
      } else {
        console.warn("Geolocation not supported by this browser.");
      }
    }
  } catch (error) {
    console.error("Error fetching user or groups data:", error);
  }
};

export const handleJoinGroupService = async (userId, groupId) => {
  try {
    const response = await joinGroup(userId, groupId);
    console.log("Group joined successfully:", response);
    return response;
  } catch (error) {
    console.error("Error joining group:", error);
    throw error;
  }
};
