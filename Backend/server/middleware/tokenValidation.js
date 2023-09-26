const jwt = require("jsonwebtoken");
const { restart } = require("nodemon");

module.exports.validateToken = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Token is missing from header" });
    }

    const userToken = req.headers.authorization.split("Bearer")[1].trim();
    const decodedToken = jwt.verify(
      userToken,
      process.env.SECRET_KEY || "default-secret-key",
      (err, decoded) => {
        if (err)
          return res
            .status(403)
            .json({ message: "Error decoding token!", error: err });
        req.id = decoded.UserInfo.id;
        req.roles = decoded.UserInfo.roles;
        next();
      }
    );
  } catch (error) {
    console.error("Error in tokenValidation.js", error);
    return res.status(401).json({ message: error.message });
  }
};
