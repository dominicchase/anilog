import "./App.css";
import { useEffect, useState } from "react";
import xmljs from "xml-js";
import xml from "./data/anime-titles.xml";

function App() {
  const [animeData, setAnimeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const xmlData = await fetch(xml).then((response) => response.text());

        const json = xmljs.xml2js(xmlData, { compact: true, spaces: 4 });
        const { anime } = json.animetitles;

        const titles = [];

        for (var i = 0; i < anime.length; i++) {
          if (Array.isArray(anime[i]?.title)) {
            const title = anime[i].title.find(
              (title) =>
                title._attributes?.["xml:lang"] === "en" &&
                title._attributes?.["type"] === "official"
            );

            if (title) {
              titles.push({
                id: anime[i]._attributes.aid,
                title: title._text,
              });
            }
          }

          // what if it's not an array ???
        }

        setAnimeData(titles);
      } catch (error) {
        console.error("Error fetching/parsing XML data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(animeData.find((anime) => anime.title.includes("Soul Eater")).id);

  console.log(animeData);

  return <p>Loading anime information...</p>;
}
export default App;
