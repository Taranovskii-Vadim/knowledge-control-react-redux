import { Schema, model } from "mongoose";

const skillSchema = new Schema(
  {
    name: { required: true, type: String },
    rate: { required: true, type: Number },
    category: { required: true, type: String },
  },
  { versionKey: false, timestamps: true }
);

skillSchema.set("toJSON", {
  transform: function (doc, skill) {
    skill.id = skill._id;
    delete skill._id;
    return skill;
  },
});

export const SkillModel = model("skill", skillSchema);
