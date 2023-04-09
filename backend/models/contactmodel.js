const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phonenumber: [
    {
      number: {
        type: Number,
      },
    },
  ],
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  designation: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});
const MyContact = mongoose.model("MyContact", contactSchema);
module.exports = MyContact;
