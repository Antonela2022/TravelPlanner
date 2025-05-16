import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const { type = "restaurants", location = "New York" } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db();

    // Căutăm în cache
    const cache = await db.collection("locationsCache").findOne({ type, location });

    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    if (cache && cache.data?.length > 0 && cache.fetchedAt > twentyFourHoursAgo) {
      console.log("Using cached data < 24h");
      return res.status(200).json({ data: cache.data });
    }

    // Dacă nu e în cache sau e expirat
    const geoRes = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${process.env.OPENCAGE_API_KEY}`);
    const geoData = await geoRes.json();

    if (!geoData.results?.length) {
      return res.status(404).json({ error: "Location not found" });
    }

    const { lat, lng } = geoData.results[0].geometry;
    const radius = 0.05
    const bl_latitude = lat - radius;
    const tr_latitude = lat + radius;
    const bl_longitude = lng - radius;
    const tr_longitude = lng + radius;

    const url = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary?bl_latitude=${bl_latitude}&tr_latitude=${tr_latitude}&bl_longitude=${bl_longitude}&tr_longitude=${tr_longitude}&limit=30&currency=USD&subcategory=hotel%2Cbb%2Cspecialty&adults=1`;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    };

    const response = await fetch(url, options);
    const json = await response.json();
    const results = json.data || [];

    // Înlocuim sau inserăm cache-ul actualizat
    await db.collection("locationsCache").updateOne(
      { type, location },
      {
        $set: {
          fetchedAt: new Date(),
          data: results,
        },
      },
      { upsert: true }
    );

    res.status(200).json({ data: results });
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
