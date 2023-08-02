import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile/Profile";
import Diet from "./pages/Diet/Diet";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/diet" element={<Diet />} />
        <Route path="/createWorkout" element={<h1>Create Workouts</h1>} />
        <Route path="/workouts" element={<h1>Execute Workout</h1>} />
      </Routes>
    </>
  );
}

export default App;
