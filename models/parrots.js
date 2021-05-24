const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Parrot = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    type: String,
    required: false,
  },
  flying: { type: Boolean, required: false },
});

Parrot.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.hash;
  },
});

module.exports = mongoose.model("Parrot", Parrot);
