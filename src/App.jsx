
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/landing";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Tasks from "./pages/tasks";
import Calendar from "./pages/calendar";
import Notes from "./pages/notes";
import Analytics from "./pages/analytics";

import DashboardLayout from "./components/dashboardlayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route element={<DashboardLayout />}>

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/tasks" element={<Tasks />} />

        <Route path="/calendar" element={<Calendar />} />

        <Route path="/notes" element={<Notes />} />

        <Route path="/analytics" element={<Analytics />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;