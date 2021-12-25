const express = require("express");
const auth = require("../Controllers/auth");
const router = express.Router();

const { protect } = require('../middleware/auth');

router.post("/register", auth.createUser);
router.post("/login", auth.login);
router.put("/changepassword/:id", protect, auth.updatePassword);
router.get("/me", protect, auth.getMe);

module.exports = router;
