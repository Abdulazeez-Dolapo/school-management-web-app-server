const router = require("express").Router()
const AuthController = require("../controllers/auth")
const verifyToken = require("../middlewares/verify-token")

// Register a new user
router.post("/auth/register", AuthController.register)

// Login
router.post("/auth/login", AuthController.login)

// User profile route
router.get("/auth/user", verifyToken, AuthController.userDetails)

module.exports = router
