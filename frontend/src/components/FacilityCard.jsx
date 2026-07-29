function FacilityCard({ facility }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">

      <img
        src={facility.image}
        alt={facility.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">

        <h2 className="text-xl font-semibold text-gray-800">
          {facility.name}
        </h2>

        <p className="text-gray-500 mt-2">
          {facility.category}
        </p>

        <div className="mt-4 space-y-2 text-sm text-gray-600">

          <p>
            Location: {facility.location}
          </p>

          <p>
            Capacity: {facility.capacity}
          </p>

        </div>


        <div className="mt-4 flex justify-between items-center">

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              facility.available
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {facility.available ? "Available" : "Unavailable"}
          </span>


          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            View Details
          </button>

        </div>

      </div>

    </div>
  );
}

export default FacilityCard;