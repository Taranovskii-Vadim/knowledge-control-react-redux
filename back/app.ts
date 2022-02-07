import express, { Request, Response } from "express";
import { compose } from "compose-middleware";
import cors from "cors";

import { ROUTES } from "./constants";

const app = express();

// Connect middlewares
app.use(cors());
app.use(express.json());

ROUTES.forEach(({ method, route, controller, middlewares, action }) => {
  const handler = (req: Request, res: Response, next: Function) => {
    const result = new (controller as any)()[action](req, res, next);

    if (result instanceof Promise) {
      result.then((result) =>
        result !== null && result !== undefined
          ? res.send({ d: { result } })
          : undefined
      );
    } else if (result !== null && result !== undefined) {
      res.json({ d: { result } });
    }
  };

  (app as any)[method](route, compose(middlewares as any), handler);
});

export default app;
