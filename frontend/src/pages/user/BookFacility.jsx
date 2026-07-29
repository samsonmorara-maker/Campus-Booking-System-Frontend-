import { useState } from "react";

function BookFacility() {
  const [facility, setFacility] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6">
        Book a Facility
      </h1>
      <form className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">
            Facility
          </label>
          <select
            className="w-full border rounded-lg p-3"
            value={facility}
            onChange={(e) => setFacility(e.target.value)}
          >
            <option value="">Select Facility</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 font-medium">
            Date
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
            <label className="block mb-2 font-medium">
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
            <label className="block mb-2 font-medium">
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
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Book Facility
        </button>
      </form>
    </div>
  );
}

export default BookFacility;