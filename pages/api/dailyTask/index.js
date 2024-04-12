// pages/api/dailyTask.js

export default async (req, res) => {
  if (req.method === "POST") {
    // Logic for POST request
    console.log("Running POST daily task");

    // Example of a function that could interact with MongoDB
    // await someDatabaseOperation();

    res.status(200).json({ message: "POST daily task completed" });
  } else if (req.method === "GET") {
    // Logic for GET request
    console.log("Running GET daily task");

    // You can perform read-only operations here, for example:
    // const data = await someDatabaseReadingOperation();

    res.status(200).json({
      message: "GET daily task completed",
      data: {
        /* some data */
      },
    });
  } else {
    // If the method is neither POST nor GET
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
