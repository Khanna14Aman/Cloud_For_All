const express = require("express");
const {
  accessChat,
  accessChatDeveloper,
} = require("../controllers/chatcontrollers");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
router.route("/").post(protect, accessChat);
router.route("/developer").get(protect, accessChatDeveloper);

module.exports = router;
