const express = require("express");
const router = express.Router();
const Anime = require("../models/anime");

const fs = require("fs");
const xml2js = require("xml2js");
const util = require("util");

const parser = new xml2js.Parser();

// fs = require("fs");
// var parser = require("xml2json");

function readAndParseXML(filePath, callback) {
  try {
    // Read the XML file
    const xmlData = fs.readFileSync(filePath, "utf-8");

    // Parse the XML data
    xml2js.parseString(xmlData, (err, result) => {
      if (err) {
        console.error("Error parsing XML:", err);
        callback(err, null);
      } else {
        // Pass the parsed XML data to the callback function
        callback(null, result);
      }
    });
  } catch (error) {
    console.error("Error reading XML file:", error);
    callback(error, null);
  }
}

router.get("/something", async (req, res) => {
  readAndParseXML("data/anime-titles.xml", (err, result) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      // Return the parsed XML data
      const animeList = result.animetitles.anime;

      const filteredAnimeList = [];

      animeList.forEach((anime) => {
        const titles = anime.title || [];

        titles.forEach((title) => {
          const { $ } = title || {};
          const language = $ && $["xml:lang"];
          const type = $ && $["type"];
          const { aid } = anime.$ || {};

          if (language === "en" && type === "official" && title._) {
            filteredAnimeList.push({ aid, title: title._ });
          }
        });
      });

      const requestedAnime = filteredAnimeList.find(
        (anime) => anime.title.toLowerCase() === req.query.title.toLowerCase()
      );

      //

      // fech

      fetch(
        `http://api.anidb.net:9001/httpapi?request=anime&client=anilogclient&clientver=1&protover=1&aid=${requestedAnime.aid}`
      )
        .then((res) => res.text())
        .then((data) => {
          xml2js.parseString(data, (err, result) => {
            if (err) {
              console.error("Error parsing XML:", err);
            } else {
              // Pass the parsed XML data to the callback function
              console.log(result.anime);
              const { titles } = result.anime ?? [];
              // console.log(titles);
              // titles.forEach((titles) => {
              //   console.log(title);
              // });
              // console.log(result.anime.episodes[0].episode.title);

              // result.anime.episodes.forEach(({ episode }) => {
              //   console.log(episode);
              // });
              // const ep =
              //   result.anime.episodes.map(({ episode }) => {
              //     const englishTitle = episode.title?.find(
              //       (title) => title.$["xml:lang"] === "en"
              //     )._;
              //     return {
              //       title: englishTitle,
              //       epno: episode.epno,
              //     };
              //   }) ?? [];
              // console.log(ep);
              res.json({
                title: "",
                // episodeCount: Number(result.anime.episodecount[0]),
                image: result.anime.picture,
                episodes: result.anime.episodes,
              });
              // res.json(result.anime);
            }
          });
        });
    }
  });

  // try {
  //   const anime = await Anime.find();
  //   res.send(anime);
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
});

router.post("/", (req, res) => {
  const anime = new Anime();
});

router.get("/:id", (req, res) => {});

router.patch("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
