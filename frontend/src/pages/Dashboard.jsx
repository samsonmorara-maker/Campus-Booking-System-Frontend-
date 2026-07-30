import { Link } from "react-router-dom";
import {
  Building2,
  CalendarDays,
  BookOpen,
  User,
} from "lucide-react";

export default function Dashboard() {
  const cards = [
    {
      title: "Browse Facilities",
      description: "View all available campus facilities.",
      icon: Building2,
      path: "/facilities",
      color: "bg-blue-500",
    },
    {
      title: "Book a Facility",
      description: "Reserve a facility for your activities.",
      icon: CalendarDays,
      path: "/facilities",
      color: "bg-green-500",
    },
    {
      title: "My Bookings",
      description: "View and manage your bookings.",
      icon: BookOpen,
      path: "/my-bookings",
      color: "bg-purple-500",
    },
    {
      title: "Profile",
      description: "View and edit your account.",
      icon: User,
      path: "/profile",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-700 text-white py-8 shadow">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold">
            Student Dashboard
          </h1>
          <p className="mt-2 text-blue-100">
            Welcome to the Campus Facility Booking System.
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.title}
                to={card.path}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-6"
              >
                <div
                  className={`${card.color} w-14 h-14 rounded-full flex items-center justify-center text-white mb-4`}
                >
                  <Icon size={28} />
                </div>

                <h3 className="text-xl font-semibold">
                  {card.title}
                </h3>

                <p className="text-gray-600 mt-2">
                  {card.description}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Information Section */}
        <div className="mt-10 bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Getting Started
          </h2>

          <ul className="space-y-3 list-disc list-inside text-gray-700">
            <li>Browse available campus facilities.</li>
            <li>Book facilities for your activities.</li>
            <li>Monitor the status of your bookings.</li>
            <li>View the class schedule.</li>
            <li>Manage your profile information.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}