function BookingCard({ booking, onCancel }) {


  const statusColor = (status) => {

    switch(status){

      case "Approved":
        return "bg-[#22C55E]";

      case "Pending":
        return "bg-[#F59E0B]";

      case "Rejected":
      case "Cancelled":
        return "bg-[#EF4444]";

      default:
        return "bg-gray-400";

    }

  };


  return (

    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-[#0B1F6B]">
            {booking.facility?.name || "Facility"}
          </h2>
          <p className="text-gray-600 mt-3">
            <strong>Date:</strong> {booking.booking_date}
          </p>
          <p className="text-gray-600">
            <strong>Time:</strong> {booking.start_time} - {booking.end_time}
          </p>
        </div>
        <div>
          <span
          className={`
          text-white
          px-4 py-2 rounded-full text-sm
          ${statusColor(booking.status)}
          `}>
          {booking.status}
          </span>
        </div>
      </div>

      {
        booking.status === "Pending" &&
        <button
        onClick={()=>onCancel(booking.id)}
        className="mt-5 bg-[#EF4444] text-white px-5 py-2 rounded-lg hover:bg-red-600">
          Cancel Booking
        </button>
      }
    </div>
  );
}

export default BookingCard;