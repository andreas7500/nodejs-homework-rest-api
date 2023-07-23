const { HttpError } = require("../helpers/index");

const isEmptyBody = (req, res, next) => {
  if (req.method === "PATCH") {
    const { length } = Object.keys(req.body);
    if (!length) {
      return res.status(400).json({ message: "missing field favorite" });
      // return next(HttpError(400, "missing field favorite"));
    }
  }

  const { length } = Object.keys(req.body);
  if (!length) {
    return next(HttpError(400, "missing fields"));
  }
  next();
};

module.exports = isEmptyBody;
