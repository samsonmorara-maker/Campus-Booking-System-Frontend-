import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/admin/Dashboard";
import ManageBookings from "./pages/admin/ManageBookings";
import ManageUsers from "./pages/admin/ManageUsers";
import Reports from "./pages/admin/Reports";
import ManageFacilities from "./pages/admin/ManageFacilities";
import ManageSchedules from "./pages/admin/ManageSchedules";
import Settings from "./pages/admin/Settings";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/bookings" element={<ManageBookings />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/facilities" element={<ManageFacilities />} />
          <Route path="/admin/schedules" element={<ManageSchedules />} />
          <Route path="/admin/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
