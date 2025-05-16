export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Missing query" });
  }

  try {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${process.env.OPENCAGE_API_KEY}&limit=5&language=en`;

    const response = await fetch(url);
    const data = await response.json();

    const suggestions = data.results.map((result) => ({
      formatted: result.formatted,
      geometry: result.geometry,
    }));

    res.status(200).json(suggestions);
  } catch (error) {
    console.error("Autocomplete error:", error);
    res.status(500).json({ error: "Autocomplete failed" });
  }
}
