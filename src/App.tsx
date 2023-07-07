import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PackListPage from "./Pages/PackListPage";
import PackDetails from "./Pages/PackDetails";
import Login from "./Pages/Login";
import AddModpack from "./Pages/AddModpack";
import { ToastContainer } from "react-toastify";
import NotFoundPage from "./Pages/NotFoundPage";
import FetchingIndicator from "./Components/FetchingIndicator";
import "react-toastify/dist/ReactToastify.css";
import EditModpack from "./Pages/EditModpack";
import Header from "./Components/Header";
// here we specify the routes for our app
import Footer from "./Components/Footer";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./Context/ThemeContext";
import { useUser } from "./Context/useUser";

import { Checkout, CheckoutSuccess, CheckoutFail } from "./Pages/Checkout";
import Payments from "./Pages/Payments";
import Customers from "./Pages/Customers";
import Subscriptions from "./Pages/Subscriptions";

function App() {
  const { user } = useUser();
  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col  text-text">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<PackListPage />} />
            <Route path="pack-details/:modpackId" element={<PackDetails />} />
            <Route path="login" element={<Login />} />

            <Route path="*" element={<Navigate to="/404" replace />} />
            <Route path="404" element={<NotFoundPage />} />
            {user?.isLoggedIn && (
              <>
                <Route path="/checkout/:modpackId" element={<Checkout />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/success" element={<CheckoutSuccess />}/>
                <Route path="/failed" element={<CheckoutFail /> } />
              </>
            )}
            {/*
            <Route path="/customers">
              <Customers />
            </Route>
            <Route path="/subscriptions">
              <Subscriptions />
            </Route>
            */}

            {user?.isAdmin && (
              <>
                <Route path="add-modpack" element={<AddModpack />} />
                <Route
                  path="edit-modpack/:modpackId"
                  element={<EditModpack />}
                />
              </>
            )}
          </Routes>
          <ToastContainer limit={2} pauseOnFocusLoss={false} autoClose={2000} />
        </BrowserRouter>

        <FetchingIndicator />
        {window.location.pathname === "/404" ? null : <Footer />}
      </div>
      <ReactQueryDevtools />
    </ThemeProvider>
  );
}

export default App;
