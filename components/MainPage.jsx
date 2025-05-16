"use client";
import { useState, useEffect } from "react";
import Header from "./Header";
import Filters from "./Filters";
import LocationCard from "./LocationCard";
import Spinner from "./Spinner";
import { fetchPlacesFromAPI } from "../utils/recordsFunctionsAPI";

const MainPage = () => {
  const [type, setType] = useState("hotels");
  const [rating, setRating] = useState("");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("New York");
  const [budget, setBudget] = useState("");

  const fetchPlaces = async () => {
  setLoading(true);
  const results = await fetchPlacesFromAPI(type, location); // fără rating, fără budget

 const budgetMapping = {
  "1": "$",
  "2": "$$",
  "3": "$$$"
};

const filtered = results.filter((place) => {
  const passesRating = rating ? Number(place.rating) >= Number(rating) : true;

  let passesBudget = true;
  if (budget) {
    if (!place.price_level) {
      passesBudget = false;
    } else {
      const firstLevel = place.price_level.split(" - ")[0].trim(); // ex: "$$"
      passesBudget = firstLevel === budgetMapping[budget];
    }
  }

  return passesRating && passesBudget;
});


  setPlaces(filtered);
  setLoading(false);
};


  useEffect(() => {
    fetchPlaces();
  }, [type, rating, location,budget]);


  return (
    <>
      <Header setLocation={setLocation} />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <Filters
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}
            budget={budget}
  setBudget={setBudget}
        />
        {loading ? (
          <Spinner />
        ) : (
          places.map((place, i) => <LocationCard key={i} place={place} />)
        )}
      </main>
    </>
  );
};

export default MainPage;
