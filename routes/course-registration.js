const router = require("express").Router()
const courseRegistrationController = require("../controllers/course-registration")
const verifyToken = require("../middlewares/verify-token")
const verifyStudent = require("../middlewares/verify-student")
const verifyTutor = require("../middlewares/verify-tutor")

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

// Get all courses a user is registered under
router.get(
	"/course/registration/get-all-courses-registered",
	[verifyToken, verifyStudent],
	courseRegistrationController.getAllCoursesRegistered
)

// Get all courses created by a user
router.get(
	"/course/registration/get-all-courses-created",
	[verifyToken, verifyTutor],
	courseRegistrationController.getAllCoursesCreated
)

module.exports = router
