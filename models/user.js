const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt-nodejs")

const UserSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, required: true },
	courseRegistered: [String],
})

UserSchema.pre("save", function (next) {
	let user = this
	if (this.isModified("password") || this.isNew) {
		bcrypt.genSalt(10, function (err, salt) {
			if (err) {
				return next(err)
			}

			bcrypt.hash(user.password, salt, null, function (err, hash) {
				if (err) {
					return next(err)
				}

				user.password = hash
				next()
			})
		})
	} else {
		return next()
	}
})

module.exports = mongoose.model("User", UserSchema)
