import "./App.css";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import ListMovies from "./pages/ListPage/ListPage";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
function App() {
  return (
    <div className="parent">
      <Header />
      <div className="pages">
        <Routes>
          <Route path="/" element={<ListMovies />} />
          <Route path="/search" element={<ListMovies />} />
          <Route path="/details" element={<DetailsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
