async function deleteImageFromCloudinary(public_id) {
  try {
    const response = await fetch("/api/cloudinary/deleteImage", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_id }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete image");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    throw error;
  }
}

export default deleteImageFromCloudinary;
