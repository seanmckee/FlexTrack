import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/nutrition" element={<h1>Workouts</h1>} />
        <Route path="/createWorkouts" element={<h1>Create Workouts</h1>} />
        <Route path="/workout" element={<h1>Execute Workout</h1>} />
      </Routes>
    </>
  );
}

export default App;
