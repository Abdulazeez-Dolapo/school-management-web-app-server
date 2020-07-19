const mongoose = require("mongoose")
const deepPopulate = require("mongoose-deep-populate")(mongoose)
const Schema = mongoose.Schema

const CourseRegistrationSchema = new Schema({
	userId: { type: String, required: true },
	courseId: { type: Schema.Types.ObjectId, ref: "Course" },
})

CourseRegistrationSchema.plugin(deepPopulate, {
	whitelist: ["courseId", "courseId.creator"],
})

module.exports = mongoose.model("CourseRegistration", CourseRegistrationSchema)
