import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

import AdminLayout from "../../layouts/AdminLayout";
import {
  getDashboardStats,
  getAllBookings,
} from "../../services/admin";

const STATUS_COLORS = {
  pending: "#F59E0B",
  approved: "#22C55E",
  rejected: "#EF4444",
};

export default function Reports() {
  const [stats, setStats] =useState(null);
  const [facilityCounts, setFacilityCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      setError("");

      const [statsResponse, bookingsResponse] = await Promise.all([
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

      const counts = {};

      bookings.forEach((booking) => {
        const facility =
          booking.facility?.name ||
          booking.facility_name ||
          `Facility ${booking.facility_id}`;

        counts[facility] = (counts[facility] || 0) + 1;
      });

      setFacilityCounts(
        Object.entries(counts).map(([name, count]) => ({
          name,
          count,
        }))
      );
    } catch (err) {
      console.error(err);
      setError("Failed to load reports.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <p className="text-gray-500">
          Loading reports...
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

  const statusData = [
    {
      name: "Pending",
      value: stats?.pending_bookings || 0,
      key: "pending",
    },
    {
      name: "Approved",
      value: stats?.approved_bookings || 0,
      key: "approved",
    },
    {
      name: "Rejected",
      value: stats?.rejected_bookings || 0,
      key: "rejected",
    },
  ];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        Reports
      </h1>

      <p className="text-gray-500 mb-6">
        Booking trends and status breakdown
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Bookings by Status
          </h2>

          <ResponsiveContainer
            width="100%"
            height={280}
          >
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {statusData.map((item) => (
                  <Cell
                    key={item.key}
                    fill={STATUS_COLORS[item.key]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Bookings per Facility
          </h2>

          {facilityCounts.length === 0 ? (
            <div className="flex items-center justify-center h-[280px] text-gray-400">
              No booking data available
            </div>
          ) : (
            <ResponsiveContainer
              width="100%"
              height={280}
            >
              <BarChart data={facilityCounts}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                />

                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 12 }}
                />

                <Tooltip />

                <Bar
                  dataKey="count"
                  fill="#2563EB"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}