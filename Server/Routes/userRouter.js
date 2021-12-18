const express = require("express");

const userController = require("../Controllers/userController");

const router = express.Router();

router.put("/updateUser/:id", userController.editUserInfo);
router.get("/:id", userController.getUserById);

// Dummy login
router.post("/login", userController.login);

module.exports = router;
