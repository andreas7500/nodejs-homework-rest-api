const express = require("express");

const { validateBody } = require("../../decorators/index");

const ctrl = require("../../controllers/auth-controller/auth-controller");

const usersSchemas = require("../../schemas/users-schemas");

const { authenticate, upload } = require("../../middlewares/index");

const authRouter = express.Router();

authRouter.post(
  "/register",

  validateBody(usersSchemas.userSignupSchema),
  ctrl.register
);

authRouter.get("/verify/:verificationToken", ctrl.verifyEmailUser);
authRouter.post(
  "/verify",
  validateBody(usersSchemas.emailSchema),
  ctrl.resendVerifyEmail
);

authRouter.post(
  "/login",

  validateBody(usersSchemas.userSigninSchema),
  ctrl.login
);

authRouter.get("/current", authenticate, ctrl.getCurrent);

authRouter.post("/logout", authenticate, ctrl.logout);

authRouter.patch(
  "/",
  authenticate,
  validateBody(usersSchemas.subscriptionSchema),
  ctrl.subscription
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = authRouter;
