import mongoose from "mongoose";

const articlesSchema = mongoose.Schema({
  coverImg: {type:String, required:true},
  title: { type: String, required: true, unique: true },
  location: { type: String },
  description: { type: String, required: true },
  placestovisit: { type: Array },
  hotels: { type: Array },
  images: { type: Array },
  uid: { type: String },
});

export default mongoose.model("Article", articlesSchema);
