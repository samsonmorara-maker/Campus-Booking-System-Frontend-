import { useState } from "react";


function SearchBar({ onSearch }) {

  const [query, setQuery] = useState("");


  const handleSubmit = (event) => {

    event.preventDefault();

    onSearch(query);

  };


  return (

    <form
      onSubmit={handleSubmit}
      className="flex gap-3 mb-8"
    >

      <input
        type="text"
        placeholder="Search facilities..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />


      <button
        type="submit"
        className="bg-[#2563EB] text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Search
      </button>


    </form>

  );

}


export default SearchBar;