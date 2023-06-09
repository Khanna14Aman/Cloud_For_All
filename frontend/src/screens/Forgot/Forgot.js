import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../cssfile/Forgot.css";
import ErrorMessage from "../../components/Error/Error";
import MainScreen from "../../components/MainScreen/MainScreen";

const Forgot = () => {
  const [email, setemail] = useState("");
  const [otp, setotp] = useState();
  const [password, setpassword] = useState("");
  const [beforeemail, setbefore] = useState("");
  const [timesend, settimesend] = useState();
  const [recievedotp, setrecievedotp] = useState();
  const [emailMessage, setemailMessage] = useState("");
  const [otpMessage, setotpMessage] = useState("");
  const [timeSubmit, setTimeMessage] = useState();
  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");

  // The way we are setting null value of each type of message at every line we can just do with the help of useEffect
  // useEffect(() => {
  //   setsuccess("");
  //   seterror("");
  //   setTimeMessage("");
  //   setotpMessage("");
  //   setemailMessage("");
  // });

  const SendOTP = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post("api/verify/verify", { email }, config);
      setbefore(email);
      settimesend(Date.now());
      setrecievedotp(data.otp);
      seterror("");
      setsuccess("OTP sended");
      setTimeMessage("");
      setemailMessage("");
      setotpMessage("");
    } catch (err) {
      setTimeMessage("");
      setemailMessage("");
      setsuccess("");
      setotpMessage("");
      seterror(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (recievedotp.toString() !== otp.toString()) {
      setotpMessage("Wrong OTP");
      setTimeMessage("");
      setsuccess("");
      setemailMessage("");
      seterror("");
      return;
    }
    if (email !== beforeemail) {
      setemailMessage("We have'nt send OTP on this Email");
      setTimeMessage("");
      seterror("");
      setotpMessage("");
      setsuccess("");
      return;
    }
    const time = Date.now() - timesend;
    if (time > 120000) {
      setTimeMessage("Time Over");
      setemailMessage("");
      setsuccess("");
      seterror("");
      setotpMessage("");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/verify/changepassword",
        { email, password },
        config
      );
      setTimeMessage("");
      setemailMessage("");
      setotpMessage("");
      seterror("");
      setsuccess("Password Change Successfully");
    } catch (err) {
      setTimeMessage("");
      setemailMessage("");
      setotpMessage("");
      setsuccess("");
      seterror(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };

  return (
    <MainScreen title="CHANGE PASSWORD">
      {success && <ErrorMessage>{success}</ErrorMessage>}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {emailMessage && (
        <ErrorMessage variant="danger">{emailMessage}</ErrorMessage>
      )}
      {otpMessage && <ErrorMessage variant="danger">{otpMessage}</ErrorMessage>}
      {timeSubmit && <ErrorMessage variant="danger">{timeSubmit}</ErrorMessage>}
      <div className="forgot-outer-div1">
        <Form onSubmit={SendOTP}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Send OTP
          </Button>
        </Form>
        <br />
        <br />
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter OTP</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter OTP"
              required
              value={otp}
              onChange={(e) => setotp(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <div>
          Already have an account ?{" "}
          <Link to="/login" className="signin">
            SignIn
          </Link>
        </div>
        <div>
          Don't have account ?{" "}
          <Link to="/register" className="signup">
            SignUp
          </Link>
        </div>
      </div>
    </MainScreen>
  );
};

export default Forgot;
