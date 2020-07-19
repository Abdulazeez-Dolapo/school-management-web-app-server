module.exports = function (req, res, next) {
	const userType = req.decodedToken.role
	if (userType === "Tutor") {
		next()
	} else {
		res.status(401).json({
			success: false,
			message: "You do not have permission",
		})
	}
}
