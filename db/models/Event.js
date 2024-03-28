import mongoose from "mongoose";
import "./Category";

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
  category: { type: Schema.Types.ObjectId, ref: "Category" },
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

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
