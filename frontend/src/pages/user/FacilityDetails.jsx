import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getFacilityById } from "../../services/facility";


function FacilityDetails() {

  const { id } = useParams();

  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  useEffect(() => {

    const fetchFacility = async () => {

      try {

        const data = await getFacilityById(id);

        setFacility(data);

      } catch (error) {

        setError("Failed to load facility details");

      } finally {

        setLoading(false);

      }

    };


    fetchFacility();

  }, [id]);



  if (loading) {

    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">

        <p className="text-gray-600">
          Loading facility...
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



  if (!facility) {

    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">

        <p className="text-gray-600">
          Facility not found
        </p>

      </div>
    );

  }



  return (

    <div className="min-h-screen bg-[#F8FAFC] p-6">


      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">


        <img
          src={facility.image}
          alt={facility.name}
          className="w-full h-72 object-cover"
        />


        <div className="p-6">


          <h1 className="text-3xl font-bold text-gray-800">
            {facility.name}
          </h1>


          <p className="text-gray-500 mt-2">
            {facility.category}
          </p>



          <div className="mt-6 space-y-3 text-gray-700">


            <p>
              <strong>Location:</strong> {facility.location}
            </p>


            <p>
              <strong>Capacity:</strong> {facility.capacity}
            </p>


            <p>
              <strong>Description:</strong> {facility.description}
            </p>


          </div>



          <div className="mt-6">

            <span
              className={`px-4 py-2 rounded-full font-medium ${
                facility.available
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >

              {facility.available
                ? "Available"
                : "Unavailable"}

            </span>

          </div>



          <button
            className="mt-8 bg-[#2563EB] text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Book Facility
          </button>


        </div>


      </div>


    </div>

  );

}


export default FacilityDetails;