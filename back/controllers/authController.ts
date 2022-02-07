import { Request, Response } from "express";
import crypt from "bcryptjs";
import jwt from "jsonwebtoken";

// import { COOKIE_KEY, ONE_WEEK } from "../constants";
import { UserModel } from "../models/user";

export class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    let user = await UserModel.findOne({ email });

    if (user) {
      const isSamePassword = await crypt.compare(password, user.password);
      if (!isSamePassword) {
        res.status(401).send("Incorrect credentials");
        return;
      }
    }

    if (!user) {
      const hashedPassword = await crypt.hash(password, 10);
      user = new UserModel({ email, password: hashedPassword });
      await user.save();
    }

    const token = jwt.sign(user.toObject(), process.env.JWT_SECRET || "secret");

    // res.cookie(COOKIE_KEY, token, { maxAge: ONE_WEEK, httpOnly: true });

    return token;
  }

  async getUserInfo(req: Request, res: Response) {
    const { token } = req.headers;
    if (token) {
      const { _id, email }: any = jwt.decode(token as string);
      return { id: _id, email };
    }

    return res.sendStatus(500);
  }
}
