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
	static async getCourse(req, res) {
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

	// Update a course

	// Delete a course

	// // Get a single product
	// router.get("/product/:id", async (req, res) => {
	// 	try {
	// 		let product = await Product.findOne({ _id: req.params.id })
	// 		res.json({
	// 			success: true,
	// 			product,
	// 		})
	// 	} catch (error) {
	// 		res.status(500).json({
	// 			success: false,
	// 			message: error.message,
	// 		})
	// 	}
	// })

	// // Update a product
	// router.put("/product/:id", upload.single("photo"), async (req, res) => {
	// 	try {
	// 		let updatedProduct = await Product.findOneAndUpdate(
	// 			{ _id: req.params.id },
	// 			{
	// 				$set: {
	// 					title: req.body.title,
	// 					description: req.body.description,
	// 					photo: req.file.location,
	// 					price: req.body.price,
	// 					owner: req.body.ownerID,
	// 					category: req.body.categoryID,
	// 				},
	// 			},
	// 			{ upsert: true }
	// 		)
	// 		res.json({
	// 			success: true,
	// 			product: updatedProduct,
	// 		})
	// 	} catch (error) {
	// 		res.status(500).json({
	// 			success: false,
	// 			message: error.message,
	// 		})
	// 	}
	// })

	// // Delete a product
	// router.delete("/product/:id", async (req, res) => {
	// 	try {
	// 		let deletedProduct = await Product.findOneAndDelete({
	// 			_id: req.params.id,
	// 		})

	// 		if (deletedProduct) {
	// 			res.json({
	// 				success: true,
	// 				message: "Product successfully deleted",
	// 			})
	// 		}
	// 	} catch (error) {
	// 		res.status(500).json({
	// 			success: false,
	// 			message: error.message,
	// 		})
	// 	}
	// })
}

module.exports = courseController
