const User = require("../database/models/userModel");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt)
    return res.status(401).json({ message: "No refreshToken!" });
  const refreshToken = cookies.jwt;

  const user = await User.findOne({ refreshToken }).exec();
  if (!user) return res.status(403).json({ message: "no user found!" });
  jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, decoded) => {
    if (err || user.id.toString() !== decoded.id) {
      console.log("user: ", user, " decoded: ", decoded);
      return res
        .status(403)
        .json({ message: "Error or User not found !", error: { err } });
    }

    const token = jwt.sign(
      {
        UserInfo: {
          id: user._id,
          roles: user.roles,
        },
      },
      process.env.SECRET_KEY || "default-secret-key",
      { expiresIn: "30s" }
    );
    res.json({ token });
  });
};

module.exports = { handleRefreshToken };
