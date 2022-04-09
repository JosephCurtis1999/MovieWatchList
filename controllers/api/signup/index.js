const express = require("express");
const { Student } = require("../../../models");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
      const studentData = await Student.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
  
      res.json(studentData.get({ plain: true }));
    } catch (error) {
      res.status(400).send(error.message);
    }
});


module.exports = router;