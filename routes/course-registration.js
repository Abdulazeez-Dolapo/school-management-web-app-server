const router = require("express").Router()
const courseRegistrationController = require("../controllers/course-registration")
const verifyToken = require("../middlewares/verify-token")
const verifyStudent = require("../middlewares/verify-student")

// Register for a course
router.post(
	"/course/registration/register",
	[verifyToken, verifyStudent],
	courseRegistrationController.register
)

module.exports = router
