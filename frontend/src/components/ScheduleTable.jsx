function ScheduleTable({ schedules }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-[#0B1F6B] text-white">
          <tr>
            <th className="p-4 text-left">
              Course
            </th>
            <th className="p-4 text-left">
              Lecturer
            </th>
            <th className="p-4 text-left">
              Day
            </th>
            <th className="p-4 text-left">
              Time
            </th>
            <th className="p-4 text-left">
              Facility
            </th>
          </tr>
        </thead>
        <tbody>


        {schedules.map((schedule)=>(
            <tr
            key={schedule.id}
            className="border-b"
            >
              <td className="p-4">
                {schedule.course_name}
              </td>
              <td className="p-4">
                {schedule.lecturer}
              </td>
              <td className="p-4">
                {schedule.day}
              </td>
              <td className="p-4">
                {schedule.start_time} - {schedule.end_time}
              </td>
              <td className="p-4">
                {schedule.facility?.name || "Facility"}
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  );
}

export default ScheduleTable;