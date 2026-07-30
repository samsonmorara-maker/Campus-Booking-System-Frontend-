import { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getAllUsers } from "../../services/admin";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Manage Users</h1>
      <p className="text-gray-500 mb-6">All registered students and staff</p>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-200">
              <th className="pb-2 font-medium">Name</th>
              <th className="pb-2 font-medium">Email</th>
              <th className="pb-2 font-medium">Role</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="py-6 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="3" className="py-6 text-center text-gray-400">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="border-b border-gray-100">
                  <td className="py-3">
                    {u.first_name} {u.last_name}
                  </td>
                  <td className="py-3">{u.email}</td>
                  <td className="py-3 capitalize">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                        u.role === "admin"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-gray-50 text-gray-600 border-gray-200"
                      }`}
                    >
                      {u.role}
                    </span>
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
