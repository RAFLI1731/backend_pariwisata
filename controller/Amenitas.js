const userModel = require("../model/Amenitas");
const bcrypt = require("bcrypt");
const { requestResponse } = require("../config");
const objectId = require("mongoose").Types.ObjectId;
const { deleteImage } = require("../UploadConfig");

exports.tambahData = (data) =>
  new Promise((resolve, reject) => {
    userModel
      .create(data)
      .then(() => resolve(requestResponse.berhasil("Berhasil Tambah Data")))
      .catch((error) => reject(requestResponse.gagal("Error")));
    console.log(data);
  });

exports.getAll = () =>
  new Promise((resolve, reject) => {
    userModel
      .find({})
      .then((user) => {
        console.log(requestResponse.berhasil("Get Data Hotel"));
        resolve(requestResponse.suksesWithData(user));
      })
      .catch(() => reject(requestResponse.kesalahan));
  });

exports.getbyId = (id) =>
  new Promise((resolve, reject) => {
    console.log("ini controller");
    userModel
      .findOne({
        _id: objectId(id),
      })
      .then((user) => {
        console.log(requestResponse.berhasil("Edit Data Hotel"));
        resolve(requestResponse.suksesWithData(user));
      })
      .catch((error) => reject(requestResponse.serverError));
  });

exports.edit = (data, id, changeImage) =>
  new Promise(async (resolve, reject) => {
    userModel
      .updateOne(
        {
          _id: objectId(id),
        },
        data
      )
      .then(() => {
        if (changeImage == true) {
          deleteImage(data.oldImage);
        }
        console.log(requestResponse.berhasil("Berhasil Edit Data"));
        resolve(requestResponse.berhasil("Berhasil Edit Data"));
      })
      .catch(() => reject(requestResponse.serverError));
  });

exports.delete = (id) =>
  new Promise((resolve, reject) => {
    userModel
      .findOne({
        _id: objectId(id),
      })
      .then((data) => {
        userModel
          .deleteOne({
            _id: objectId(id),
          })
          .then(() => {
            deleteImage(data.image);
            resolve(requestResponse.berhasil("Berhasil Delete Data"));
          })
          .catch(() => reject(requestResponse.serverError));
      });
  });
