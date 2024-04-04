import { CommentCard } from "./CommentSection.styled";
import SectionTitle from "../SectionTitle/SectionTitle";
import CommentForm from "../CommentForm/CommentForm";
import CommentList from "../CommentList/CommentList";
import { useData } from "@/lib/useData";
import { useSession } from "next-auth/react";

export default function CommentSection({ id }) {
  const { data: session } = useSession();
  const { addComment, fetchedComments } = useData();
  const userId = session?.user.id;

  const sortedComments = fetchedComments?.comments
    ?.filter((comment) => comment.parentEventId === id)
    .sort((a, b) => {
      const dateA = new Date(a.creationDate);
      const dateB = new Date(b.creationDate);
      return dateB - dateA;
    });

  console.log("comments", sortedComments);

  return (
    <section>
      <SectionTitle>
        {fetchedComments.length}{" "}
        {fetchedComments.length === 1 ? "Kommentar" : "Kommentare"}
      </SectionTitle>
      <CommentCard>
        {session ? (
          <CommentForm
            onPostComment={(comment) => addComment(id, comment, userId)}
          />
        ) : null}
        <CommentList
          comments={sortedComments}
          mutateComments={fetchedComments.mutateComments}
        />
      </CommentCard>
    </section>
  );
}
