import { CommentCard } from "./CommentSection.styled";
import SectionTitle from "../SectionTitle/SectionTitle";
import CommentForm from "../CommentForm/CommentForm";
import CommentList from "../CommentList/CommentList";
import { useData } from "@/lib/useData";
import { useSession } from "next-auth/react";
import Loading from "../Loading/Loading";
import FetchingError from "../FetchingError/FetchingError";

export default function CommentSection({ id }) {
  const { data: session } = useSession();
  const { addComment, fetchedComments } = useData();
  const { comments, isLoadingComments, errorComments, mutateComments } =
    fetchedComments;
  const userId = session?.user.id;

  if (isLoadingComments) {
    return <Loading />;
  }
  if (errorComments) {
    return <FetchingError />;
  }

  const sortedComments = comments
    ?.filter((comment) => comment.parentEventId === id)
    .sort((a, b) => {
      const dateA = new Date(a.creationDate);
      const dateB = new Date(b.creationDate);
      return dateB - dateA;
    });

  return (
    <section>
      <SectionTitle>
        {`${sortedComments.length} Kommentar${
          sortedComments.length === 1 ? "" : "e"
        }`}
      </SectionTitle>
      <CommentCard>
        {session ? (
          <CommentForm
            onPostComment={(comment) => addComment(id, comment, userId)}
          />
        ) : null}
        <CommentList
          comments={sortedComments}
          mutateComments={mutateComments}
        />
      </CommentCard>
    </section>
  );
}
