const router = require("express").Router()
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const config = require("../config/config")

// Register a new user
router.post("/auth/register", async (req, res) => {
	if (!req.body.email || !req.body.password || !req.body.name) {
		res.status(500).json({
			success: false,
			message: "Please enter valid email, name or password",
		})
	} else {
		try {
			const ONE_DAY = 60 * 60 * 24
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
				token,
				success: true,
				message: "User registered",
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			})
		}
	}
})

module.exports = router
