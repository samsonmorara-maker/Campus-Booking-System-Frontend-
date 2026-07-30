import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

export default function Settings() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Settings</h1>
      <p className="text-gray-500 mb-6">Manage your admin preferences</p>

      <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-xl">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Preferences</h2>

        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div>
            <p className="text-sm font-medium text-gray-800">Email notifications</p>
            <p className="text-xs text-gray-400">Get notified about pending bookings</p>
          </div>
          <button
            onClick={() => setEmailNotifs(!emailNotifs)}
            className={`w-11 h-6 rounded-full transition ${
              emailNotifs ? "bg-blue-600" : "bg-gray-300"
            } relative`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
                emailNotifs ? "left-5.5" : "left-0.5"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm font-medium text-gray-800">Dark mode</p>
            <p className="text-xs text-gray-400">Coming soon</p>
          </div>
          <button
            disabled
            className="w-11 h-6 rounded-full bg-gray-200 relative opacity-50 cursor-not-allowed"
          >
            <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full" />
          </button>
        </div>
      </div>

      <p className="text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 text-sm mt-5 max-w-xl">
        Preferences are stored locally for now — no backend endpoint exists yet to persist these.
      </p>
    </AdminLayout>
  );
}
