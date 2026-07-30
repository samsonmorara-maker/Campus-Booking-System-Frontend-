import { useState, useEffect } from "react";
import axios from "axios";

function BookFacility() {
  const [facility, setFacility] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/facilities")
      .then((response) => {
        setFacilities(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setMessage("Failed to load facilities.");
        setMessageType("error");
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const booking = {
      facility_id: facility,
      booking_date: date,
      start_time: startTime,
      end_time: endTime,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/bookings",
        booking
      );

      console.log(response.data);

      setMessage("Facility booked successfully!");
      setMessageType("success");

      // Clear form
      setFacility("");
      setDate("");
      setStartTime("");
      setEndTime("");
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message || "Failed to create booking."
      );
      setMessageType("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-[#0B1F6B] mb-8 text-center">
          Book a Facility
        </h1>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg text-white ${
              messageType === "success"
                ? "bg-[#22C55E]"
                : "bg-[#EF4444]"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Facility */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Facility
            </label>

            <select
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              value={facility}
              onChange={(e) => setFacility(e.target.value)}
              required
            >
              <option value="">Select Facility</option>

              {loading ? (
                <option disabled>Loading facilities...</option>
              ) : (
                facilities.map((facility) => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Booking Date
            </label>

            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Start Time
              </label>

              <input
                type="time"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                End Time
              </label>

              <input
                type="time"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#2563EB] text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Book Facility
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookFacility;