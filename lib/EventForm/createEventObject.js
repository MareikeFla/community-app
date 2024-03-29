export function createEventObject(formData, userID) {
  return {
    createdBy: userID,
    creationDate: formData.creationDate,
    eventName: formData.eventName,
    start: {
      date: formData.startDate,
      time: formData.startTime,
    },
    end: {
      date: formData.endDate,
      time: formData.endTime,
    },
    location: {
      city: formData.city,
      zip: formData.zip,
      street: formData.street,
      houseNumber: formData.houseNumber,
    },
    category: formData.category,
    organization: {
      organizationName: formData.organization,
      organizationContact: formData.contact,
    },
    costs: formData.costs,
    shortDescription: formData.shortDescription,
    longDescription: formData.longDescription,
    links: [
      {
        url: formData.linkURL,
        linkDescription: formData.linkDescription,
      },
    ],
  };
}
