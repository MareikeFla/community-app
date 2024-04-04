export default function enrichEventObject(
  event,
  attendeeCount,
  eventAttendedByUser
) {
  const eventObject = event.toObject();
  return {
    ...eventObject,
    isAttendedByUser: eventAttendedByUser,
    attendeeCount: attendeeCount,
    isFreeOfCharge: eventObject.costs === "Kostenlos",
    isOnlineEvent:
      !eventObject.location.street &&
      !eventObject.location.houseNumber &&
      !eventObject.location.zip &&
      !eventObject.location.city,
  };
}
