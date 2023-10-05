import { Route, Routes } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile/Profile";
import Diet from "./pages/Diet/Diet";
import Workouts from "./pages/Workouts/Workouts";
import Schedule from "./pages/Schedule/Schedule";
import ViewWorkout from "./pages/Workouts/ViewWorkout";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/diet" element={<Diet />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/workout/:id" element={<ViewWorkout />} />
      </Routes>
    </DndProvider>
  );
}

export default App;
