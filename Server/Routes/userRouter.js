const express = require("express");

const userController = require("../Controllers/userController");

const router = express.Router();

router.put("/updateUser/:id", userController.editUserInfo);

module.exports = router;