import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import SendIcon from "@mui/icons-material/Send";
import io from "socket.io-client";
var socket, selectedChatCompare;

const Contact = () => {
  const [socketConnected, setSocketConnected] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo || userInfo.isAdmin) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  // for sending message..
  const [messagevalue, setmessagevalue] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!messagevalue) {
      return;
    }
    try {
      const chatId = selectedChat._id;
      const content = messagevalue;
      setmessagevalue("");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/message",
        { chatId, content },
        config
      );
      socket.emit("new message", data);
      setAllMessage([...allmessage, data]);
      // console.log(data);
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };

  // For fetching all message with developer when any message sended or recieve
  const [loading, setLoading] = useState(false);

  const [allmessage, setAllMessage] = useState([]);
  const getallmessage = async (chatId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/message/${chatId}`, config);
      // console.log(data);
      setLoading(false);
      setAllMessage(data);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };

  //create and access chat with developer

  const [selectedChat, setSelectChat] = useState();
  const AccessChat = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get("/api/chat/developer", config);
      setSelectChat(data);
      // getallmessage(data._id);
      // selectedChatCompare = data;
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };
  useEffect(() => {
    AccessChat();
  }, []);

  useEffect(() => {
    if (selectedChat) {
      getallmessage(selectedChat._id);
      selectedChatCompare = selectedChat;
    }
  }, [selectedChat]);

  // Logic to move to scroll at bottom automatically when new message send or recieve
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [allmessage]);

  useEffect(() => {
    socket = io("http://localhost:8000");
    socket.emit("setup", userInfo);
    socket.on("connected", () => setSocketConnected(true));
    // socket.on("typing", () => setIsTyping(true));
    // socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      console.log("contact");
      console.log(selectedChatCompare);
      console.log(newMessageRecieved);
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        console.log("contact1");
        //  if (!notification.includes(newMessageRecieved)) {
        //    setNotification([newMessageRecieved, ...notification]);
        //    setFetchAgain(!fetchAgain);
        //  }
      } else {
        console.log("contact2");
        setAllMessage([...allmessage, newMessageRecieved]);
      }
    });
  });

  return (
    <>
      <Container
        fluid
        style={{ height: "90vh", backgroundColor: "grey", padding: "0" }}
      >
        {loading && (
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading />
          </div>
        )}
        {selectedChat && (
          <>
            <Container
              fluid
              style={{
                height: "80vh",
                overflowY: "scroll",
              }}
            >
              {allmessage.length === 0 && (
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "5vh",
                  }}
                >
                  <strong>No Chats...</strong>
                </div>
              )}
              {allmessage.length > 0 &&
                allmessage.map((message) => (
                  <Row
                    key={message._id}
                    style={{
                      paddingLeft: "1vw",
                      paddingRight: "1vw",
                      display: "flex",
                      justifyContent:
                        userInfo._id === message.sender._id ? "right" : "left",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "50%",
                        overflowWrap: "anywhere",
                        color: "black",
                        backgroundColor:
                          userInfo._id === message.sender._id ? "red" : "pink",

                        marginTop: "1vh",
                        padding: "1vh",
                        borderRadius: "10px",
                      }}
                    >
                      <strong>{message.content}</strong>
                    </div>
                  </Row>
                ))}
              <div ref={bottomRef} />
            </Container>
            <div
              className="form-div"
              style={{
                paddingLeft: "1vw",
                position: "fixed",
                width: "100%",
                bottom: "1vh",
              }}
            >
              <Form onSubmit={sendMessage}>
                <div style={{ width: "80%", display: "inline-block" }}>
                  <Form.Group controlId="formBasicText">
                    <Form.Control
                      type="text"
                      value={messagevalue}
                      placeholder="Enter message to send..."
                      onChange={(e) => setmessagevalue(e.target.value)}
                      autoComplete="off"
                    />
                  </Form.Group>
                </div>
                <div
                  style={{
                    display: "inline-block",
                    marginLeft: "1vh",
                  }}
                >
                  <Button
                    variant="success"
                    style={{ borderRadius: "50%" }}
                    type="submit"
                  >
                    <SendIcon />
                  </Button>
                </div>
              </Form>
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default Contact;
