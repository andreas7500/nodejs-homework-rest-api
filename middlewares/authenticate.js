const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers/index");
const { User } = require("../models/user");
const { ctrlWrapper } = require("../decorators/index");

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    //  next(HttpError(401));
    throw HttpError(401, "Not authorized");
    // return;
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      // next(HttpError(401));
      throw HttpError(401, "Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    // next(HttpError(401));
    throw HttpError(401, "Not authorized");
  }
};

module.exports = { authenticate: ctrlWrapper(authenticate) };
