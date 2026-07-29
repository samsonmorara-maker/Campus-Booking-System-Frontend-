import { useEffect, useState } from "react";

import { getFacilities } from "../../services/facility";
import FacilityCard from "../../components/FacilityCard";


function Facilities() {

  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {

    const fetchFacilities = async () => {

      try {

        const data = await getFacilities();

        setFacilities(data);

      } catch (error) {

        setError("Failed to load facilities");

      } finally {

        setLoading(false);

      }

    };


    fetchFacilities();

  }, []);



  if (loading) {

    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">

        <p className="text-gray-600">
          Loading facilities...
        </p>

      </div>
    );

  }



  if (error) {

    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">

        <p className="text-red-500">
          {error}
        </p>

      </div>
    );

  }



  return (

    <div className="min-h-screen bg-[#F8FAFC] p-6">


      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Campus Facilities
        </h1>

        <p className="text-gray-600 mt-2">
          Browse available campus facilities
        </p>

      </div>



      {facilities.length === 0 ? (

        <div className="bg-white rounded-xl p-6 shadow">

          <p className="text-gray-500">
            No facilities available.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {facilities.map((facility) => (

            <FacilityCard
              key={facility.id}
              facility={facility}
            />

          ))}

        </div>

      )}


    </div>

  );

}


export default Facilities;