// routes/earn.js
const express = require("express");
const { verifyToken } = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/suggest", verifyToken, (req, res) => {
  // Only logged-in users can post
  const { idea } = req.body;
  const user = req.user;
  // Save idea logic...
  res.status(200).json({ message: `Thank you ${user.name} for your suggestion!` });
});

export default router;
