import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";  
import Production from "./pages/Production.jsx";
import Career from "./pages/Career.jsx";
import Hobby from "./pages/Hobby.jsx";
import Skill from "./pages/Skill.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { Container, Box } from "@chakra-ui/react";

function App() {
  return (
    <Router>
      <Box minH="100vh">
        <Header />
        <Box
          width="100%"
          minH="calc(100vh - 80px)"
          pt={{ base: "60px", md: "70px" }} // ヘッダーの高さ分のpadding-top
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/production" element={<Production />} />
            <Route path="/career" element={<Career />} />
            <Route path="/hobby" element={<Hobby />}/>
            <Route path="/skill" element={<Skill />}/>
          </Routes>
        </Box>
        <Footer/>
      </Box>
    </Router>
  );
}

export default App;