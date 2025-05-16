const LocationCard = ({ place }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      <img
        src={place.photo?.images.large.url || "/placeholder.jpg"}
        alt={place.name}
        className="w-full h-60 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold">{place.name}</h3>
        <p className="text-sm text-gray-600">{place.num_reviews} reviews</p>
        <p className="text-yellow-500">⭐ {place.rating}</p>
        <p className="text-sm mt-2 text-gray-700">{place.ranking}</p>
        {place.price_level && <p className="text-sm text-green-600">{place.price_level}</p>}
      </div>
    </div>
  );
};

export default LocationCard;
