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
import Group from "./components/Groupdetail";
import Admin from "./components/Admin";
import FooterNav from "./components/FooterNav";
import Posts from "./components/CreatePosts";

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<SignupWithGoogle />} />
        <Route path="/dashboard" element={<UserProfile />} />
        <Route path="/data" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/location-finder" element={<LocationFinder />} />
        <Route path="/createpost" element={<Posts />} />
        <Route path="/group/:id" element={<Group />} />
      </Routes>
      {/* Render FooterNav only if the current path is not the root path */}
      {location.pathname !== "/" && <FooterNav />}
    </>
  );
}

export default App;
