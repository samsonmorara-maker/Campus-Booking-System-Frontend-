import { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import StatusBadge from "../../components/StatusBadge";
import {
  getAllBookings,
  approveBooking,
  rejectBooking,
} from "../../services/admin";

const FILTERS = ["all", "pending", "approved", "rejected"];

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const loadBookings = async (status = "all") => {
    setLoading(true);
    setError("");

    try {
      const response = await getAllBookings(
        status === "all" ? null : status
      );

      if (Array.isArray(response)) {
        setBookings(response);
      } else if (Array.isArray(response.bookings)) {
        setBookings(response.bookings);
      } else {
        setBookings([]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings(filter);
  }, [filter]);

  const handleApprove = async (id) => {
    try {
      setActionLoadingId(id);

      await approveBooking(id);

      await loadBookings(filter);
    } catch (err) {
      console.error(err);
      setError("Failed to approve booking.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReject = async (id) => {
    try {
      setActionLoadingId(id);

      await rejectBooking(id);

      await loadBookings(filter);
    } catch (err) {
      console.error(err);
      setError("Failed to reject booking.");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Manage Bookings
          </h1>

          <p className="text-gray-500">
            Review, approve or reject facility bookings
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {FILTERS.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition ${
              filter === item
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-5 rounded-lg bg-red-50 border border-red-200 p-3 text-red-700">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="pb-3">Student</th>
              <th className="pb-3">Facility</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Time</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="6"
                  className="py-10 text-center text-gray-500"
                >
                  Loading bookings...
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="py-10 text-center text-gray-500"
                >
                  No bookings found.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-gray-100"
                >
                  <td className="py-4">
                    {booking.user?.first_name
                      ? `${booking.user.first_name} ${booking.user.last_name}`
                      : booking.user_id}
                  </td>

                  <td className="py-4">
                    {booking.facility?.name ??
                      booking.facility_id}
                  </td>

                  <td className="py-4">
                    {booking.booking_date}
                  </td>

                  <td className="py-4">
                    {booking.start_time} - {booking.end_time}
                  </td>

                  <td className="py-4">
                    <StatusBadge
                      status={booking.status}
                    />
                  </td>

                  <td className="py-4 text-right">
                    {booking.status === "pending" ? (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            handleApprove(booking.id)
                          }
                          disabled={
                            actionLoadingId === booking.id
                          }
                          className="bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 px-3 py-1.5 rounded-lg text-xs font-medium disabled:opacity-50"
                        >
                          {actionLoadingId === booking.id
                            ? "..."
                            : "Approve"}
                        </button>

                        <button
                          onClick={() =>
                            handleReject(booking.id)
                          }
                          disabled={
                            actionLoadingId === booking.id
                          }
                          className="bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 px-3 py-1.5 rounded-lg text-xs font-medium disabled:opacity-50"
                        >
                          {actionLoadingId === booking.id
                            ? "..."
                            : "Reject"}
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400">
                        —
                      </span>
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