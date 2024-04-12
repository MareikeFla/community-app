// pages/api/dailyTask.js

export default async (req, res) => {
  if (request.method === "POST") {
    try {
      await User.create({ name: "test" });
      response.status(201).json({ status: "User created" });
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: error.message });
    }
  }
  if (req.method === "GET") {
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
