const dotenv = require("dotenv");
const cloudinaryModule = require("cloudinary");

dotenv.config();
const cloudinary = cloudinaryModule.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDORDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDORDINARY_API_KRY,
  api_secret: process.env.CLOUDORDINARY_SECRET_KEY,
});

module.exports = cloudinary;