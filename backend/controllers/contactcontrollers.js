const MyContact = require("../models/contactmodel");

const asyncHandler = require("express-async-handler");

const getContacts = asyncHandler(async (req, res) => {
  const mycontacts = await MyContact.find({ user: req.user._id });
  res.json(mycontacts);
});

const createContact = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const phonenum = req.body.number;
  if (!phonenum || !name) {
    res.status(400);
    throw new Error("Please provide full data");
  } else {
    const findcontact = await MyContact.find({
      name: name,
      user: req.user._id,
    });
    // console.log(findcontact);
    if (findcontact.length < 1) {
      // console.log("1");
      const contact = new MyContact({
        user: req.user._id,
        name: name,
        city: req.body.city || "",
        state: req.body.state || "",
        country: req.body.country || "",
        designation: req.body.designation || "",
      });
      contact.phonenumber = contact.phonenumber.concat({ number: phonenum });
      const createContact = await contact.save();
      res.json(createContact);
    } else {
      // console.log(2);
      findcontact[0].phonenumber = findcontact[0].phonenumber.concat({
        number: phonenum,
      });
      const createContact = await findcontact[0].save();
      res.json(createContact);
    }
  }
});
const deleteOneContact = asyncHandler(async (req, res) => {
  const Contact = await MyContact.findById(req.params.id);
  if (Contact && Contact.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You Cannot Perform this operation");
  } else {
    if (Contact) {
      Contact.phonenumber = Contact.phonenumber.filter((value) => {
        return value._id.toString() !== req.params.contactid.toString();
      });
      if (Contact.phonenumber.length == 0) {
        await Contact.remove();
        res.json({ message: "No Contact Exist" });
      }
      const deleteonecontact = await Contact.save();
      res.json(deleteonecontact);
    } else {
      res.status(404);
      throw new Error("Contact Not Found");
    }
  }
});
const deleteContact = asyncHandler(async (req, res) => {
  const Contact = await MyContact.findById(req.params.id);
  if (Contact && Contact.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You Cannot perform this delete operation");
  } else {
    if (Contact) {
      await Contact.remove();
      res.json({ message: "Contact deleted" });
    } else {
      res.status(404);
      throw new Error("Contact Not found");
    }
  }
});

const updateDetails = asyncHandler(async (req, res) => {
  const ContactDetails = await MyContact.findById(req.params.id);
  if (
    ContactDetails &&
    ContactDetails.user.toString() !== req.user._id.toString()
  ) {
    throw new Error("You Cannot Perform This Operation");
  } else {
    if (ContactDetails) {
      if (ContactDetails.name !== req.body.name) {
        const check = await MyContact.find({
          name: req.body.name,
          user: req.user._id,
        });
        if (check.length > 0) {
          throw new Error(
            "You cannot update name because this name is already in use"
          );
        }
      }
      ContactDetails.name = req.body.name || ContactDetails.name;
      ContactDetails.state = req.body.state || ContactDetails.state;
      ContactDetails.city = req.body.city || ContactDetails.city;
      ContactDetails.country = req.body.country || ContactDetails.country;
      ContactDetails.designation =
        req.body.designation || ContactDetails.designation;
      const UpdatedDetails = await ContactDetails.save();
      res.json(UpdatedDetails);
    } else {
      res.status(404);
      throw new Error("No Contact Found");
    }
  }
});

const updateNumber = asyncHandler(async (req, res) => {
  const Contact = await MyContact.findById(req.params.id);
  if (Contact && Contact.user.toString() !== req.user._id.toString()) {
    throw new Error("You Cannot Perform This Operation");
  } else {
    if (Contact) {
      for (var i = 0; i < Contact.phonenumber.length; i++) {
        if (
          Contact.phonenumber[i]._id.toString() ===
          req.params.contactid.toString()
        ) {
          Contact.phonenumber[i].number =
            req.body.number || Contact.phonenumber[i].number;
        }
      }
      const UpdatedNumber = await Contact.save();
      res.json(UpdatedNumber);
    } else {
      res.status(404);
      throw new Error("No Contact Found");
    }
  }
});

module.exports = {
  getContacts,
  createContact,
  deleteOneContact,
  deleteContact,
  updateDetails,
  updateNumber,
};
