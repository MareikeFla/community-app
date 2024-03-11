import { mutate } from "swr";
import { user } from "@/lib/user";
import { CommentCard } from "./CommentSection.styled";
import SectionTitle from "../SectionTitle/SectionTitle";
import CommentForm from "../CommentForm/CommentForm";
import CommentList from "../CommentList/CommentList";

export default function CommentSection({ id, comments }) {
  async function handlePostComment(data) {
    const response = await fetch(`/api/events/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user,
        text: data,
      }),
    });

    if (response.ok) {
      mutate(`/api/events/${id}`);
    }
  }

  return (
    <section>
      <SectionTitle>
        {comments.length} {comments.length === 1 ? "Kommentar" : "Kommentare"}
      </SectionTitle>
      <CommentCard>
        <CommentForm onPostComment={handlePostComment} />
        <CommentList comments={comments} />
      </CommentCard>
    </section>
  );
}
