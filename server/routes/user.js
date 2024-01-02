const express = require("express");
const controllers = require("../controllers/user.js");
const router = express.Router();

module.exports = () => {
  router.get("/:id", controllers.getUser);
  router.get("/", controllers.getUsers);

  router.post("/", controllers.createUser);
};

module.exports = router;

// router.get("/", async (req, res) => {
//   try {
//     const user = await User.find();
//     res.send(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.post("/add-to-backlog/:id", async (req, res) => {
//   const user = await User.findOne({
//     _id: req.query.userId,
//     "backlog.id": req.params.id,
//   });
//   console.log(user);

//   fetch(`
//   https://api.themoviedb.org/3/tv/${req.params.id}?api_key=0020709b1b2af025df475654ed1bbaf7`)
//     .then((res) => res.json())
//     .then(async (json) => {
//       const seasons = await Promise.all(
//         json.seasons.map(async (season) => {
//           const res = await fetch(
//             `https://api.themoviedb.org/3/tv/${req.params.id}/season/${season.season_number}?api_key=0020709b1b2af025df475654ed1bbaf7`
//           );

//           const data = await res.json();

//           const episodes = data.episodes.map((episode) => {
//             return {
//               id: episode.id,
//               episode_number: episode.episode_number,
//               episode_name: episode.name,
//               hasWatched: false,
//             };
//           });

//           return {
//             season_number: data.season_number,
//             poster_path: data.poster_path,
//             episodes,
//           };
//         })
//       );

//       const d = {
//         id: json.id,
//         name: json.name,
//         number_of_episodes: json.number_of_episodes,
//         seasons,
//       };

//       const user = await User.findOneAndUpdate(
//         { _id: req.query.userId },
//         {
//           $push: {
//             backlog: d,
//           },
//         },
//         { new: true }
//       );

//       res.json(d);
//     });
// });

// router.get("/:id", (req, res) => {});

// router.patch("/:id", (req, res) => {});

// router.delete("/:id", (req, res) => {});
