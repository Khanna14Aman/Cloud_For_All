const User = require("../models/usermodel");
const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const otp = require("otp-generator");

const verifyotp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const UserExist = await User.findOne({ email });
  if (UserExist) {
    console.log("1");
    const otpvalue = otp.generate();
    async function main() {
      const transporter = nodemailer.createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        auth: {
          user: process.env.email,
          pass: process.env.smtpkey,
        },
      });

      let info = await transporter.sendMail({
        from: '"OTP 👻" CLOUD_FOR_ALL@gmail.com', // sender address
        to: String(email), // list of receivers
        subject: "Hello ✔",
        text: otpvalue,
      });
    }
    main()
      .then(() => {
        console.log(otpvalue);
        res.json({ otp: otpvalue });
      })
      .catch((err) => {
        res.status(404);
        throw new Error(err);
      });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const verifyotpregister = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const UserExist = await User.findOne({ email });
  if (!UserExist) {
    console.log("1");
    const otpvalue = otp.generate();
    async function main() {
      const transporter = nodemailer.createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        auth: {
          user: process.env.email,
          pass: process.env.smtpkey,
        },
      });

      let info = await transporter.sendMail({
        from: '"OTP 👻" CLOUD_FOR_ALL@gmail.com', // sender address
        to: String(email), // list of receivers
        subject: "Hello ✔",
        text: otpvalue,
      });
      // console.log(otpvalue);
    }
    main()
      .then(() => {
        res.json({ otp: otpvalue });
      })
      .catch((err) => {
        res.status(404);
        throw new Error(err);
      });
  } else {
    res.status(404);
    throw new Error("User Already Have Account...");
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Provide full data");
  } else {
    const UserExist = await User.findOne({ email });
    if (UserExist) {
      UserExist.password = password;
      const user = await UserExist.save();
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
      });
    } else {
      res.status(400);
      throw new Error("User Not Found");
    }
  }
});

module.exports = { verifyotp, verifyotpregister, changePassword };
