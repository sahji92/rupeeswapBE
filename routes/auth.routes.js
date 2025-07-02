import { Router } from "express";
import {signupSendOtp,signupVerifyOtp,loginSendOtp,loginVerifyOtp, getUser} from '../controller/authController.js'
import authenticateToken from "../middlewares/authenticateToken.js";
const authRouter = Router();

authRouter.post('/signup/send-otp', signupSendOtp);
authRouter.post('/signup/verify-otp', signupVerifyOtp);
authRouter.post('/login/send-otp', loginSendOtp);
authRouter.post('/login/verify-otp', loginVerifyOtp);
authRouter.get('/get-user',authenticateToken, getUser);
authRouter.post("/sign-out", (req, res) => {
  res.send({ title: "signout" });
});

export default authRouter;
