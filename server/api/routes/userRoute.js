const express = require("express")
const {registerUser,loginUser,logoutUser,getAccountDetails} = require("../controller/userController")
const {userAuth} = require("../../middleware/authMiddleware")

const router = express()

router.route("/user/register").post(registerUser)
router.route("/user/login").post(loginUser)
router.route("/user/logout").get(logoutUser)
router.route("/user/profile").get(userAuth, getAccountDetails)

module.exports = router;