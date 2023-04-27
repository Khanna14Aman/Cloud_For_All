const express = require("express");
const {
  registeruser,
  authUser,
  updateUserProfile,
  allUsers,
} = require("../controllers/usercontrollers");
const protect = require("../middleware/authMiddleware");

const router = express.Router();
router.route("/").post(registeruser);
router.route("/login").post(authUser);
router.route("/profile").put(protect, updateUserProfile);
router.route("/getalluser").get(protect, allUsers);
module.exports = router;
