const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CourseRegistrationSchema = new Schema({
	userId: { type: String, required: true },
	courseId: { type: Schema.Types.ObjectId, ref: "Course" },
})

module.exports = mongoose.model("CourseRegistration", CourseRegistrationSchema)
