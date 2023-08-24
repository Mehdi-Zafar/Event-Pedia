const express = require("express");
const router = express.Router();
const { getUser, createUser } = require("../controllers/userController");

router.post("/login", getUser);

router.post("/sign-up", createUser);

module.exports = router;
