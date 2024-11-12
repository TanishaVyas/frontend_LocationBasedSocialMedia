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
import Topbar from "./components/Topbar";
import PrivateRoute from "./Authguard/PrivateRoute";
import { useAuth } from "./Authguard/AuthContext";
import { useEffect } from "react";
import { AuthProvider } from "./Authguard/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import SearchGroup from "./components/SearchGroup";
import MoodChecker from "./components/MoodChecker";
import { useRef, useState } from "react";

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
  // Refs for Topbar and FooterNav
  const topbarRef = useRef(null);
  const footerRef = useRef(null);

  // State for storing their heights
  const [topbarHeight, setTopbarHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);

  // UseEffect to set heights after components mount
  useEffect(() => {
    if (topbarRef.current) {
      setTopbarHeight(topbarRef.current.offsetHeight); // Get Topbar height
    }
    if (footerRef.current) {
      setFooterHeight(footerRef.current.offsetHeight); // Get FooterNav height
    }
  }, []);
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
          console.log("token:", token);
          // Decode and set user
          try {
            const decoded = jwtDecode(token);
            console.log("decoded:", decoded, token);
            setUser(decoded);

            // Fetch current user data
            const response = await fetch(
              "https://backend-location-social-media.onrender.com/auth/current_user",
              {
                headers: { Authorization: `Bearer ${token}` },
                credentials: "include",
              }
            );
            console.log(response);
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
              navigate("/admin", { replace: true });
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
      <div
        style={{
          paddingTop: topbarHeight ? `${topbarHeight}px` : "64px", // Default fallback height for Topbar
          paddingBottom: footerHeight ? `${footerHeight}px` : "56px", // Default fallback height for FooterNav
        }}
      >
        {" "}
        {/* Adjust this value based on footer height */}
        {location.pathname !== "/" && <Topbar />}
        <Routes>
          <Route path="/" element={<SignupWithGoogle />} />
          <Route path="/tokenhandlerUser" element={<TokenHandler />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={UserProfile} roles={["user"]} />}
          />
          <Route
            path="/data"
            element={<PrivateRoute element={Dashboard} roles={["user"]} />}
          />
          <Route
            path="/admin"
            element={<PrivateRoute element={Admin} roles={["admin"]} />}
          />
          <Route
            path="/createpost"
            element={<PrivateRoute element={Posts} roles={["user"]} />}
          />
          <Route
            path="/home"
            element={<PrivateRoute element={HomePage} roles={["user"]} />}
          />
          <Route
            path="/search"
            element={
              <PrivateRoute
                element={SearchGroup}
                navigateTo="group"
                roles={["user"]}
              />
            }
          />
          <Route
            path="/add"
            element={
              <PrivateRoute
                element={SearchGroup}
                navigateTo="posts"
                roles={["user"]}
              />
            }
          />
          <Route path="/posts/:groupId" element={<Posts />} roles={["user"]} />
          <Route path="/mood" element={<MoodChecker />} roles={["user"]} />
          <Route
            path="/location-finder"
            element={
              <PrivateRoute element={LocationFinder} roles={["admin"]} />
            }
          />
          <Route
            path="/group/:groupId"
            element={<PrivateRoute element={GroupPage} roles={["user"]} />}
          />
        </Routes>
      </div>

      {location.pathname !== "/" && <FooterNav />}
    </>
  );
}

export default App;
