const express = require("express");
const {
  verifyotp,
  verifyotpregister,
  changePassword,
} = require("../controllers/verifycontrollers");
const router = express.Router();

router.route("/verify").post(verifyotp);
router.route("/changepassword").post(changePassword);
router.route("/verifyotpregister").post(verifyotpregister);
module.exports = router;
