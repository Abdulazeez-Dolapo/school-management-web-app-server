const CourseRegistration = require("../models/course-registration")
const Course = require("../models/course")

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
				// Check if user has already registered for a particular course
				let course = await CourseRegistration.findOne({
					userId: req.body.userId,
					courseId: req.body.courseId,
				})

				if (course) {
					return res.status(500).json({
						success: false,
						message: "You have already registered for this course",
					})
				}

				let registeredCourse = new CourseRegistration()
				registeredCourse.userId = req.body.userId
				registeredCourse.courseId = req.body.courseId

				await registeredCourse.save()

				res.json({
					registeredCourse,
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

	// Cancel course registration
	static async cancel(req, res) {
		try {
			const deletedCourse = await CourseRegistration.findOneAndDelete({
				_id: req.params.id,
			})

			if (deletedCourse) {
				res.json({
					success: true,
					message: "Course registration canceled",
				})
			}
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			})
		}
	}

	// Get all courses a user has registered under
	static async getAllCoursesRegistered(req, res) {
		try {
			let courses = await CourseRegistration.find({
				userId: req.decodedToken._id,
			})
				.populate("courseId")
				.exec()
			res.json({
				success: true,
				courses,
				message: "Course(s) found",
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			})
		}
	}

	// Get all courses created by a user
	static async getAllCoursesCreated(req, res) {
		try {
			let courses = await Course.find({
				creator: req.decodedToken._id,
			})
			res.json({
				success: true,
				courses,
				message: "Course(s) found",
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			})
		}
	}
}

module.exports = courseRegistrationController
