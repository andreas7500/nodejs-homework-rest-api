const express = require("express");

const { validateBody } = require("../../decorators/index");

const ctrl = require("../../controllers/auth-controller/auth-controller");

const usersSchemas = require("../../schemas/users-schemas");

const { authenticate } = require("../../middlewares/index");

const authRouter = express.Router();

authRouter.post(
  "/register",

  validateBody(usersSchemas.userSignupSchema),
  ctrl.register
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

module.exports = authRouter;
