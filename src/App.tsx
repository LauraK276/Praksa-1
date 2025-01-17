import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./stranice/HomePage";
import QuizPage from "./stranice/Kviz";
import ResultPage from "./stranice/Rezultat";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
