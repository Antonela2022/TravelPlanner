import { useState, useEffect } from "react";

export function useAutocomplete(query) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(`/api/autocomplete?query=${query}`);
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error("Failed to fetch autocomplete:", err);
        setSuggestions([]);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300); // debounce

    return () => clearTimeout(timeoutId);
  }, [query]);

  return suggestions;
}
