const express = require("express");
const apiRouter = require("./api");
const homeRoutes = require('./home-routes.js');

const router = express.Router();

router.use("/api", apiRouter);
router.use('/', homeRoutes);

module.exports = router;