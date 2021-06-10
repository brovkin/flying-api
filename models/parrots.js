const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Parrot = new Schema({
  name: { type: String, required: true }, // Наименование птицы
  latin: { type: String, required: false }, // Наименование на латыни
  description: { type: String, required: true }, // Описание птицы
  habitat: {
    type: [{ type: Object }],
    default: [],
  }, // Ареал обитания
  colors: {
    type: [{ type: Object }],
    default: [],
  },
  image: {
    // Картинка
    type: String,
    required: false,
  },
  flying: { type: Boolean, required: false }, // Летает попугай или нет
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
