import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: { required: true, type: String },
    password: { required: true, type: String },
  },
  { versionKey: false }
);

userSchema.set("toJSON", {
  transform: function (doc, user) {
    user.id = user._id;
    delete user._id;
    return user;
  },
});

export const UserModel = model("user", userSchema);
