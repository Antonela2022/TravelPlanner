export const fetchPlacesFromAPI = async (type, location, rating) => {
  try {
    const res = await fetch(`/api/places?type=${type}&location=${location}`);
    const data = await res.json();

    // Ensure data.data exists before filtering
    if (!data.data) {
      return [];
    }

    const filtered = data.data.filter(
      (place) => !rating || Number(place.rating) >= Number(rating)
    );

    return filtered;
  } catch (err) {
    console.error("Failed to fetch places:", err);
    return [];
  }
};