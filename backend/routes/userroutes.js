const express = require("express");
const {
  registeruser,
  authUser,
  updateUserProfile,
} = require("../controllers/usercontrollers");
const protect = require("../middleware/authMiddleware");

const router = express.Router();
router.route("/").post(registeruser);
router.route("/login").post(authUser);
router.route("/profile").post(protect, updateUserProfile);

module.exports = router;
