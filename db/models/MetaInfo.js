import mongoose from "mongoose";

const { Schema } = mongoose;

const metainfoSchema = new Schema({
  lastFetch: String,
  isUpToDate: Boolean,
});

const Metainfo =
  mongoose.models.Metainfo || mongoose.model("Metainfo", metainfoSchema);

export default Metainfo;
