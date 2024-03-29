export default function enrichEventObject(event) {
  const eventObject = event.toObject();
  return {
    ...eventObject,
    isFreeOfCharge: eventObject.costs === "Kostenlos",
    isOnlineEvent:
      !eventObject.location.street &&
      !eventObject.location.houseNumber &&
      !eventObject.location.zip &&
      !eventObject.location.city,
  };
}
