import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Building2,
  CalendarDays,
  BookOpen,
  User,
  Clock,
  CheckCircle,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    facilities: 0,
    bookings: 0,
    pending: 0,
    approved: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      // Read the correct keys
      const token = localStorage.getItem("access_token");
      const userString = localStorage.getItem("user");

      if (!token) {
        console.error("No authentication token found.");
        navigate("/login");
        return;
      }

      if (!userString) {
        console.error("No user information found.");
        navigate("/login");
        return;
      }

      const user = JSON.parse(userString);

      if (!user || !user.id) {
        console.error("Invalid user data.");
        navigate("/login");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const [facilitiesRes, bookingsRes] = await Promise.all([
        axios.get(`${API_URL}/facilities`, config),
        axios.get(`${API_URL}/bookings/${user.id}`, config),
      ]);

      const facilities = Array.isArray(facilitiesRes.data)
        ? facilitiesRes.data
        : [];

      const bookings = Array.isArray(bookingsRes.data)
        ? bookingsRes.data
        : [];

      setStats({
        facilities: facilities.length,
        bookings: bookings.length,
        pending: bookings.filter(
          (booking) => booking.status === "Pending"
        ).length,
        approved: bookings.filter(
          (booking) => booking.status === "Approved"
        ).length,
      });
    } catch (error) {
      console.error("Dashboard Error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

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
      description: "Reserve a campus facility.",
      icon: CalendarDays,
      path: "/facilities",
      color: "bg-green-500",
    },
    {
      title: "My Bookings",
      description: "Track your reservations.",
      icon: BookOpen,
      path: "/my-bookings",
      color: "bg-purple-500",
    },
    {
      title: "Profile",
      description: "Update your account.",
      icon: User,
      path: "/profile",
      color: "bg-orange-500",
    },
  ];

  const statCards = [
    {
      title: "Facilities",
      value: stats.facilities,
      icon: Building2,
      color: "bg-blue-500",
    },
    {
      title: "Bookings",
      value: stats.bookings,
      icon: BookOpen,
      color: "bg-purple-500",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      title: "Approved",
      value: stats.approved,
      icon: CheckCircle,
      color: "bg-green-500",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold text-gray-600">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-700 text-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold">
            Student Dashboard
          </h1>

          <p className="mt-2 text-blue-100">
            Welcome to the Campus Facility Booking System
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="bg-white rounded-xl shadow p-6 flex justify-between items-center"
              >
                <div>
                  <p className="text-gray-500">{card.title}</p>
                  <h2 className="text-3xl font-bold mt-2">
                    {card.value}
                  </h2>
                </div>

                <div
                  className={`${card.color} w-14 h-14 rounded-full flex items-center justify-center text-white`}
                >
                  <Icon size={28} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
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

        {/* Booking Overview */}
        <div className="mt-10 bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Booking Overview
          </h2>

          <div className="space-y-3 text-gray-700">
            <p>
              Available Facilities:
              <span className="font-semibold ml-2">
                {stats.facilities}
              </span>
            </p>

            <p>
              Total Bookings:
              <span className="font-semibold ml-2">
                {stats.bookings}
              </span>
            </p>

            <p>
              Pending Requests:
              <span className="font-semibold ml-2 text-yellow-600">
                {stats.pending}
              </span>
            </p>

            <p>
              Approved Bookings:
              <span className="font-semibold ml-2 text-green-600">
                {stats.approved}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}