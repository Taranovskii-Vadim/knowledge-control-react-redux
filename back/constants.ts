import { AuthController } from "./controllers/authController";
import { SkillsController } from "./controllers/skillsController";
import { requireAuth } from "./middleware";

const API_ENDPOINT = "/api";

export const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

export const COOKIE_KEY = `user_jwt`;

// TODO create interface for Routes later
export const ROUTES = [
  // Auth
  {
    method: "post",
    route: `${API_ENDPOINT}/auth/login`,
    controller: AuthController,
    middlewares: [],
    action: "login",
  },
  {
    method: "get",
    route: `${API_ENDPOINT}/auth/me`,
    controller: AuthController,
    middlewares: [requireAuth],
    action: "getUserInfo",
  },
  // Skills
  {
    method: "get",
    route: `${API_ENDPOINT}/skills`,
    controller: SkillsController,
    action: "getData",
    middlewares: [requireAuth],
  },
  {
    method: "post",
    route: `${API_ENDPOINT}/skills`,
    controller: SkillsController,
    action: "postData",
    middlewares: [requireAuth],
  },
  {
    method: "post",
    route: `${API_ENDPOINT}/skills/:skillId`,
    controller: SkillsController,
    action: "putSkillRate",
    middlewares: [requireAuth],
  },
];
