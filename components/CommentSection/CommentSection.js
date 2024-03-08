import { mutate } from "swr";
import CommentForm from "../CommentForm/CommentForm";
import CommentList from "../CommentList/CommentList";
import { CommentCard } from "./CommentSection.styled";
import SectionHeader from "../SectionHeader/SectionHeader";
import { user } from "@/lib/user";

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
      <SectionHeader>
        {comments.length} {comments.length === 1 ? "Kommentar" : "Kommentare"}
      </SectionHeader>
      <CommentCard>
        <CommentForm onPostComment={handlePostComment} />
        <CommentList comments={comments} />
      </CommentCard>
    </section>
  );
}
