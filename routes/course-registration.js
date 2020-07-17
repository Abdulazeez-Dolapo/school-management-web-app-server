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

// Cancel course registration
router.delete(
	"/course/registration/cancel/:id",
	[verifyToken, verifyStudent],
	courseRegistrationController.cancel
)

module.exports = router
