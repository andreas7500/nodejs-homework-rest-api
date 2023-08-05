const { Schema, model } = require("mongoose");
const { handleSaveError, handleUpdateValid } = require("./hooks");

const emailRegexp = require("./emailRegexp");

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },

    password: {
      type: String,
      minlength: 6,
      required: true,
    },

    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
    },
    avatarURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("findOneAndUpdate", handleUpdateValid);
userSchema.post("save", handleSaveError);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);
module.exports = { User };
