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
      <Container
        maxW={"container.xl"}
        minH={"100vh"}
        p={0}
        mt={0}
        borderRadius="md"
        mx="auto"
      >
        <Header />
        <Box
          width="100%"
          minH="80vh" 
          mt={4}
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
      </Container>
    </Router>
  );
}

export default App;