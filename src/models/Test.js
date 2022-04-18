import mongoose from "mongoose";

const Schema = mongoose.Schema;

const testSchema = new Schema({
  name: String,
});

const Test = mongoose.model("test", testSchema);

export default Test;
