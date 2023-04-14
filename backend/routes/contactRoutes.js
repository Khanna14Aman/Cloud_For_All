const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  getContacts,
  createContact,
  deleteOneContact,
  deleteContact,
  updateDetails,
  updateNumber,
  getOneContact,
} = require("../controllers/contactcontrollers");
const router = express.Router();
router.route("/").get(protect, getContacts);
router.route("/:id").get(protect, getOneContact);
router.route("/create").post(protect, createContact);
router.route("/delete/:id/:contactid").delete(protect, deleteOneContact);
router.route("/delete/:id").delete(protect, deleteContact);
router.route("/update/:id").put(protect, updateDetails);
router.route("/update/:id/:contactid").put(protect, updateNumber);
module.exports = router;
