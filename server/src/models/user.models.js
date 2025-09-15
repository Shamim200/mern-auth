import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// User Schema
const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      min: [3, "please add at least 3 characters"],
      max: 20,
    },
    username: {
      type: String,
      trim: true,
      lowercase: true,
      min: [3, "please add at least 3 characters"],
      max: 20,
    },
    email: {
      type: String,
      required: true,

      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: true,
      min: [8, "please add at least 8 characters"],
      max: 20,
    },
    avatar: {
      type: String, // from local server
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// hash password before saving to DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//jwt access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    }
  );
};
// jwt refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
    }
  );
};

const User = mongoose.model("User", userSchema);

export default User;
