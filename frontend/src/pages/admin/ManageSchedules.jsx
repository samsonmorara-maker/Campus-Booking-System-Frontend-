import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import api from "../../services/api";

export default function ManageSchedules() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSchedules = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/schedules");

      setSchedules(response.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load schedules.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSchedules();
  }, []);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Manage Schedules
          </h1>

          <p className="text-gray-500">
            View all facility schedules
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-red-700">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-200">
              <th className="pb-3 font-medium">Facility</th>
              <th className="pb-3 font-medium">Course</th>
              <th className="pb-3 font-medium">Lecturer</th>
              <th className="pb-3 font-medium">Day</th>
              <th className="pb-3 font-medium">Time</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="5"
                  className="py-10 text-center text-gray-500"
                >
                  Loading schedules...
                </td>
              </tr>
            ) : schedules.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="py-10 text-center text-gray-500"
                >
                  No schedules found.
                </td>
              </tr>
            ) : (
              schedules.map((schedule) => (
                <tr
                  key={schedule.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4">
                    {schedule.facility?.name ??
                      schedule.facility_name ??
                      schedule.facility_id}
                  </td>

                  <td className="py-4">
                    {schedule.course_name}
                  </td>

                  <td className="py-4">
                    {schedule.lecturer}
                  </td>

                  <td className="py-4">
                    {schedule.day}
                  </td>

                  <td className="py-4">
                    {schedule.start_time} - {schedule.end_time}
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