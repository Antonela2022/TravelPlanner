import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import AuthButton from "./AuthButton";
import { useState } from "react";
import { useAutocomplete } from "../lib/hooks/useAutocomplete";

const Header = ({ setLocation }) => {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestions = useAutocomplete(searchTerm);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      setLocation(searchTerm.trim());
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchTerm(suggestion);
    setLocation(suggestion);
    setShowSuggestions(false);
  };

  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        <span className="text-2xl font-bold text-blue-600">TravelPlanner</span>
      </div>

      <div className="flex items-center gap-6 flex-wrap justify-end flex-grow">
        <Link href="/favorites" className="text-gray-700 hover:text-blue-500">
          Favorites
        </Link>
        <span className="text-gray-700">Explore new places</span>

        <form onSubmit={handleSearch} className="w-full max-w-xs">
          <label htmlFor="default-search" className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search places...(Ex: New York, US)"
              required
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {suggestions.map((s, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectSuggestion(s.formatted)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {s.formatted}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </form>

        <AuthButton />
      </div>
    </header>
  );
};

export default Header;
