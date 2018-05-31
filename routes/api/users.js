const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");
//  @route GET api/users/test
//  @desc Tests users route
//  @acess Public

router.get("/test", (req, res) => res.json({ msg: "Users Works!" }));

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name);
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    errors.email = "Email already exists";
    return res.status(400).json(errors);
  }

  const avatar = gravatar.url(email, {
    s: "200", // Size
    r: "pg", // Rating
    d: "mm" // Default
  });

  const newUser = new User({
    name,
    email,
    avatar,
    password
  });
  const salt = await bcrypt.genSalt(10);
  // hash the password along with our new salt
  const hash = await bcrypt.hash(newUser.password, salt);
  console.log(hash);

  // override the cleartext password with the hashed one
  newUser.password = hash;

  // save the new user
  await newUser.save();

  return res.json(newUser);
});

module.exports = router;
