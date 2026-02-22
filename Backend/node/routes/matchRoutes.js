const express = require("express");
const { analyzeResume } = require("../controllers/matchController");
const { exportToPDF } = require("../controllers/pdfController");
const auth = require("../Middleware/authMiddleware");
const uplaod = require("../Middleware/uploadMiddleware");
const router = express.Router();

router.post("/analyze", auth, uplaod.single("resume"), analyzeResume);
router.post("/export", auth, exportToPDF);

module.exports = router;