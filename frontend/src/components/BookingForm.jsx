function BookingForm({
  facilities,
  facility,
  setFacility,
  date,
  setDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  onSubmit,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-xl shadow-md p-6 space-y-5"
    >
      <div>
        <label className="block font-semibold mb-2">
          Facility
        </label>

        <select
          className="w-full border rounded-lg p-3"
          value={facility}
          onChange={(e) => setFacility(e.target.value)}
        >
          <option value="">Select Facility</option>

          {facilities.map((facility) => (
            <option
              key={facility.id}
              value={facility.id}
            >
              {facility.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-2">
          Booking Date
        </label>

        <input
          type="date"
          className="w-full border rounded-lg p-3"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-2">
            Start Time
          </label>

          <input
            type="time"
            className="w-full border rounded-lg p-3"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">
            End Time
          </label>

          <input
            type="time"
            className="w-full border rounded-lg p-3"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-[#2563EB] text-white py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Book Facility
      </button>
    </form>
  );
}

export default BookingForm;