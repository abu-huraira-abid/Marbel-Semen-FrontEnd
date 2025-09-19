import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LandingPage from "../src/components/LandingPage/LandingPage";
import AboutUs from "./components/AboutUs/AboutUs";
import ContactUs from "./components/ContactUs/ContactUs";
import BullBattery from "./components/BullBattery/BullBattery";
import ViewStat from "./components/ViewStat/ViewStat";
import BullCompare from "./components/BullCompare/BullCompare";
import AddToCart from "./components/AddToCart/AddToCart";
import Account from "./components/Register/Account";
import Dashboard from "./components/DashboardUI/Dashboard/Dashboard";
import BullsManagement from "./components/DashboardUI/BullManagement/BullsManagement";
import BullView from "./components/DashboardUI/BullManagement/BullView";
import OrderManagement from "./components/DashboardUI/OrderManagement/OrderManagement";
import UsersManagement from "./components/DashboardUI/Users/UsersManagement";
import Setting from "./components/DashboardUI/Setting/Setting";
import BullPrice from "./components/DashboardUI/BullManagement/BullPrice";
import CustomerQueries from "./components/DashboardUI/CustomerQueries/CustomerQueries";

export default function App() {
  return (
    <Router basename="/Marbel-Semen-FrontEnd">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/bull-battery" element={<BullBattery />} />
        <Route path="/view-stat" element={<ViewStat />} />
        <Route path="/bull-compare" element={<BullCompare />} />
        <Route path="/add-cart" element={<AddToCart />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/dashboard" element={<Dashboard />} />
        <Route path="/account/bulls" element={<BullsManagement />} />
        <Route path="/account/bulls/:id" element={<BullView />} />
        <Route path="/account/bulls/price/:id" element={<BullPrice />} />
        <Route path="/account/orders" element={<OrderManagement />} />
        <Route path="/account/users" element={<UsersManagement />} />
        <Route path="/account/settings" element={<Setting />} />
        <Route path="/account/queries" element={<CustomerQueries />} />
      </Routes>

      {/* 🔥 Toast container must be mounted once */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Router>
  );
}
