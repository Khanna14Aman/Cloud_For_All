const express = require("express");
const dotenv = require("dotenv");
dotenv.config("/.env");
const cors = require("cors");
const connectDB = require("../backend/config/db");
const userroutes = require("./routes/userroutes");
const noteRoutes = require("./routes/noteRoutes");
const contactRoutes = require("./routes/contactRoutes");
const verifyRoutes = require("./routes/verifyRoutes");
const { errorHandler, notFound } = require("./middleware/errormiddleware");

connectDB();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/users", userroutes);
app.use("/api/notes", noteRoutes);
app.use("/api/mycontact", contactRoutes);
app.use("/api/verify", verifyRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 6000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
