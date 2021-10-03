const router = require("express").Router();
const User = require("../model/Users.js");
const { DataValidation } = require("../dataValidation");

//app.use("/api/register")
router.post("/register", async (req, res) => {
  //Validate that the body content matches our reqirements
  const { error } = DataValidation.registerValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  //check if the user doesnt exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
