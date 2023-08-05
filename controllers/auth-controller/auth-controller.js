const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models/user");
const ctrlWrapper = require("../../decorators/ctrlWrapper");
const { HttpError } = require("../../helpers");
const Jimp = require("jimp");

dotenv.config();
const { JWT_SECRET } = process.env;

const avatarsPath = path.join(__dirname, "../../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      // avatarURL: newUser.avatarURL,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23d" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const subscription = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ subscription: result.subscription });
};

const updateAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { path: oldPath, filename } = req.file;

    const image = await Jimp.read(oldPath);
    await image.autocrop().cover(250, 250).writeAsync(oldPath);

    const newPath = path.join(avatarsPath, filename);

    await fs.rename(oldPath, newPath);
    const avatarURL = path.join("avatars", filename);
    const result = await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({ avatarURL: result.avatarURL });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  subscription: ctrlWrapper(subscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
