import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const placeholderSchedules = [
  {
    id: 1,
    facility: "Main Hall",
    event: "Orientation Meeting",
    date: "2026-08-02",
    startTime: "09:00 AM",
    endTime: "11:00 AM",
    status: "Scheduled",
  },
  {
    id: 2,
    facility: "Lab 2",
    event: "Programming Workshop",
    date: "2026-08-03",
    startTime: "10:00 AM",
    endTime: "01:00 PM",
    status: "Scheduled",
  },
  {
    id: 3,
    facility: "Auditorium",
    event: "Guest Lecture",
    date: "2026-08-05",
    startTime: "02:00 PM",
    endTime: "04:00 PM",
    status: "Cancelled",
  },
];

export default function ManageSchedules() {
  const [schedules] = useState(placeholderSchedules);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Manage Schedules
          </h1>
          <p className="text-gray-500">
            View and manage facility schedules
          </p>
        </div>

        <button className="bg-blue-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-blue-700">
          + Add Schedule
        </button>
      </div>

      <p className="text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 text-sm mb-5">
        Showing placeholder data — connect to the real schedules API once
        available.
      </p>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-200">
              <th className="pb-2 font-medium">Facility</th>
              <th className="pb-2 font-medium">Event</th>
              <th className="pb-2 font-medium">Date</th>
              <th className="pb-2 font-medium">Time</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 font-medium text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {schedules.map((schedule) => (
              <tr
                key={schedule.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-3">{schedule.facility}</td>
                <td className="py-3">{schedule.event}</td>
                <td className="py-3">{schedule.date}</td>
                <td className="py-3">
                  {schedule.startTime} - {schedule.endTime}
                </td>
                <td className="py-3">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                      schedule.status === "Scheduled"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    }`}
                  >
                    {schedule.status}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <button className="bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-blue-700">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
