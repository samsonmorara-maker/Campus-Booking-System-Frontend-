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
import { getDashboardStats, getAllBookings } from "../../services/admin";

const STATUS_COLORS = {
  pending: "#F59E0B",
  approved: "#22C55E",
  rejected: "#EF4444",
};

export default function Reports() {
  const [stats, setStats] = useState(null);
  const [facilityCounts, setFacilityCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadReportData() {
      try {
        const [statsData, bookingsData] = await Promise.all([
          getDashboardStats(),
          getAllBookings(),
        ]);
        setStats(statsData);

        const counts = {};
        bookingsData.forEach((b) => {
          const key = `Facility ${b.facility_id}`;
          counts[key] = (counts[key] || 0) + 1;
        });
        setFacilityCounts(
          Object.entries(counts).map(([name, count]) => ({ name, count }))
        );
      } catch (err) {
        setError("Failed to load report data");
      } finally {
        setLoading(false);
      }
    }
    loadReportData();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <p className="text-gray-500">Loading reports...</p>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <p className="text-red-600">{error}</p>
      </AdminLayout>
    );
  }

  const statusData = [
    { name: "Pending", value: stats.pending_bookings, key: "pending" },
    { name: "Approved", value: stats.approved_bookings, key: "approved" },
    { name: "Rejected", value: stats.rejected_bookings, key: "rejected" },
  ];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Reports</h1>
      <p className="text-gray-500 mb-6">Booking trends and status breakdown</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Bookings by Status</h2>
          <ResponsiveContainer width="100%" height={280}>
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
                {statusData.map((entry) => (
                  <Cell key={entry.key} fill={STATUS_COLORS[entry.key]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Bookings per Facility</h2>
          {facilityCounts.length === 0 ? (
            <p className="text-gray-400 text-center py-16">No booking data yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={facilityCounts}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
