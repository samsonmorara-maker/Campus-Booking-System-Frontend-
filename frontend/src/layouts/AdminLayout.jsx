import { Bell, Search } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
          <div className="relative w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-5">
            <button className="relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                A
              </div>
              <span className="text-sm font-medium text-gray-700">Admin</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
