const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");

// POST /users/:userId/favorites/:mediaId?title="batman"
router.post("/:userId/favorites/:mediaId", async (req, res) => {
  const movie = {
    imdbID: req.params.mediaId,
    title: req.query.title,
  };

const user = await User.findById(req.params.userId)
user.favouriteMovie = movie
await user.save()
console.log(user);
//   await User.findByIdAndUpdate(req.params.userId, {
//     favoriteMovie: movie,
//   });

  res.redirect(`/media/${req.params.mediaId}`);
});

// DELETE /users/:userId/favorites/:mediaId
router.delete("/:userId/favorites/:mediaId", async (req, res) => {
//   const user = await User.findByIdAndUpdate(req.params.userId, {
//     favoriteMovie: null,
//   }, {new: true});
// console.log(user);
const user = await User.findById(req.params.userId)
user.favouriteMovie.deleteOne()
await user.save()
console.log(user);

  res.redirect(`/media/${req.params.mediaId}`);
});

module.exports = router;
