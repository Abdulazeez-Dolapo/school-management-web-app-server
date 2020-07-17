const Course = require("../models/course")

class courseController {
	// Create course
	static async create(req, res) {
		// Validate user's input
		if (!req.body.title || !req.body.description || !req.body.price) {
			res.status(500).json({
				success: false,
				message: "Please enter valid title, description or price",
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
					newCourse.price = req.body.price
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

	// Get all courses
	static async getCourses(req, res) {
		try {
			const courses = await Course.find()
			res.json({
				success: true,
				courses,
				message: "Courses found",
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			})
		}
	}

	// Get a single course
	static async getCourse(req, res) {
		try {
			let course = await Course.findOne({ _id: req.params.id })
			res.json({
				success: true,
				course,
				message: "Course found",
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			})
		}
	}
	// Update a course

	// Delete a course
}

module.exports = courseController
