const User = require("../models/usermodel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

const registeruser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  // console.log("here");
  const Email = email.toLowerCase();
  const ifExist = await User.findOne({
    email: Email,
  });
  if (ifExist) {
    res.status(400);
    throw new Error("This account is already registered");
  }

  const user = await User.create({
    name,
    email: Email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("something wrong");
  }
});

const authUser = asyncHandler(async (req, res) => {
  var { email, password } = req.body;
  email = email.toLowerCase();
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("wrong email or password");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    if (req.body.email) {
      const Email = req.body.email.toLowerCase();
      const ifExist = await User.findOne({ email: Email });
      if (ifExist) {
        if (ifExist._id.toString() !== req.user._id.toString()) {
          res.status(400);
          throw new Error("This email is already registered");
        }
      }
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email.toLowerCase() || user.email;
    user.pic = req.body.pic || user.pic;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword)
    .select("-password")
    .find({ _id: { $ne: req.user._id } });
  res.json(users);
});

module.exports = {
  registeruser,
  authUser,
  updateUserProfile,
  allUsers,
};
