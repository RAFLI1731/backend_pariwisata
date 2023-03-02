const router = require("express").Router();
const hotelController = require("../controller/Hotel");
const uploadSetting = require("../UploadConfig");
const fields = uploadSetting.upload.fields([
  {
    name: "image",
    maxCount: 1,
  },
]);

router.post("/tambah", fields, (req, res) => {
  const imageName = uploadSetting.cekNull(req.files["image"]);

  const data = Object.assign(JSON.parse(req.body.data), {
    image: imageName,
  });

  hotelController
    .tambahData(data)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.get("/getAll", (req, res) => {
  hotelController
    .getAll()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
  //   console.log(result);
});

router.get("/getbyid/:id", (req, res) => {
  //   console.log(req.params.id);
  hotelController
    .getbyId(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.put("/edit/:id", fields, (req, res) => {
  const imageName = uploadSetting.cekNull(req.files["image"]);

  let data = JSON.parse(req.body.data);
  let changeImage = false;
  if (imageName) {
    changeImage = true;
    data = Object.assign(data, {
      image: imageName,
      oldImage: data.image,
    });
  }
  console.log(changeImage);
  hotelController
    .edit(data, req.params.id, changeImage)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.delete("/delete/:id", (req, res) => {
  hotelController
    .delete(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

module.exports = router;
