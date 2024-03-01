import { useRouter } from "next/router";

export default function DeleteEvenetButton({ id }) {
  const router = useRouter();

  async function handleDelete() {
    const response = await fetch(`/api/events/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      router.push("/");
    }
  }

  return (
    <>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </>
  );
}
