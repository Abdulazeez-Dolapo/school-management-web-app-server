const router = require("express").Router()
const courseController = require("../controllers/course")
const verifyToken = require("../middlewares/verify-token")
const verifyTutor = require("../middlewares/verify-tutor")

// Create a new course
router.post(
	"/course/create",
	[verifyToken, verifyTutor],
	courseController.create
)

// Get all courses
router.get("/course/get-all-courses", courseController.getCourses)

// Get a single courses
router.get("/course/get-course/:id", courseController.getCourse)

// Update a course
router.put(
	"/course/update/:id",
	[verifyToken, verifyTutor],
	courseController.update
)

module.exports = router
