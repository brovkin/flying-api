const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
  login: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: false },
  phone: { type: String, required: false },
})

User.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.hash;
  }
});

module.exports = mongoose.model('User', User);
