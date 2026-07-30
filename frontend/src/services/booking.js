import axios from "axios";

const API_URL = "https://campus-booking-system-backend.onrender.com";


// Create Booking
export const createBooking = async (data) => {
  const response = await axios.post(
    `${API_URL}/bookings`,
    data
  );
  return response.data;
};


// Check Facility Availability
export const checkAvailability = async (
  facilityId,
  date,
  startTime,
  endTime
) => {
  const response = await axios.get(
    `${API_URL}/bookings/availability`,
    {
      params: {
        facility_id: facilityId,
        booking_date: date,
        start_time: startTime,
        end_time: endTime,
      },
    }
  );
  return response.data;
};

// Get User Booking History
export const getMyBookings = async (userId) => {
  const response = await axios.get(
    `${API_URL}/bookings/${userId}`
  );
  return response.data;
};



// Cancel Booking
export const cancelBooking = async (bookingId) => {
  const response = await axios.patch(
    `${API_URL}/bookings/${bookingId}/cancel`
  );
  return response.data;
};