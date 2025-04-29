import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";  
import MoneyConversion from "./pages/MoneyConversion.jsx";
import Production from "./pages/Production.jsx";
import Header from "./components/Header.jsx";
import { Container, Box } from "@chakra-ui/react";

function App() {
  return (
    <Router>
      <Container
        maxW={"1200px"}
        minH={"100vh"}
        p={4}
        mt={4}
        borderRadius="md"
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
            <Route path="/money_conversion" element={<MoneyConversion />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
}

export default App;