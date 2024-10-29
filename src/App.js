import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SignupWithGoogle from "./components/SignupWithGoogle";
import Dashboard from "./components/Dashboard";
import UserProfile from "./components/UserProfile";
import LocationFinder from "./components/locationfinder";
import Group from "./components/Groupdetail";
import Admin from "./components/Admin";
//import LocationDisplay from "./components/LocationDisplay"; // Import the LocationDisplay component
import FooterNav from "./components/FooterNav";
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<SignupWithGoogle />} />
        <Route path="/dashboard" element={<UserProfile />} />
        <Route path="/data" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/location-finder" element={<LocationFinder />} />
        <Route path="/group/:id" element={<Group />} /> 
      </Routes>
    </Router>
    <FooterNav/>
    </>
  );
}

export default App;
