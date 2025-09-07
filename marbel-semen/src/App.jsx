import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../src/components/LandingPage/LandingPage";
import AboutUs from "./components/AboutUs/AboutUs";
import ContactUs from "./components/ContactUs/ContactUs";
import BullBattery from "./components/BullBattery/BullBattery";
import ViewStat from "./components/ViewStat/ViewStat";

export default function App() {
  return (
    <Router basename="/Marbel-Semen-FrontEnd">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/bull-battery" element={<BullBattery />} />
        <Route path="/view-stat" element={<ViewStat />} />
      </Routes>
    </Router>
  );
}
