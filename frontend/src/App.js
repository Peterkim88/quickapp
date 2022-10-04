import CustomerHeader from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/Homepage";
import ProductPage from "./pages/Productpage";

function App() {
  return (
    <Router>
      <CustomerHeader />

      <main className="py-3">
        <Container>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </Container>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
