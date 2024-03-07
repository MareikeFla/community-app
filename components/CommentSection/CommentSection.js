import { mutate } from "swr";
import CommentForm from "../CommentForm/CommentForm";
import CommentList from "../CommentList/CommentList";
import { CommentCard } from "./CommentSection.styled";
import SectionHeader from "../SectionHeader/SectionHeader";

export default function CommentSection({ id, comments }) {
  async function handlePostComment(data) {
    //this is just a placeholder until we get users
    const sendData = {
      userName: "Jane Doe",
      userImageURL: "/assets/images/activism.jpg",
      text: data,
    };
    const response = await fetch(`/api/events/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    });

    if (response.ok) {
      mutate(`/api/events/${id}`);
    }
  }

  return (
    <section>
      <SectionHeader>{comments.length} Kommentare</SectionHeader>
      <CommentCard>
        <CommentForm onPostComment={handlePostComment} />
        <CommentList comments={comments} />
      </CommentCard>
    </section>
  );
}
