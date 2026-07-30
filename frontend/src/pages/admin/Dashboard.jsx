import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  CalendarCheck,
  Users,
  Clock,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import AdminLayout from "../../layouts/AdminLayout";
import StatCard from "../../components/StatCard";
import StatusBadge from "../../components/StatusBadge";

import {
  getDashboardStats,
  getAllBookings,
} from "../../services/admin";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({});
  const [recentBookings, setRecentBookings] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [statsResponse, bookingsResponse] =
        await Promise.all([
          getDashboardStats(),
          getAllBookings(),
        ]);

      const dashboard =
        statsResponse?.stats ||
        statsResponse ||
        {};

      setStats(dashboard);

      const bookings = Array.isArray(bookingsResponse)
        ? bookingsResponse
        : bookingsResponse?.bookings || [];

      setRecentBookings(bookings.slice(0, 5));

      // Build weekly chart from booking dates
      const days = {
        Mon: 0,
        Tue: 0,
        Wed: 0,
        Thu: 0,
        Fri: 0,
        Sat: 0,
        Sun: 0,
      };

      bookings.forEach((booking) => {
        if (!booking.booking_date) return;

        const day = new Date(
          booking.booking_date
        ).toLocaleDateString("en-US", {
          weekday: "short",
        });

        if (days[day] !== undefined) {
          days[day]++;
        }
      });

      setWeeklyData(
        Object.entries(days).map(([day, bookings]) => ({
          day,
          bookings,
        }))
      );
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <p className="text-gray-500">
          Loading dashboard...
        </p>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        Dashboard
      </h1>

      <p className="text-gray-500 mb-6">
        Welcome back, Admin
      </p>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={Building2}
          value={stats.total_facilities || 0}
          label="Facilities"
          color="blue"
        />

        <StatCard
          icon={CalendarCheck}
          value={stats.total_bookings || 0}
          label="Bookings"
          color="purple"
        />

        <StatCard
          icon={Users}
          value={stats.approved_bookings || 0}
          label="Approved"
          color="green"
        />

        <StatCard
          icon={Clock}
          value={stats.pending_bookings || 0}
          label="Pending Bookings"
          color="amber"
        />
      </div>

      {/* Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Recent Bookings
          </h2>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-200">
                <th className="pb-2 font-medium">
                  Student
                </th>
                <th className="pb-2 font-medium">
                  Facility
                </th>
                <th className="pb-2 font-medium">
                  Date
                </th>
                <th className="pb-2 font-medium">
                  Status
                </th>
                <th className="pb-2 font-medium text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {recentBookings.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="py-6 text-center text-gray-400"
                  >
                    No bookings yet
                  </td>
                </tr>
              ) : (
                recentBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-gray-100"
                  >
                    <td className="py-3">
                      {booking.user?.first_name
                        ? `${booking.user.first_name} ${booking.user.last_name}`
                        : booking.user_id}
                    </td>

                    <td className="py-3">
                      {booking.facility?.name ??
                        booking.facility_id}
                    </td>

                    <td className="py-3">
                      {booking.booking_date}
                    </td>

                    <td className="py-3">
                      <StatusBadge
                        status={booking.status}
                      />
                    </td>

                    <td className="py-3 text-right">
                      <button
                        onClick={() =>
                          navigate(
                            "/admin/bookings"
                          )
                        }
                        className="bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-blue-700"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Booking Statistics */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Booking Statistics
          </h2>

          <ResponsiveContainer
            width="100%"
            height={250}
          >
            <BarChart data={weeklyData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="day"
                tick={{ fontSize: 12 }}
              />

              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12 }}
              />

              <Bar
                dataKey="bookings"
                fill="#2563EB"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() =>
              navigate("/admin/facilities")
            }
            className="flex items-center gap-3 bg-blue-50 rounded-lg p-4 hover:bg-blue-100"
          >
            <Building2
              size={20}
              className="text-blue-600"
            />
            <span className="font-medium text-gray-800">
              Manage Facilities
            </span>
          </button>

          <button
            onClick={() =>
              navigate("/admin/bookings")
            }
            className="flex items-center gap-3 bg-purple-50 rounded-lg p-4 hover:bg-purple-100"
          >
            <CalendarCheck
              size={20}
              className="text-purple-600"
            />
            <span className="font-medium text-gray-800">
              View Bookings
            </span>
          </button>

          <button
            onClick={() =>
              navigate("/admin/users")
            }
            className="flex items-center gap-3 bg-green-50 rounded-lg p-4 hover:bg-green-100"
          >
            <Users
              size={20}
              className="text-green-600"
            />
            <span className="font-medium text-gray-800">
              Manage Users
            </span>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}