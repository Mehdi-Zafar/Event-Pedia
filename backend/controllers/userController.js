const User = require("../models/userModel");
const CryptoJS = require("crypto-js");

// get user
const getUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ Error: "Wrong Credentials" });
  }

  const hashedPassword = CryptoJS.AES.decrypt(
    user.password,
    process.env.SECRET_PHRASE
  );
  const decryptedPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

  if (password !== decryptedPassword) {
    return res.status(400).json({ Error: "Wrong Credentials" });
  }
  const { password: p, ...userDetails } = user._doc;

  res.status(200).json({ userDetails });
};

// create user
const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const encryptedPassword = CryptoJS.AES.encrypt(
    password,
    process.env.SECRET_PHRASE
  );
  // add doc to db
  try {
    const user = await User.create({
      username: username,
      email: email,
      password: encryptedPassword,
    });
    const { password, ...other } = user._doc;
    res.status(200).json({ other });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

module.exports = { getUser, createUser };
