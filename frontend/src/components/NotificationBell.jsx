import { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllBookings } from "../services/admin";

export default function NotificationBell() {
  const [pending, setPending] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadPending() {
      try {
        const data = await getAllBookings("pending");
        setPending(data);
      } catch (err) {
        // fail silently, bell just shows no notifications
      }
    }
    loadPending();
    const interval = setInterval(loadPending, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setOpen(!open)} className="relative">
        <Bell size={20} className="text-gray-600" />
        {pending.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
            {pending.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl border border-gray-200 shadow-lg z-10">
          <div className="px-4 py-3 border-b border-gray-100 font-medium text-gray-900">
            Pending Bookings
          </div>
          <div className="max-h-64 overflow-y-auto">
            {pending.length === 0 ? (
              <p className="px-4 py-6 text-sm text-gray-400 text-center">
                No pending bookings
              </p>
            ) : (
              pending.slice(0, 5).map((b) => (
                <div key={b.id} className="px-4 py-3 border-b border-gray-50 text-sm">
                  <p className="text-gray-800">
                    Booking #{b.id} — Facility {b.facility_id}
                  </p>
                  <p className="text-gray-400 text-xs">{b.booking_date}</p>
                </div>
              ))
            )}
          </div>
          <button
            onClick={() => {
              setOpen(false);
              navigate("/admin/bookings");
            }}
            className="w-full text-center text-sm text-blue-600 font-medium py-2.5 hover:bg-gray-50 rounded-b-xl"
          >
            View all bookings
          </button>
        </div>
      )}
    </div>
  );
}
