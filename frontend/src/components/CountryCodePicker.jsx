import React, { useState, useEffect } from "react";
import countryData from "./countryData.json"; // data explained below
import { ChevronDown, Search } from "lucide-react";

const CountryCodePicker = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(countryData.find(c => c.code === "IN"));
  const [isOpen, setIsOpen] = useState(false);

  const filteredCountries = countryData.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (country) => {
    console.log(country.name)
    setSelected(country);
    onSelect && onSelect(country);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative w-full max-w-xs">
      {/* Selected */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md flex items-center justify-between cursor-pointer bg-transparent dark:text-white "
      >
        <div className="flex items-center gap-2  border-gray-300 dark:border-gray-600 rounded px-4 py-2">
          
          <span>{selected.name}</span>
          <span className="text-sm dark:border-gray-600 text-gray-500 dark:text-white">({selected.dial_code})</span>
        </div>
        <ChevronDown className="w-4 h-4" />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md mt-2 shadow-lg max-h-60 overflow-y-auto">
          {/* Search Bar */}
          <div className="p-2 border-b dark:border-gray-600 flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search country"
              className="w-full bg-transparent outline-none text-sm text-gray-800 dark:text-white"
            />
          </div>

          {/* Country List */}
          {filteredCountries.map((country) => (
            <div
              key={country.code}
              onClick={() => handleSelect(country)}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex justify-between items-center"
            >
              <div className="flex items-center gap-2">
                <span>{country.name}</span>
              </div>
              <span className="text-sm text-gray-500">{country.dial_code}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryCodePicker;
