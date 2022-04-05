const express = require("express");
const studentsRouter = require("./users");
const loginRouter = require("./login");

const router = express.Router();

router.use("/users", studentsRouter);
router.use("/login", loginRouter);

module.exports = router;
