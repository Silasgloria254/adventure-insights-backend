import mongoose from "mongoose";

const articlesSchema = mongoose.Schema({
  title: { type: String, required :true,unique:true },
  location:{type:String},
  description: { type: String, required :true},
  placestovisit: { type: Array },
  hotels: { type: Array},
  uid:{type:String}
});

export default  mongoose.model("Article",articlesSchema)