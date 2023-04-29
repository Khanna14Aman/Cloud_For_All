const express = require("express");
const dotenv = require("dotenv");
dotenv.config("/.env");
const cors = require("cors");
const connectDB = require("../backend/config/db");
const userroutes = require("./routes/userroutes");
const noteRoutes = require("./routes/noteRoutes");
const contactRoutes = require("./routes/contactRoutes");
const verifyRoutes = require("./routes/verifyRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { errorHandler, notFound } = require("./middleware/errormiddleware");

connectDB();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/users", userroutes);
app.use("/api/notes", noteRoutes);
app.use("/api/mycontact", contactRoutes);
app.use("/api/verify", verifyRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 6000;

const server = app.listen(PORT, console.log(`Server started on PORT ${PORT}`));

const io = require("socket.io")(server, {
  pingTimeOut: 6000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("user Connected to Socket");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log("User joind room " + userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    console.log(chat);
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
