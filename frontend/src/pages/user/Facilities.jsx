import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getFacilities } from "../../services/facility";
import FacilityCard from "../../components/FacilityCard";

function Facilities() {
  const navigate = useNavigate();

  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        navigate("/login");
        return;
      }

      const data = await getFacilities();

      setFacilities(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Facilities Error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      setError("Failed to load facilities.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <p className="text-lg font-medium text-gray-600">
          Loading facilities...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <p className="text-red-500 font-medium">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Campus Facilities
        </h1>

        <p className="text-gray-600 mt-2">
          Browse available campus facilities.
        </p>
      </div>

      {facilities.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <p className="text-gray-500">
            No facilities available.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility) => (
            <FacilityCard
              key={facility.id}
              facility={facility}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Facilities;