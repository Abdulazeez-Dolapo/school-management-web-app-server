const CourseRegistration = require("../models/course-registration")

class courseRegistrationController {
	// Register for a course
	static async register(req, res) {
		// Validate user's input
		if (!req.body.userId || !req.body.courseId) {
			res.status(500).json({
				success: false,
				message: "Please enter valid userId or courseId",
			})
		} else {
			try {
				let registeredCourse = new CourseRegistration()
				registeredCourse.userId = req.body.userId
				registeredCourse.courseId = req.body.courseId

				await registeredCourse.save()

				res.json({
					success: true,
					message: "Registered for course",
				})
			} catch (error) {
				res.status(500).json({
					success: false,
					message: error.message,
				})
			}
		}
	}
}

module.exports = courseRegistrationController
