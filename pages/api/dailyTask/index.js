// pages/api/dailyTask.js
import User from "@/db/models/User";
export default async (req, res) => {
  if (req.method === "POST") {
    try {
      // Assuming 'User.create' is a valid operation and 'User' is correctly imported and set up
      await User.create({ name: "test", email: "sss", image: "ddd" });
      res.status(201).json({ status: "User created" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    console.log("Running GET daily task");
    // Example GET logic
    res.status(200).json({
      message: "GET daily task completed",
      data: {
        // Example data
      },
    });
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
