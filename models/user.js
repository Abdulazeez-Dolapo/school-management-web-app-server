const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, required: true },
	courseRegistered: [String],
})

module.exports = mongoose.model("User", UserSchema)
