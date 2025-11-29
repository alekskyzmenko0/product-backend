const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const Product = require("../models/Product");

// ======================
// BASE URL для деплоя
// если есть переменная окружения — используем её
// иначе — fallback на localhost
// ======================
const BASE_URL = process.env.RENDER_EXTERNAL_URL || "http://localhost:3000";

// ======================
// CREATE product
// ======================
router.post("/", async (req, res) => {
  try {
    const product = await Product.create({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      modelUrl: req.body.modelUrl, // теперь можно сохранить URL модели
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ======================
// GET all products
// ======================
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ======================
// GET product by ID
// ======================
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Not found" });

    res.json(product);
  } catch (error) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

// ======================
// Multer — storage config
// ======================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // место сохранения файла
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ======================
// UPLOAD PRODUCT IMAGE
// ======================
router.post("/upload", upload.single("image"), (req, res) => {
  const imageUrl = `${BASE_URL}/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// ======================
// UPLOAD MODEL FILE (.glb/.gltf)
// ======================
router.post("/upload-model", upload.single("model"), (req, res) => {
  const modelUrl = `${BASE_URL}/uploads/models/${req.file.filename}`;
  res.json({ modelUrl });
});

module.exports = router;
