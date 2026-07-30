import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

export default function Settings() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("email_notifications");
    const savedDark = localStorage.getItem("dark_mode");

    if (savedEmail !== null) {
      setEmailNotifs(savedEmail === "true");
    }

    if (savedDark !== null) {
      setDarkMode(savedDark === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "email_notifications",
      emailNotifs
    );
  }, [emailNotifs]);

  useEffect(() => {
    localStorage.setItem(
      "dark_mode",
      darkMode
    );
  }, [darkMode]);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        Settings
      </h1>

      <p className="text-gray-500 mb-6">
        Manage your admin preferences
      </p>

      <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-xl">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Preferences
        </h2>

        {/* Email Notifications */}
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div>
            <p className="text-sm font-medium text-gray-800">
              Email Notifications
            </p>

            <p className="text-xs text-gray-400">
              Receive notifications for new booking requests.
            </p>
          </div>

          <button
            onClick={() =>
              setEmailNotifs(!emailNotifs)
            }
            className={`relative w-11 h-6 rounded-full transition ${
              emailNotifs
                ? "bg-blue-600"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
                emailNotifs
                  ? "translate-x-5"
                  : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        {/* Dark Mode */}
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm font-medium text-gray-800">
              Dark Mode
            </p>

            <p className="text-xs text-gray-400">
              Enable dark theme (frontend only).
            </p>
          </div>

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className={`relative w-11 h-6 rounded-full transition ${
              darkMode
                ? "bg-blue-600"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
                darkMode
                  ? "translate-x-5"
                  : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="mt-5 max-w-xl rounded-lg border border-green-200 bg-green-50 p-4">
        <h3 className="text-sm font-semibold text-green-700">
          Settings Saved
        </h3>

        <p className="mt-1 text-sm text-green-600">
          Your preferences are automatically saved in your
          browser and will be restored the next time you
          visit this page.
        </p>
      </div>

      <div className="mt-5 max-w-xl rounded-lg border border-amber-200 bg-amber-50 p-4">
        <h3 className="text-sm font-semibold text-amber-700">
          Note
        </h3>

        <p className="mt-1 text-sm text-amber-600">
          These settings are currently stored locally. Once
          a backend settings API is available, they can be
          synchronized with your administrator account.
        </p>
      </div>
    </AdminLayout>
  );
}