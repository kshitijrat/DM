import React, { useState } from "react";

const SearchBar = ({ onLocationFound,  placeholder_input = "Enter Country Name"  }) => {
  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    // Pass input directly as countryName string
    onLocationFound(input.trim());
  };

  return (
    <form onSubmit={handleSearch} className="w-full flex justify-center mb-6">
      <input
        type="text"
        placeholder={placeholder_input}
        className="w-full max-w-3xl px-4 py-2 border rounded-1-md focus:outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
