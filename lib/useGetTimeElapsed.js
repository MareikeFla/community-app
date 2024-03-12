export function useGetTimeElapsed(originalDate) {
  const timeComment = new Date(originalDate);
  const timeNow = new Date();
  const timeSinceComment = timeNow - timeComment;
  const timeCommentFormatted = timeComment.toLocaleDateString("de-de", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  function formatDate(difference) {
    const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    switch (true) {
      case seconds < 60 && minutes === 0 && hours === 0 && days === 0:
        return `gerade eben`;
      case minutes === 1 && hours === 0 && days === 0:
        return `vor ${minutes} Minute`;
      case minutes <= 59 && hours === 0 && days === 0:
        return `vor ${minutes} Minuten`;
      case hours === 1 && days === 0:
        return `vor ${hours} Stunde`;
      case hours > 1 && hours <= 23 && days === 0:
        return `vor ${hours} Stunden`;
      case days === 1:
        return `vor ${days} Tag`;
      case days > 1 && days < 7:
        return `vor ${days} Tagen`;
      case weeks === 1:
        return `vor ${weeks} Woche`;
      default:
        return timeCommentFormatted;
    }
  }

  const timeElapsed = formatDate(timeSinceComment);

  return timeElapsed;
}
