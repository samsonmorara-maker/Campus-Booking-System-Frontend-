import { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import StatusBadge from "../../components/StatusBadge";
import { getAllBookings, approveBooking, rejectBooking } from "../../services/admin";

const FILTERS = ["all", "pending", "approved", "rejected"];

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  async function loadBookings(status) {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllBookings(status === "all" ? null : status);
      setBookings(data);
    } catch (err) {
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings(filter);
  }, [filter]);

  async function handleApprove(id) {
    setActionLoadingId(id);
    try {
      await approveBooking(id);
      await loadBookings(filter);
    } catch (err) {
      setError("Failed to approve booking");
    } finally {
      setActionLoadingId(null);
    }
  }

  async function handleReject(id) {
    setActionLoadingId(id);
    try {
      await rejectBooking(id);
      await loadBookings(filter);
    } catch (err) {
      setError("Failed to reject booking");
    } finally {
      setActionLoadingId(null);
    }
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Manage Bookings</h1>
      <p className="text-gray-500 mb-6">Review, approve, or reject facility bookings</p>

      <div className="flex gap-2 mb-5">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-sm font-medium px-4 py-2 rounded-lg capitalize transition ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-200">
              <th className="pb-2 font-medium">Student ID</th>
              <th className="pb-2 font-medium">Facility ID</th>
              <th className="pb-2 font-medium">Date</th>
              <th className="pb-2 font-medium">Time</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="py-6 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-6 text-center text-gray-400">
                  No bookings found
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b.id} className="border-b border-gray-100">
                  <td className="py-3">{b.user_id}</td>
                  <td className="py-3">{b.facility_id}</td>
                  <td className="py-3">{b.booking_date}</td>
                  <td className="py-3">
                    {b.start_time}–{b.end_time}
                  </td>
                  <td className="py-3">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="py-3 text-right">
                    {b.status === "pending" ? (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleApprove(b.id)}
                          disabled={actionLoadingId === b.id}
                          className="bg-green-50 text-green-700 border border-green-200 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-green-100 disabled:opacity-50"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(b.id)}
                          disabled={actionLoadingId === b.id}
                          className="bg-red-50 text-red-700 border border-red-200 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-red-100 disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
