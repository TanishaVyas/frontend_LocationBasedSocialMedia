import axios from 'axios';
const API_URL = "http://localhost:8080/users/groups"; // Adjust if necessary

export async function fetchCurrentUser() {
    const response = await fetch("http://localhost:8080/auth/current_user", {
        credentials: "include",
    });
    return await response.json();
}

// services/UserService.js
export const fetchGroupDetails = async(groupId) => {
    const response = await fetch(`http://localhost:8080/api/groups/${groupId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch group details');
    }
    return await response.json();
};

export const fetchGroupById = async(id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data; // Return the group details
};


export async function updateUserProfile(updatedUser) {
    const response = await fetch("http://localhost:8080/auth/update-profile", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
    }

    return await response.json();
}

export const fetchNearbyGroups = async(latitude, longitude) => {
    const response = await fetch("http://localhost:8080/nearby/fetch-locations-in-radius", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude, longitude }),
    });
    const data = await response.json();
    return data.data;
};

export const joinGroup = async(userId, groupId) => {
    const response = await axios.post("http://localhost:8080/user/join-group", { userId, groupId });
    return response.data;
};

// New service functions

export const getUserAndNearbyGroups = async(setUser, setGroups) => {
    const userData = await fetchCurrentUser();
    setUser(userData);

    if (userData && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
            const { latitude, longitude } = position.coords;
            const nearbyGroups = await fetchNearbyGroups(latitude, longitude);
            setGroups(nearbyGroups);
        });
    }
};

export const handleJoinGroupService = async(userId, groupId) => {
    try {
        const response = await joinGroup(userId, groupId);
        console.log("Group joined successfully:", response);
        return response; // Return the response if needed
    } catch (error) {
        console.error("Error joining group:", error);
        throw error; // Re-throw the error for handling in the component
    }
};

export function logout() {
    window.location.href = "http://localhost:8080/auth/logout";
}