import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

import Profile from "../pages/user/Profile";
import Facilities from "../pages/user/Facilities";
import FacilityDetails from "../pages/user/FacilityDetails";
import BookFacility from "../pages/user/BookFacility";
import MyBookings from "../pages/user/MyBookings";
import SearchFacilities from "../pages/user/SearchFacilities";
import ClassSchedule from "../pages/user/ClassSchedule";

import AdminDashboard from "../pages/admin/Dashboard";
import ManageBookings from "../pages/admin/ManageBookings";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageFacilities from "../pages/admin/ManageFacilities";
import ManageSchedules from "../pages/admin/ManageSchedules";
import Reports from "../pages/admin/Reports";
import Settings from "../pages/admin/Settings";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/facilities/:id" element={<FacilityDetails />} />
        <Route path="/book/:id" element={<BookFacility />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/search" element={<SearchFacilities />} />
        <Route path="/schedule" element={<ClassSchedule />} />
      </Route>

      {/* Admin Protected Routes */}
      <Route element={<ProtectedRoute requiredRole="admin" />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/bookings" element={<ManageBookings />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/facilities" element={<ManageFacilities />} />
        <Route path="/admin/schedules" element={<ManageSchedules />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;