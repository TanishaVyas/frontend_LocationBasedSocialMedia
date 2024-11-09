import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import SignupWithGoogle from "./components/SignupWithGoogle";
import Dashboard from "./components/Dashboard";
import UserProfile from "./components/UserProfile";
import LocationFinder from "./components/locationfinder";
import GroupPage from "./components/GroupPage";
import Admin from "./components/Admin";
import FooterNav from "./components/FooterNav";
import Posts from "./components/CreatePosts";
import PrivateRoute from "./Authguard/PrivateRoute";
import { useAuth } from "./Authguard/AuthContext";
import { useEffect } from "react";
import { AuthProvider } from "./Authguard/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import SearchGroup from "./components/SearchGroup";
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

function AppRoutes() {
  const location = useLocation();

  function TokenHandler() {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    useEffect(() => {
      const handleToken = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        console.log("token:", token);

        if (token) {
          // Store token in localStorage
          localStorage.setItem("token", token);

          // Decode and set user
          try {
            const decoded = jwtDecode(token);
            setUser(decoded);

            // Fetch current user data
            const response = await fetch(
              "http://localhost:8080/auth/current_user",
              {
                headers: { Authorization: `Bearer ${token}` },
                credentials: "include",
              }
            );

            if (!response.ok) throw new Error("Failed to fetch user data");

            const userData = await response.json();
            console.log("Fetched user data:", userData);

            // Remove token from URL
            const cleanUrl = window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);

            // Navigate based on user type
            if (userData.type === "user") {
              navigate("/dashboard", { replace: true });
            } else if (userData.type === "admin") {
              navigate("/location-finder", { replace: true });
            }
          } catch (error) {
            console.error("Token decode error:", error);
            navigate("/");
          }
        } else {
          // Handle case when token is missing
          const storedToken = localStorage.getItem("token");
          if (!storedToken) {
            navigate("/");
          }
        }
      };
      handleToken();
    }, [navigate, setUser]);

    // Show loading state while handling token
    return <div>Loading...</div>;
  }
  return (
    <>
      <div style={{ paddingBottom: "56px" }}>
        {" "}
        {/* Adjust this value based on footer height */}
        <Routes>
          <Route path="/" element={<SignupWithGoogle />} />
          <Route path="/tokenhandlerUser" element={<TokenHandler />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={UserProfile} />}
          />
          <Route path="/data" element={<PrivateRoute element={Dashboard} />} />
          <Route path="/admin" element={<PrivateRoute element={Admin} />} />
          <Route
            path="/createpost"
            element={<PrivateRoute element={Posts} />}
          />
          <Route path="/home" element={<PrivateRoute element={HomePage} />} />
          <Route
            path="/search"
            element={<PrivateRoute element={SearchGroup} navigateTo="group" />}
          />
          <Route
            path="/add"
            element={<PrivateRoute element={SearchGroup} navigateTo="posts" />}
          />
          <Route path="/posts/:groupId" element={<Posts />} />
          <Route
            path="/location-finder"
            element={<PrivateRoute element={LocationFinder} />}
          />
          <Route
            path="/group/:groupId"
            element={<PrivateRoute element={GroupPage} />}
          />
        </Routes>
      </div>

      {location.pathname !== "/" && <FooterNav />}
    </>
  );
}

export default App;
