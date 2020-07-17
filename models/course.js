const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CourseSchema = new Schema({
	title: { type: String, required: true, unique: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	category: { type: String, required: true },
	creator: { type: Schema.Types.ObjectId, ref: "Users" },
})

module.exports = mongoose.model("Course", CourseSchema)
