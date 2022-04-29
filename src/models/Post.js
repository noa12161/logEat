import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    image: {
      fileName: String,
      file: String,
    },
    tags: [String],
    user: {
      _id: mongoose.Types.ObjectId,
      username: String,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postSchema);

export default Post;
