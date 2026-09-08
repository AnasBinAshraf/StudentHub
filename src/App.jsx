
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Tasks from "./pages/tasks";
import Calendar from "./pages/calendar";
import Notes from "./pages/notes";
import Analytics from "./pages/analytics";
import Study from "./pages/study";
import About from "./pages/about";

import DashboardLayout from "./components/dashboardlayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/tasks" element={<Tasks />} />

        <Route path="/calendar" element={<Calendar />} />

        <Route path="/notes" element={<Notes />} />

        <Route path="/analytics" element={<Analytics />} />

        <Route path="/study" element={<Study />} />

        <Route path="/about" element={<About />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;