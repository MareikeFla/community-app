export default async function deleteImageKeyFromDB(id) {
  const response = await fetch(`/api/events/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  });
}
