const express = require("express");
const auth = require("../Controllers/auth");
const router = express.Router();

router.post("/register", auth.createUser)
router.post("/login", auth.login);



module.exports = router;
