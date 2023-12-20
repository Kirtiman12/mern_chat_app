const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDb = require("./config/db");
const colors = require("colors");
const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");

dotenv.config();

connectDb();
const app = express();

app.use(cors())

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(3001, () => {
  console.log(`Welcome Back, Server has started:${PORT}`.yellow.bold);
});
    