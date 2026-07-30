import { useState } from "react";

import SearchBar from "../../components/SearchBar";
import FacilityCard from "../../components/FacilityCard";

import { searchFacilities } from "../../services/facility";


function SearchFacilities() {

  const [facilities, setFacilities] = useState([]);

  const [searched, setSearched] = useState(false);



  const handleSearch = async (query) => {

    if (!query.trim()) {
      return;
    }


    const results = await searchFacilities(query);

    setFacilities(results);

    setSearched(true);

  };



  return (

    <div className="min-h-screen bg-[#F8FAFC] p-6">


      <div className="max-w-6xl mx-auto">


        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Search Facilities
        </h1>


        <SearchBar onSearch={handleSearch} />



        {searched && facilities.length === 0 && (

          <div className="bg-white p-6 rounded-xl shadow">

            <p className="text-gray-500">
              No facilities found.
            </p>

          </div>

        )}



        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


          {facilities.map((facility) => (

            <FacilityCard
              key={facility.id}
              facility={facility}
            />

          ))}


        </div>


      </div>


    </div>

  );

}


export default SearchFacilities;