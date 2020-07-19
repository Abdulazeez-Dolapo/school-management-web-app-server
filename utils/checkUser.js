const Course = require("../models/course")

// Check if user is creator of course
const checkUser = async (userId, courseId) => {
	const foundCourse = await Course.findOne({ _id: courseId })
	if (foundCourse.creator == userId) {
		return true
	} else {
		return false
	}
}

module.exports = checkUser
