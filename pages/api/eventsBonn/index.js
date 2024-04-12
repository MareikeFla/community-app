export default async function handler(req, res) {
  const url = "https://www.bonn.de/citykey/events-json.php";

  try {
    const apiResponse = await fetch(url);
    const data = await apiResponse.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
