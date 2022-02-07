import { Request } from "express";

import { SkillModel } from "../models/skill";

export class SkillsController {
  async getData() {
    const skills = await SkillModel.find().sort({ updatedAt: -1 });

    return skills;
  }

  async postData(req: Request) {
    const { name, category } = req.body;
    const skill = new SkillModel({ name, category, rate: 0 });
    await skill.save();
    return { id: skill.id, creationAt: skill.updatedAt };
  }

  async putSkillRate(req: Request) {
    const { rate } = req.body;
    const { skillId } = req.params;
    const skill = await SkillModel.findById(skillId);
    skill.rate = rate;

    return await skill.save();
  }
}
