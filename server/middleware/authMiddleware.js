const jwt = require("jsonwebtoken");
const  User  = require("../api/models/userSchema");

const userAuth = async (req, res, next) => {
  try {
    const { jwtToken } = req.cookies;
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    if (!decoded) {
      throw new Error("Token Verification Failed");
    }
    const { id } = decoded;
    const user = await User.findById(id);
    if (!user) {
      throw new Error("Invalid User");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({success : false, error : err})
  }
};

module.exports = {userAuth}
