const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/Favorite");

// rest of route is in index.js
router.post("/favoriteNumber", (req, res) => {
  // get favorite number from mongo db
  Favorite.find({ movieId: req.body.movieId }).exec((err, info) => {
    if (err) return res.status(400).send(err);

    // then send the number back to front end
    res.status(200).json({ success: true, favoriteNumber: info.length });
  });
});

// favorited
router.post("/favorited", (req, res) => {
  // bring info of favorite list from mongoDB if user clicked favorite
  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, info) => {
    if (err) return res.status(400).send(err);

    // not put movie into favorite yet
    let result = false;
    // if clicked, become ture === movie in favorite list now
    if (info.length !== 0) {
      result = true;
    }

    // then send the number back to front end
    res.status(200).json({ success: true, favorited: result });
  });
});

router.post("/removeFromFavorite", (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, doc });
  });
});

// add favorite number
router.post("/addToFavortie", (req, res) => {
  const favorite = new Favorite(req.body);
  favorite.save((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

module.exports = router;
