require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

// подключение к MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((e) => console.log("MongoDB Error ➜", e));

// базовый роут
app.get("/", (req, res) => {
  res.send("API работает 👍");
});

const productRoutes = require("./routes/products");
app.use("/products", productRoutes);

app.use("/uploads", express.static("uploads"));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on port", process.env.PORT || 5000);
});
