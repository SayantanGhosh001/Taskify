const express = require("express");
const {
  login,
  logout,
  register,
  getUser,
} = require("../controllers/authController.js");
const authMiddleware =require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authMiddleware, getUser);

module.exports = router;