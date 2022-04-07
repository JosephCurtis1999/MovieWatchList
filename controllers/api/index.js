const express = require("express");
const studentsRouter = require("./users");
const loginRouter = require("./login");
const searchRouter = require("./search")
const router = express.Router();

router.use("/users", studentsRouter);
router.use("/login", loginRouter);
router.use("/search", searchRouter)

module.exports = router;
