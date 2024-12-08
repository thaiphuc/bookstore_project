const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { Server } = require("socket.io");
const http = require("http");
const port = process.env.PORT || 5000;

const jwt = require("jsonwebtoken");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("flap", () => {
    io.emit("flap", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}));

app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://pnqbookstore:RNbaJ2H2rcd7yNmc@bookstore-web.adyvupo.mongodb.net/bookstore-web?retryWrites=true&w=majority&appName=bookstore-web`
  )
  .then(console.log("Mongodb connected successfully!"))
  .catch((error) => console.log("Error connecting to MongoDB: " + error));

 

// jwt authentication

// jwt related api
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  res.send({ token });
});

const bookRoutes = require("./api/routes/bookRoutes");
const cartsRoutes = require("./api/routes/cartRoutes");
const usersRoutes = require("./api/routes/userRoutes");
const adminStats = require("./api/routes/adminStats");
const orderStats = require("./api/routes/orderStats");
const commentRoutes = require("./api/routes/commentRoutes");
const orderRoutes = require("./api/routes/oderRoutes");
const paymentRoutes = require("./api/routes/paymentRoutes");
const notificationRoutes = require("./api/routes/notificationRoutes");
const gameRoutes = require("./api/routes/gameRoutes");

app.use("/book", bookRoutes);
app.use("/carts", cartsRoutes);
app.use("/users", usersRoutes);
app.use("/admin-stats", adminStats);
app.use("/order-stats", orderStats);
app.use("/cmt", commentRoutes);
app.use("/orders", orderRoutes);
app.use("/payment", paymentRoutes);
app.use("/noti",notificationRoutes);
app.use("/game", gameRoutes);


app.get("/", (req, res) => {
  res.send("BookStore Server is Running!");
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
