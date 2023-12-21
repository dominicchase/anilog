const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/add-to-backlog/:id", async (req, res) => {
  fetch(`
  https://api.themoviedb.org/3/tv/${req.params.id}?api_key=0020709b1b2af025df475654ed1bbaf7`)
    .then((res) => res.json())
    .then(async (json) => {
      console.log(json.id);
      console.log(json.name);
      console.log(json.seasons);
      console.log(json.number_of_episodes);
      const seasons = await Promise.all(
        json.seasons.map(async (season) => {
          const res = await fetch(
            `https://api.themoviedb.org/3/tv/${req.params.id}/season/${season.season_number}?api_key=0020709b1b2af025df475654ed1bbaf7`
          );

          const data = await res.json();

          const episodes = data.episodes.map((episode) => {
            return {
              id: episode.id,
              episode_number: episode.episode_number,
              episode_name: episode.name,
              hasWatched: false,
            };
          });

          return {
            season_number: data.season_number,
            poster_path: data.poster_path,
            episodes,
          };
        })
      );

      const d = {
        id: json.id,
        name: json.name,
        number_of_episodes: json.number_of_episodes,
        seasons,
      };

      const user = await User.findOneAndUpdate(
        { _id: req.query.userId },
        {
          $push: {
            backlog: d,
          },
        },
        { new: true }
      );

      console.log(user);

      res.json(d);
    });
  // https://api.jikan.moe/v4/anime?q=soul eater
  // fetch(`https://api.jikan.moe/v4/anime?q=${req.body.anime}`)
  //   .then((res) => res.json())
  //   .then(async (json) => {
  //     const { mal_id } = json.data.find(
  //       (anime) => anime.title.toLowerCase() === req.body.anime.toLowerCase()
  //     );
  //     const user = await User.findOneAndUpdate(
  //       { _id: req.body.user },
  //       { $push: { backlog: { title: req.body.anime, mal_id } } }
  //     );
  //     console.log(user);
  //     fetch(`https://api.jikan.moe/v4/anime/${mal_id}/episodes`)
  //       .then((res) => res.json())
  //       .then((json) => {
  //         // what if there are multiple pages?
  //         const titles = json.data.map((episode) => episode.title);
  //         console.log(titles);
  //       });
  //   });
});

router.get("/:id", (req, res) => {});

router.patch("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
