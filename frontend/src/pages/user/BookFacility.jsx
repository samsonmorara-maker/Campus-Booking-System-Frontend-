import { useEffect, useState } from "react";
import axios from "axios";
import BookingForm from "../../components/BookingForm";

function BookFacility() {
  const [facility, setFacility] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [facilities, setFacilities] = useState([]);

  // Temporary user ID
  // Replace this with the logged-in user's ID later
  const userId = 1;

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      const response = await axios.get(
        "https://campus-booking-system-backend.onrender.com/facilities"
      );

      setFacilities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !facility ||
      !date ||
      !startTime ||
      !endTime
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const bookingData = {
      user_id: userId,
      facility_id: facility,
      booking_date: date,
      start_time: startTime,
      end_time: endTime,
    };

    try {
      await axios.post(
        "https://campus-booking-system-backend.onrender.com/bookings",
        bookingData
      );

      alert("Booking created successfully!");

      // Reset form
      setFacility("");
      setDate("");
      setStartTime("");
      setEndTime("");
    } catch (error) {
      console.error(error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Failed to create booking.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-[#0B1F6B] text-center mb-8">
          Book a Facility
        </h1>

        <BookingForm
          facilities={facilities}
          facility={facility}
          setFacility={setFacility}
          date={date}
          setDate={setDate}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default BookFacility;