const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// CREATE product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Not found" });

    res.json(product);
  } catch (error) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

const multer = require("multer");
const path = require("path");

// хранилище для файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // сюда складываем файлы
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// POST /products/upload — загрузка изображения
router.post("/upload", upload.single("image"), (req, res) => {
  const imageUrl = `${BASE_URL}/uploads/${req.file.filename}`; // <<< исправлено
  res.json({ imageUrl });
});



module.exports = router;
