import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";  
import MoneyConversion from "./pages/MoneyConversion.jsx";
import Production from "./pages/Production.jsx";
import Carrier from "./pages/Carrier.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { Container, Box } from "@chakra-ui/react";

function App() {
  return (
    <Router>
      <Container
        maxW={"100%"}
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
            <Route path="/carrier" element={<Carrier />} />
            <Route path="/money_conversion" element={<MoneyConversion />} />
          </Routes>
        </Box>
        <Footer/>
      </Container>
    </Router>
  );
}

export default App;