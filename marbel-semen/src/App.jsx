import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../src/components/LandingPage/LandingPage";
import AboutUs from "./components/AboutUs/AboutUs";
import ContactUs from "./components/ContactUs/ContactUs";

export default function App() {
  return (
    <Router basename="/Marbel-Semen-FrontEnd">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}
