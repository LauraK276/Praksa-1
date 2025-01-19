import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./stranice/HomePage";
import Kviz from "./stranice/Kviz";
import Rezultat from "./stranice/Rezultat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<Kviz />} />
        <Route path="/rezultat" element={<Rezultat />} />
      </Routes>
    </Router>
  );
}

export default App;
