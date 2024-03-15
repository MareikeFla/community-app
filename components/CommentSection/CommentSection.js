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
        creationDate: new Date(),
        text: data,
      }),
    });

    if (response.ok) {
      mutate(`/api/events/${id}`);
    }
  }

  const sortedComments = comments.sort((a, b) => {
    const dateA = new Date(a.creationDate);
    const dateB = new Date(b.creationDate);
    return dateB - dateA;
  });

  return (
    <section>
      <SectionTitle>
        {comments.length} {comments.length === 1 ? "Kommentar" : "Kommentare"}
      </SectionTitle>
      <CommentCard>
        <CommentForm onPostComment={handlePostComment} />
        <CommentList comments={sortedComments} />
      </CommentCard>
    </section>
  );
}
