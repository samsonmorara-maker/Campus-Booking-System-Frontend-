import { useEffect, useState } from "react";
import axios from "axios";
import BookingCard from "../../components/BookingCard";


function MyBookings() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = 1; // replace with logged-in user later

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async()=>{
    try{
      const response = await axios.get(
        `http://127.0.0.1:5000/bookings/${userId}`
      );
      setBookings(response.data);
    }catch(error){
      console.error(error);
    }
    finally{
      setLoading(false);
    }
  };


  const handleCancel = async(id)=>{
    try{
      await axios.patch(
        `http://127.0.0.1:5000/bookings/${id}/cancel`
      );
      fetchBookings();
    }catch(error){
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#0B1F6B] mb-8">
          My Bookings
        </h1>
        {
          loading ?
          <p>
            Loading bookings...
          </p>
          :
          bookings.length === 0 ?
          <div className="bg-white p-6 rounded-xl shadow">
            No bookings available
          </div>
          :
          <div className="space-y-5">
            {
              bookings.map((booking)=>(
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onCancel={handleCancel}

                />
              ))
            }
          </div>
        }
      </div>
    </div>
  );
}

export default MyBookings;