import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile/Profile";
import Diet from "./pages/Diet/Diet";
import Workouts from "./pages/Workouts/Workouts";
import Schedule from "./pages/Schedule/Schedule";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/diet" element={<Diet />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </>
  );
}

export default App;
