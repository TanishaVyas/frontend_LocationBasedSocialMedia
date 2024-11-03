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
  const response = await fetch("http://localhost:8080/auth/current_user", {
    headers: { Authorization: `Bearer ${storedToken}` },
    credentials: "include",
  });
  const userData = await response.json();
  console.log("User details:", userData);
  return userData;
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
