import mongoose from "mongoose";
import "./Category";
import "./User";

const { Schema } = mongoose;

const eventSchema = new Schema({
  isFetchedEvent: Boolean,
  fetchedId: String,
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
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
    latitude: String,
    longitude: String,
  },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  subCategories: [
    { type: Schema.Types.ObjectId, ref: "Category.subCategories" },
  ],
  organization: {
    organizationName: String,
    organizationContact: String,
  },
  costs: String,
  shortDescription: String,
  longDescription: String,
  image: {
    type: new Schema({
      url: String,
    }),
  },
  links: [
    {
      url: String,
      linkDescription: String,
    },
  ],
  a11yIcons: [{ type: Schema.Types.ObjectId, ref: "A11yIcon" }],
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
