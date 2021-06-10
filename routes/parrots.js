const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const getColors = require("get-image-colors");
const Vibrant = require("node-vibrant");
const ColorThief = require("colorthief");
const Parrot = require("../models/parrots");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const { ObjectId } = require("mongodb");

const PUBLIC_DIR = "./public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PUBLIC_DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

// GET ALL

router.get("/", (req, res) => {
  Parrot.find((err, data) => {
    if (err) return res.json({ status: "fail" });
    res.setHeader("x-total-count", data.length);
    res.header("Access-Control-Expose-Headers", "x-total-count");
    res.status(200).json(data);
  });
});

// getImage

router.post("/getImage", upload.single("image"), async (req, res) => {
  const pathToImage = "../public/" + req.file.filename;

  await res.status(200).json({ preview: pathToImage });
});

// ADD ONE FROM FORM

router.post("/add", upload.single("image"), async (req, res) => {
  const url = req.protocol + "://" + req.get("host");

  const params = req.body;

  /**
   * Если есть массив в значениях, тогда парсим его
   */

  // TODO
  params.habitat = JSON.parse(params.habitat);
  params.colors = JSON.parse(params.colors);

  if (req.file) {
    params.image = url + "/public/" + req.file.filename;
  }

  // check on equal parrot

  const existParrot = await Parrot.findOne({ name: params.name });

  if (!!existParrot) {
    res.status(500).json({ status: "fail", msg: "parrot is exist" });
    throw new Error();
  }

  const parrotData = new Parrot(params);

  parrotData
    .save()
    .then((item) => {
      res.status(200).json({ status: "ok", parrot: item });
    })
    .catch((err) => {
      res.status(400).json({ status: "fail" });
    });
});

router.put("/update/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  // check length object id
  if (!ObjectId.isValid(id))
    res.status(500).json({ status: "fail", msg: "wrong id" });

  const url = req.protocol + "://" + req.get("host");

  const params = req.body;

  // TODO переделать
  params.habitat = JSON.parse(params.habitat);
  params.colors = JSON.parse(params.colors);

  if (req.file) {
    params.image = url + "/public/" + req.file.filename;
  }

  const parrot = await Parrot.findByIdAndUpdate(ObjectId(id), params, {
    returnOriginal: false,
  });

  if (!parrot) {
    res.status(500).json({ status: "fail", msg: "error" });
  }

  res.status(200).json({ status: "ok", parrot });
});

// DELETE ONE BY ID

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const parrot = await Parrot.findById(id);

  const { image } = parrot;

  const publicImageName = PUBLIC_DIR + image.split("public/")[1];

  try {
    fs.unlinkSync(publicImageName);
    //file removed
    Parrot.remove({ _id: req.params.id })
      .then((result) => {
        res.status(200).json({ status: "ok" });
      })
      .catch((err) => {
        res.status(400).json({ status: "fail" });
      });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
