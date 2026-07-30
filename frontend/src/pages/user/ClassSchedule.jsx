import { useEffect, useState } from "react";
import axios from "axios";
import ScheduleTable from "../../components/ScheduleTable";


function ClassSchedule(){
const [schedules,setSchedules]=useState([]);
const [day,setDay]=useState("");
const [facility,setFacility]=useState("");

useEffect(()=>{
fetchSchedules();
},[]);

const fetchSchedules=async()=>{
try{
const response = await axios.get(
"https://campus-booking-system-backend.onrender.com/schedules"
);
setSchedules(response.data);
}catch(error){
console.error(error);
}
};
const filterSchedules=async()=>{
try{
const response=await axios.get(
"https://campus-booking-system-backend.onrender.com/schedules/filter",
{
params:{
day:day,
facility_id:facility
}
}
);

setSchedules(response.data);
}catch(error){
console.error(error);
}

};

return(
<div className="min-h-screen bg-[#F8FAFC] p-8">
<div className="max-w-5xl mx-auto">
<h1 className="text-3xl font-bold text-[#0B1F6B] mb-8">
Class Schedule
</h1>

<div className="bg-white p-5 rounded-xl shadow mb-6 grid grid-cols-2 gap-4">
<select

className="border p-3 rounded"

value={day}

onChange={(e)=>setDay(e.target.value)}

>

<option value="">
Select Day
</option>

<option>
Monday
</option>

<option>
Tuesday
</option>

<option>
Wednesday
</option>

<option>
Thursday
</option>

<option>
Friday
</option>


</select>



<select

className="border p-3 rounded"

value={facility}

onChange={(e)=>setFacility(e.target.value)}

>


<option value="">
Select Facility
</option>


<option value="1">
Computer Lab
</option>


<option value="2">
Gym
</option>


</select>



<button
onClick={filterSchedules}
className="bg-[#2563EB] text-white rounded px-5">
Filter
</button>
</div>
<ScheduleTable
schedules={schedules}/>
</div>
</div>
);
}
export default ClassSchedule;