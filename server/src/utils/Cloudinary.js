import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: "avatars",
      resource_type: "image",
    });
    console.log("file uploaded to cloudinary: ", result);
    return result;
  } catch (error) {
    console.log("cloudinary upload error", error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};
