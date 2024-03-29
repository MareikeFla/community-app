import { CommentCard } from "./CommentSection.styled";
import SectionTitle from "../SectionTitle/SectionTitle";
import CommentForm from "../CommentForm/CommentForm";
import CommentList from "../CommentList/CommentList";
import { useData } from "@/lib/useData";

export default function CommentSection({ id, comments, mutateEvent }) {
  const { addComment } = useData();

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
        <CommentForm
          onPostComment={(comment) => addComment(id, comment, mutateEvent)}
        />
        <CommentList comments={sortedComments} mutateEvent={mutateEvent} />
      </CommentCard>
    </section>
  );
}
