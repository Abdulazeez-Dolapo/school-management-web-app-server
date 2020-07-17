const Course = require("../models/course")

class courseController {
	// Create course
	static async create(req, res) {
		// Validate user's input
		if (!req.body.title || !req.body.description) {
			res.status(500).json({
				success: false,
				message: "Please enter valid title or description",
			})
		} else {
			try {
				// Check if course title already exists
				let course = await Course.findOne({ title: req.body.title })
				if (course) {
					res.json({
						success: false,
						message: "Course already exists",
					})
				} else {
					let newCourse = new Course()
					newCourse.title = req.body.title
					newCourse.description = req.body.description
					newCourse.creator = req.decodedToken._id

					await newCourse.save()

					res.json({
						course: newCourse,
						success: true,
						message: "Course created successfully",
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
}

module.exports = courseController
