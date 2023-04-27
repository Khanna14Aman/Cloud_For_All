const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatmodel");
const User = require("../models/usermodel");

// fetch all one-to-one chat with particular user
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.json(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    const createdChat = await Chat.create(chatData);
    const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      "users",
      "-password"
    );
    res.json(FullChat);
  }
});

// fetch all chat I have done to everyone whether is goup or one-to-one chat
const fetchChats = asyncHandler(async (req, res) => {
  const results = Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 });
  const allChat = await User.populate(results, {
    path: "latestMessage.sender",
    select: "name pic email",
  });
  res.status(200).json(allChat);
});

module.exports = { fetchChats, accessChat };
