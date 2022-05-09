import "dotenv/config";

import cloudinaryy from "cloudinary";

const cloudinary = cloudinaryy.v2;

// console.log(cloudinary);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export default cloudinary;
