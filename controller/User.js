const userModel = require("../model/User");
const bcrypt = require("bcrypt");
const { requestResponse } = require("../config");
const objectId = require("mongoose").Types.ObjectId;
const { deleteImage } = require("../UploadConfig");

exports.register = (data) =>
  new Promise((resolve, reject) => {
    userModel
      .findOne({
        nama_user: data.nama_user,
      })
      .then((user) => {
        if (user) {
          resolve(requestResponse.gagal("Username telah ada"));
        } else {
          bcrypt.hash(data.password, 10, (err, hash) => {
            data.password = hash;
            userModel
              .create(data)
              .then(() =>
                resolve(requestResponse.berhasil("Berhasil Registrasi"))
              )
              .catch(() => reject(requestResponse.kesalahan));
          });
        }
      });
  });

exports.login = (data) =>
  new Promise((resolve, reject) => {
    userModel
      .findOne({
        username: data.username,
      })
      .then((user) => {
        if (user) {
          if (bcrypt.compareSync(data.password, user.password)) {
            resolve(requestResponse.suksesLogin(user));
          } else {
            reject(requestResponse.gagal("Password Salah"));
          }
        } else {
          reject(requestResponse.gagal("Username Tidak terdaftar"));
        }
      });
  });

exports.getAllUser = () =>
  new Promise((resolve, reject) => {
    userModel
      .find({})
      .then((user) => {
        console.log(user);
        resolve(requestResponse.suksesWithData(user));
      })
      .catch(() => reject(requestResponse.kesalahan));
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
            resolve(requestResponse.berhasil("Berhasil Delete Data"));
          })
          .catch(() => reject(requestResponse.serverError));
      });
  });
