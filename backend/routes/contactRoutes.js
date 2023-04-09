const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  getContacts,
  createContact,
  deleteOneContact,
  deleteContact,
  updateDetails,
  updateNumber,
} = require("../controllers/contactcontrollers");
const router = express.Router();
router.route("/").get(protect, getContacts);
router.route("/create").post(protect, createContact);
router.route("/delete/:id/:contactid").post(protect, deleteOneContact);
router.route("/delete/:id").post(protect, deleteContact);
router.route("/update/:id").post(protect, updateDetails);
router.route("/update/:id/:contactid").post(protect, updateNumber);
module.exports = router;
