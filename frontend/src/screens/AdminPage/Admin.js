import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "../../components/Error/Error";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import SendIcon from "@mui/icons-material/Send";
import "../../cssfile/ScrollBar.css";
import Loading from "../../components/Loading/Loading";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import io from "socket.io-client";
var socket, selectedChatCompare;

const Admin = ({ search }) => {
  const widthMatch = useMediaQuery("(min-width:768px)");
  const navigate = useNavigate();
  const [socketConnected, setSocketConnected] = useState(false);
  // see if Admin login or not
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  // For fetching all users
  const [AllUser, setAllUser] = useState([]);
  const [error, setError] = useState(false);
  const GetAllUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/users/getalluser?search=`, config);
      // console.log(data);
      setAllUser(data);
      setError(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  useEffect(() => {
    GetAllUser();
  }, []);

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

  // For fetching all message with particular user when any user get selected or any message sended
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

  // for accessing or creating first time chat with particular user;
  const [selectedChat, setSelectChat] = useState();
  const AccessChat = async (userId) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);
      // console.log(data._id);
      setSelectChat(data);
      // getallmessage(data._id);
      // selectedChatCompare = data;
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };

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
      console.log("admin");
      console.log(selectedChatCompare);
      console.log(newMessageRecieved);
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        console.log("admin1");
        // if (!notification.includes(newMessageRecieved)) {
        //   setNotification([newMessageRecieved, ...notification]);
        //   setFetchAgain(!fetchAgain);
        // }
      } else {
        console.log("admin2");
        setAllMessage([...allmessage, newMessageRecieved]);
      }
    });
  });

  return (
    <>
      <Container fluid>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <Row>
          {(widthMatch || !selectedChat) && (
            <Col
              lg={3}
              md={3}
              style={{
                height: "90vh",
                backgroundColor: "wheat",
                overflowY: "scroll",
                overflowX: "hidden",
              }}
            >
              {AllUser &&
                AllUser.filter((user) =>
                  user.name.toLowerCase().includes(search.toLowerCase())
                ).map((value) => (
                  <Row
                    className="selectuser"
                    onClick={() => AccessChat(value._id)}
                    md={2}
                    lg={2}
                    sm={2}
                    key={value._id}
                    style={{
                      minHeight: "10vh",
                      marginBottom: "1vh",
                      backgroundColor: "gray",
                    }}
                  >
                    <Col
                      md={2}
                      lg={2}
                      sm={2}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Image
                        src={value.pic}
                        style={{ height: "5vh", width: "5vh" }}
                        roundedCircle
                      ></Image>
                    </Col>
                    <Col>
                      <Row md={1} lg={1} sm={1} style={{ paddingTop: "1vh" }}>
                        <Col>
                          <strong>{value.name}</strong>
                        </Col>
                        <Col>{value.email}</Col>
                      </Row>
                    </Col>
                  </Row>
                ))}
            </Col>
          )}

          {(widthMatch || selectedChat) && (
            <Col
              style={{
                height: "90vh",
                backgroundColor: "yellow",
                paddingRight: "0vw",
                paddingLeft: "0vw",
              }}
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
              {selectedChat ? (
                <>
                  <Container
                    fluid
                    style={{
                      height: "5vh",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <ArrowBackIcon
                      className="arrow"
                      onClick={() => setSelectChat()}
                    />
                    <strong>
                      {selectedChat.users[0]._id === userInfo._id
                        ? selectedChat.users[1].name
                        : selectedChat.users[0].name}
                    </strong>
                    {/* <VisibilityIcon className="view" /> */}
                  </Container>
                  <Container
                    fluid
                    style={{
                      height: "75vh",
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
                              userInfo._id === message.sender._id
                                ? "right"
                                : "left",
                          }}
                        >
                          <div
                            style={{
                              maxWidth: "50%",
                              overflowWrap: "anywhere",
                              color: "black",
                              backgroundColor:
                                userInfo._id === message.sender._id
                                  ? "red"
                                  : "pink",

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
                      width: widthMatch ? "80vw" : "100%",
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
              ) : (
                !loading && (
                  <Container
                    style={{
                      height: "100%",
                      alignItems: "center",
                      display: "flex",
                      fontSize: "5vh",
                      justifyContent: "center",
                    }}
                  >
                    <strong>Select User to Chat with them...</strong>
                  </Container>
                )
              )}
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Admin;
