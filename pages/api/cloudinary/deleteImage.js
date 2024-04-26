import cloudinary from "cloudinary";

export default async function handler(request, response) {
  if (request.method !== "DELETE") {
    return response.status(405).json({ message: "Method Not Allowed" });
  }

  const { public_id } = request.body;

  try {
    cloudinary.v2.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
    });

    const result = await cloudinary.v2.uploader.destroy(public_id);
    response.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Error deleting image:", error);
    response
      .status(500)
      .json({ success: false, error: "Error deleting image" });
  }
}
