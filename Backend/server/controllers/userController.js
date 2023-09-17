const User = require("../database/models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { email, password, firstName, lastName, userName } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      throw new Error("Email already exists");
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email: email,
      password: hashPassword,
      firstName: firstName,
      lastName: lastName,
      userName: userName,
    });
    console.log(newUser);
    let result = await newUser.save();

    return result.status(200).json(result);
  } catch (error) {
    console.error("Error in userService.js", error);
    res.status(400).json({ message: "Something went wrong!" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User not found!");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(400).json({ message: "Email or Password invalid !" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY || "default-secret-key",
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_SECRET_KEY,
      { expiresIn: "1d" }
    );

    user.refreshToken = refreshToken;
    const result = await user.save();
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error in userController", error);
    res.status(400).json({ message: "Error ! Can not login!" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const jwtToken = req.headers.authorization.split("Bearer")[1].trim();
    const decodedJwtToken = jwt.decode(jwtToken);
    console.log(decodedJwtToken);
    const user = await User.findOne({ _id: decodedJwtToken.id });

    if (!user) {
      res.status(404).json({ message: "User not found!" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error in userService.js", error);
    res.status(400).json({ message: error });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const jwtToken =
      req.headers.authorization ||
      req.headers.Authorization.split("Bearer")[1].trim();
    const decodedJwtToken = jwt.decode(jwtToken);
    const user = await User.findOneAndUpdate(
      { _id: decodedJwtToken.id },
      {
        userName: serviceData.body.userName,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error in userService.js", error);
    res.status(400).json({ message: error });
  }
};

module.exports = { createUser, loginUser, updateUserProfile, getUserProfile };
