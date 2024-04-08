import { CommentCard } from "./CommentSection.styled";
import SectionTitle from "../SectionTitle/SectionTitle";
import CommentForm from "../CommentForm/CommentForm";
import CommentList from "../CommentList/CommentList";
import { useData } from "@/lib/useData";

export default function CommentSection({ id, comments }) {
  const { addComment, fetchedComments } = useData();
  const eventComments = fetchedComments.comments.filter(
    (comment) => comment.parentEventId === id
  );
  const sortedComments = eventComments.sort((a, b) => {
    const dateA = new Date(a.creationDate);
    const dateB = new Date(b.creationDate);
    return dateB - dateA;
  });

  return (
    <section>
      <SectionTitle>
        {comments && comments.length > 0
          ? `${comments.length} ${
              comments.length === 1 ? "Kommentar" : "Kommentare"
            }`
          : "Kommentare"}
      </SectionTitle>
      <CommentCard>
        <CommentForm onPostComment={(comment) => addComment(id, comment)} />
        <CommentList
          comments={sortedComments}
          mutateComments={fetchedComments.mutateComments}
        />
      </CommentCard>
    </section>
  );
}
