const User = require("../models/userSchema")

// Register User
exports.registerUser = (async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.create({ username, password });
      res.status(201).json({ message: "Success", user: user._id });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: "Validation Error", errors: messages });
        }
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Username already exists",
            });
        }
        return res.status(500).json({ message: "Server error", error });
    }
  });


// Login User

exports.loginUser = (async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return res
          .status(402)
          .json({ success : true , message: "No User Exists with this username" });
      } else {
        const isPasswordMacthed = user.comparePassword(password);
        if (!isPasswordMacthed) {
          return res.status(402).json({ message: "Password is incorrect" });
        }
  
      const token = user.generateToken(user);
        const options = {
          expires: new Date(Date.now() + 900000),
          httpOnly: true
      }
        res.cookie(
          "jwtToken",
          token,
          options
        );
        return res
          .status(201)
          .json({ message: "Logged in successfully", user_id: user._id });
      }
    } catch (error) {
      return res.status(405).send("Failure " + error);
    }
  });


// Logout User
exports.logoutUser = ((req,res)=> {
    res.cookie("jwtToken",null, {expires : new Date(Date.now()), httpOnly : true})
    res.status(201).json({success : true, message : "User is Logged out"})
})

// Account Details
exports.getAccountDetails = ((req, res) => {
    try {
      const user = req.user;
      res.status(200).json({
          success: true,
          user,
      });
    } catch (error) {
      res.status(405).json({success : false, error : error})
    }
  });