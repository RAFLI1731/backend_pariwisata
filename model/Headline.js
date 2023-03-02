const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  nama_headline: {
    type: String,
  },
  deskripsi: {
    type: String,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("data_headline", UserSchema);
