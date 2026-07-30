import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  CalendarCheck,
  CalendarClock,
  Users,
  BarChart3,
  Settings,
  LogOut,
  GraduationCap,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/facilities", label: "Facilities", icon: Building2 },
  { to: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { to: "/admin/schedules", label: "Schedules", icon: CalendarClock },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/reports", label: "Reports", icon: BarChart3 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-blue-950 text-white flex flex-col min-h-screen">
      <div className="flex items-center gap-2 px-5 py-6 bg-blue-900">
        <GraduationCap size={28} />
        <span className="font-bold text-lg tracking-wide">SMART CAMPUS ADMIN</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-blue-100 hover:bg-blue-900"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-6">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-blue-100 hover:bg-blue-900 w-full"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
