const express = require("express");
const studentsRouter = require("./users");
const loginRouter = require("./login");
const searchRouter = require("./search")
const signUpRouter = require("./signup")
const router = express.Router();

router.use("/users", studentsRouter);
router.use("/login", loginRouter);
router.use("/search", searchRouter)
router.use("/signUp", signUpRouter)

module.exports = router;
