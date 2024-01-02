/* eslint-disable react/prop-types */
import { BrowserRouter } from "react-router-dom";
import { Explore } from "./pages/explore";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Search } from "./pages/search";
import { Backlog } from "./pages/backlog";

function App() {
  let component;

  switch (window.location.pathname) {
    case "/":
      component = <Explore />;
      break;

    case "/search":
      component = <Search />;
      break;

    case "/backlog":
      component = <Backlog />;
      break;
  }
  return (
    <div className="container">
      <BrowserRouter>
        <Navbar />
        {component}
      </BrowserRouter>
    </div>
  );
}

// const [search, setSearch] = useState("");

// const handleClick = () => {
//   fetch(
//     `https://api.themoviedb.org/3/search/tv?with_keywords=210024&page=1&query=${search}`,
//     {
//       headers: {
//         Authorization: `Bearer ${import.meta.env.REACT_APP_MOVIE_DB_TOKEN}`,
//       },
//     }
//   )
//     .then((res) => res.json())
//     .then((json) => setAnimeData(json));
// };

export default App;
