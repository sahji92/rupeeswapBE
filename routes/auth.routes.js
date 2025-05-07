import { Router } from "express";

const authRouter = Router();

authRouter.post("/sign-up", (req, res) => {
  res.send({ title: "signup" });
});
authRouter.post("/sign-in", (req, res) => {
  res.send({ title: "signin" });
});
authRouter.post("/sign-out", (req, res) => {
  res.send({ title: "signout" });
});

export default authRouter;
