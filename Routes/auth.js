const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");

//registering a user
router.post("/signin", async (req, res) => {
  console.log(req.body);
  try {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = await new User({
      email: req.body.email,

      password: newPassword,
    });
    const user = await newUser.save();
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send(error);
  }
});
//login a user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).send("user not found");
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(404).send("Wrong password");
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
