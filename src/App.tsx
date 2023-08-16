import "./App.css";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import ListMovies from "./pages/ListPage/ListPage";
function App() {
  return (
    <div className="parent">
      <Header />
      <div className="pages">
        <Routes>
          <Route path="/" element={<ListMovies />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
