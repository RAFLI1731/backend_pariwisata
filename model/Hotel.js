const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  nama_hotel: {
    type: String,
  },
  deskripsi: {
    type: String,
  },
  jenis: {
    type: String,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("data_hotel", UserSchema);
