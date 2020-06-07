
var bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Post
var user = new Schema({
  name: { type: String, max: 50 },
  username: { type: String, unique: true, required: true },
  password: { type: String, min: 5, max: 25 },
  creation_dt: { type: Date }
});

user.statics.hashPassword = function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

user.methods.isValid = function (hashedpassword) {
  return bcrypt.compareSync(hashedpassword, this.password);
}


module.exports = mongoose.model('user', user);