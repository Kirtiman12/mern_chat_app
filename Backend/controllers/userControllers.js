const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

// Registration endpoint
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: "Please fill all fields" });
    return;
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ error: "User already exists" });
    return;
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
    });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Authentication endpoint
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  // console.log("output : ", user);

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ error: "Invalid Email or Password" });
  }
});

//  /api/user?search=Thetalabs
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search?{
    $or: [
      {
        name: {
          $regex: req.query.search,
          $options: "i",
        },
      },
      {
        email: {
          $regex: req.query.search,
          $options: "i",
        },
      },
    ],
  }:{};
  const users = await User.find(keyword);
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
