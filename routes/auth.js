const router = require("express").Router()
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const config = require("../config/config")
const verifyToken = require("../middlewares/verify-token")
const ONE_DAY = 60 * 60 * 24

// Register a new user
router.post("/auth/register", async (req, res) => {
	if (!req.body.email || !req.body.password || !req.body.name) {
		res.status(500).json({
			success: false,
			message: "Please enter valid email, name or password",
		})
	} else {
		try {
			let foundUser = await User.findOne({ email: req.body.email })
			if (foundUser) {
				res.json({
					success: false,
					message: "User with the email already exists",
				})
			} else {
				let user = new User()
				user.name = req.body.name
				user.email = req.body.email
				user.password = req.body.password
				user.role = req.body.role

				await user.save()

				let token = jwt.sign(user.toJSON(), config.key, {
					expiresIn: ONE_DAY,
				})

				res.json({
					success: true,
					token,
					message: "User registered",
				})
			}
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			})
		}
	}
})

// Login
router.post("/auth/login", async (req, res) => {
	if (!req.body.email || !req.body.password) {
		res.status(500).json({
			success: false,
			message: "Please enter valid email or password",
		})
	} else {
		try {
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			})
		}
	}
})

// User profile route
router.get("/auth/user", verifyToken, async (req, res) => {
	try {
		let user = await User.findOne({ _id: req.decodedToken._id })
		if (user) {
			res.json({
				success: true,
				user,
				message: "User found",
			})
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		})
	}
})

module.exports = router
