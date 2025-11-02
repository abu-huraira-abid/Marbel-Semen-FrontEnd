import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LandingPage from "../src/components/LandingPage/LandingPage";
import AboutUs from "./components/AboutUs/AboutUs";
import ContactUs from "./components/ContactUs/ContactUs";
import BullBattery from "./components/BullBattery/BullBattery";
import ViewStat from "./components/ViewStatBull/ViewStat";
import BullCompare from "./components/BullCompare/BullCompare";
import AddToCart from "./components/AddToCartBull/AddToCart";
import Account from "./components/Register/Account";
import Dashboard from "./components/DashboardUI/Dashboard/Dashboard";
// import BullView from "./components/DashboardUI/BullManagement/BullView";
import AnimalView from "./components/DashboardUI/BullManagement/AnimalView";
import OrderManagement from "./components/DashboardUI/OrderManagement/OrderManagement";
import UsersManagement from "./components/DashboardUI/Users/UsersManagement";
import Setting from "./components/DashboardUI/Setting/Setting";
import BullPrice from "./components/DashboardUI/BullManagement/DynamicPrice";
import CustomerQueries from "./components/DashboardUI/CustomerQueries/CustomerQueries";
import CartStructure from "./components/Cart/CartStructure";
import CheckoutStructure from "./components/Checkout/CheckoutStructure";
import OrderHistoryStructure from "./components/OrderHistory/OrderHistoryStructure";
import Process from "./components/Process/Process";
import BullInventory from "./components/DashboardUI/BullInventory/BullInvetory";
import UserDashboard from "./components/UserDashboard/Dashboard.jsx/UserDashboard";
import UserOrderHistory from "./components/UserDashboard/OrderHistory/UserOrderHistory";
import UserSetting from "./components/UserDashboard/Setting/Setting";
import MyWishList from "./components/UserDashboard/MyWishList/MyWishList";
import MonthlyReports from "./components/DashboardUI/MonthlyReports/MonthlyReports";
import EmbryoPage from "./components/EmbryoPage/EmbryoPage";
import SemenPage from "./components/Semen/SemenPage";
import SpecialPage from "./components/Special/SpecialPage";
import EntityManagement from "./components/DashboardUI/BullManagement/EntityManagement";
import DynamicPrice from "./components/DashboardUI/BullManagement/DynamicPrice";
import ViewStatEmbryo from "./components/ViewStatEmbryo/ViewStat";
import ViewStatSemen from "./components/ViewStatSemen/ViewStatSemen";
import AddToCartEmbryo from "./components/AddToCartEmbryo/AddToCartEmbryo";
import AddToCartSemen from "./components/AddToCartSemen/AddToCartSemen";

export default function App() {
  return (
    <Router basename="/Marbel-Semen-FrontEnd">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/bull-battery" element={<BullBattery />} />
        <Route path="/view-stat" element={<ViewStat />} />
        <Route path="/view-stat-embryo" element={<ViewStatEmbryo />} />
        <Route path="/view-stat-semen" element={<ViewStatSemen />} />
        <Route path="/bull-compare" element={<BullCompare />} />
        <Route path="/add-cart" element={<AddToCart />} />
        <Route path="/add-cart-embryo" element={<AddToCartEmbryo />} />
        <Route path="/add-cart-semen" element={<AddToCartSemen />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/dashboard" element={<Dashboard />} />
        <Route path="/account/bulls" element={<EntityManagement />} />
        <Route path="/account/:entityType/:id" element={<AnimalView />} />
        <Route
          path="/account/:entityType/price/:id"
          element={<DynamicPrice />}
        />
        <Route path="/account/orders" element={<OrderManagement />} />
        <Route path="/account/users" element={<UsersManagement />} />
        <Route path="/account/settings" element={<Setting />} />
        <Route path="/account/queries" element={<CustomerQueries />} />
        <Route path="/account/inventory" element={<BullInventory />} />
        <Route path="/account/reports" element={<MonthlyReports />} />
        <Route path="/cart" element={<CartStructure />} />
        <Route path="/checkout" element={<CheckoutStructure />} />
        <Route path="/order-history" element={<OrderHistoryStructure />} />
        <Route path="/process" element={<Process />} />
        <Route path="/account/user/dashboard" element={<UserDashboard />} />
        <Route
          path="/account/user/order-history"
          element={<UserOrderHistory />}
        />
        <Route path="/account/user/settings" element={<UserSetting />} />
        <Route path="/account/user/wishlist" element={<MyWishList />} />
        <Route path="/embryo" element={<EmbryoPage />} />
        <Route path="/semen" element={<SemenPage />} />
        <Route path="/specials" element={<SpecialPage />} />
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
