import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MoneyConversion from "./pages/MoneyConversion.jsx";
import Production from "./pages/Production.jsx";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/money_conversion">Money Conversion</Link>
          </li>
        </ul>
      </nav>
      
      <Routes>
        <Route path="/" element={<Production />} />
        <Route path="/money_conversion" element={<MoneyConversion />} />
      </Routes>
    </Router>
  );
}

export default App;
