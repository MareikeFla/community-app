export default async (req, res) => {
  if (req.method === "POST") {
    // Your function logic here, e.g., interacting with MongoDB
    console.log("Running daily task");

    // Respond to the request
    res.status(200).json({ message: "Daily task completed" });
  } else {
    // Not allowed method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
