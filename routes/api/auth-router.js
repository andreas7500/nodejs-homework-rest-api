const express = require("express");

const { validateBody } = require("../../decorators/index");

const ctrl = require("../../controllers/auth-controller/auth-controller");

const usersSchemas = require("../../schemas/users-schemas");

const { authenticate } = require("../../middlewares/index");

const authRouter = express.Router();

authRouter.post(
  "/signup",

  validateBody(usersSchemas.userSignupSchema),
  ctrl.signup
);

authRouter.post(
  "/signin",

  validateBody(usersSchemas.userSigninSchema),
  ctrl.signin
);

authRouter.get("/current", authenticate, ctrl.getCurrent);

authRouter.post("/signout", authenticate, ctrl.signout);

authRouter.patch(
  "/",
  authenticate,
  validateBody(usersSchemas.subscriptionSchema),
  ctrl.subscription
);

module.exports = authRouter;
