const express = require("express");
const { fetchChats, accessChat } = require("../controllers/chatcontrollers");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);

module.exports = router;
