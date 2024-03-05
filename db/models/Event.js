import mongoose from "mongoose";

const { Schema } = mongoose;

const eventSchema = new Schema({
  eventName: String,
  start: {
    date: String,
    time: String,
  },
  end: {
    date: String,
    time: String,
  },
  location: {
    city: String,
    zip: String,
    street: String,
    houseNumber: String,
    country: String,
  },
  category: String,
  organization: {
    organizationName: String,
    organizationContact: String,
  },
  costs: String,
  shortDescription: String,
  longDescription: String,
  image: {
    src: String,
    alt: String,
  },
  links: [
    {
      url: String,
      linkDescription: String,
    },
  ],
});

eventSchema.index({
  eventName: "text",
  "location.city": "text",
  "location.street": "text",
  "location.country": "text",
  "location.zip": "text",
  category: "text",
  "organization.organizationName": "text",
  costs: "text",
  shortDescription: "text",
  longDescription: "text",
  "links.linkDescription": "text",
  "start.date": "text",
  "end.date": "text",
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
