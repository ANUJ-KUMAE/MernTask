require('dotenv').config()
const cloudinary  = require("cloudinary").v2;


cloudinary.config({
  cloud_name: process.env.CLOUDORDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDORDINARY_API_KRY,
  api_secret: process.env.CLOUDORDINARY_SECRET_KEY,
});

module.exports = cloudinary;