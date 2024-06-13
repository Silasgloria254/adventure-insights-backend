import mongoose from "mongoose";

const companySchema = mongoose.Schema({
  logo:{type: String, required:true},
  name: { type: String, required :true,unique:true },
  location:{type:String},
  description: { type: String, required :true},
  
});

export default  mongoose.model("Company",companySchema)