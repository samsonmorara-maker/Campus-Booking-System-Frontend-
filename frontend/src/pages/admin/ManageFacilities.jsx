import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const placeholderFacilities = [
  { id: 1, name: "Main Hall", location: "Block A", capacity: 200, available: true },
  { id: 2, name: "Lab 2", location: "Block B", capacity: 40, available: true },
  { id: 3, name: "Auditorium", location: "Block C", capacity: 350, available: false },
];

export default function ManageFacilities() {
  const [facilities] = useState(placeholderFacilities);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Manage Facilities</h1>
          <p className="text-gray-500">Add, edit, or remove campus facilities</p>
        </div>
        <button className="bg-blue-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-blue-700">
          + Add Facility
        </button>
      </div>

      <p className="text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 text-sm mb-5">
        Showing placeholder data — connect to the real facilities API once available.
      </p>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-200">
              <th className="pb-2 font-medium">Name</th>
              <th className="pb-2 font-medium">Location</th>
              <th className="pb-2 font-medium">Capacity</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {facilities.map((f) => (
              <tr key={f.id} className="border-b border-gray-100">
                <td className="py-3">{f.name}</td>
                <td className="py-3">{f.location}</td>
                <td className="py-3">{f.capacity}</td>
                <td className="py-3">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                      f.available
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    }`}
                  >
                    {f.available ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <button className="bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-blue-700">
                    Edit
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
