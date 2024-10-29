// services/UserService.js
export async function fetchCurrentUser() {
    const response = await fetch("http://localhost:8080/auth/current_user", {
        credentials: "include",
    });
    return await response.json();
}

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

export function logout() {
    window.location.href = "http://localhost:8080/auth/logout";
}