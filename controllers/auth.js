const User = require("../models/user")
const jwt = require("jsonwebtoken")
const config = require("../config/config")
const ONE_DAY = 60 * 60 * 24

class AuthController {
	// Register user
	static async register(req, res) {
		// Validate user's input
		if (!req.body.email || !req.body.password || !req.body.name) {
			res.status(500).json({
				success: false,
				message: "Please enter valid email, username or password",
			})
		} else {
			try {
				// Check if email already exists
				let foundUser = await User.findOne({ email: req.body.email })
				if (foundUser) {
					return res.status(400).json({
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
	}

	// Login user
	static async login(req, res) {
		// Validate user's input
		if (!req.body.email || !req.body.password) {
			res.status(500).json({
				success: false,
				message: "Please enter valid email or password",
			})
		} else {
			try {
				const { email, password } = req.body
				const foundUser = await User.findOne({ email }).select("+password")
				if (!foundUser) {
					res.status(403).json({
						success: false,
						message: "Email or password incorrect",
					})
				} else {
					if (foundUser.comparePassword(password)) {
						// Remove password from foundUser object
						const user = {
							name: foundUser.name,
							_id: foundUser._id,
							email: foundUser.email,
							role: foundUser.role,
						}
						const token = jwt.sign(user, config.key, {
							expiresIn: ONE_DAY,
						})
						res.json({
							success: true,
							token,
						})
					} else {
						res.status(403).json({
							success: false,
							message: "Email or password incorrect",
						})
					}
				}
			} catch (error) {
				res.status(500).json({
					success: false,
					message: error.message,
				})
			}
		}
	}

	// Get user details
	static async userDetails(req, res) {
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
	}
}

module.exports = AuthController
