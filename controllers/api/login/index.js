const express = require("express");
const { Student } = require("../../../models");

const router = express.Router();

router.post("/", async (req, res) => {
  const studentData = await Student.findOne({
    where: { email: req.body.email },
  });

  if (!studentData) {
    res.status(400).send("Unsucessful");
    return;
  }

  const validPassword = await studentData.checkPassword(req.body.password);

  if (!validPassword) {
    res.status(400).send("Unsucessful");
    return;
  }

  const student = studentData.get({ plain: true });

  req.session.studentId = student.id;
  req.session.loggedIn = true;

  res.status(204).end();
});

module.exports = router;
