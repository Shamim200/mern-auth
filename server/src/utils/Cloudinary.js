import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const result = cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });
    console.log("upload file on cloudinary successfully: ", result);
    return result;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove file from local uploads folder
    return null;
  }
};
