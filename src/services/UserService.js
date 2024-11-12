//used in userprofile.js http://localhost:3000/dashboard
/*example format of data:

bio: "hi"
dob: "2024-10-24T00:00:00.000Z"
email: "tanishavyas06@gmail.com"
groupsJoined: ['672094a2c276786346a14e46']
isProfileComplete: false
name: "tanisha vyas"
phone: "1234567890"
profilePic: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAzg
provider: "google"
type: "user"
username: "tony"
_id: "6720781d989ac7ab22e46160"

*/
export async function fetchCurrentUser() {
    const storedToken = localStorage.getItem("token");
    const response = await fetch("https://backend-location-social-media.onrender.com/auth/current_user", {
        headers: { Authorization: `Bearer ${storedToken}` },
        credentials: "include",
    });
    const userData = await response.json();
    console.log("User details:", userData);
    return userData;
}

export async function getUserById(userId) {
    try {
        const response = await fetch("https://backend-location-social-media.onrender.com/user/UserbyId", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userID: userId }),
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const userData = await response.json();
        console.log("Fetched user data:", userData);

        return userData || {};
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return null;
    }
}

//used in editprofile.js
/*updated user includes:
const [updatedUser, setUpdatedUser] = useState({
    email: user.email,
    username: user.username,
    bio: user.bio,
    profilePic: user.profilePic,
    phone: user.phone,
    dob: user.dob,
  });
   */
export async function updateUserProfile(updatedUser) {
    const response = await fetch("https://backend-location-social-media.onrender.com/auth/update-profile", {
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
    window.location.href = "https://backend-location-social-media.onrender.com/auth/logout";
}