import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FetchingIndicator from "./Components/FetchingIndicator";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Components/Header";
// here we specify the routes for our app
import Footer from "./Components/Footer";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./Context/ThemeContext";
import { useUser } from "./Context/useUser";

import { Checkout, CheckoutSuccess, CheckoutFail } from "./Pages/Checkout";
import PackListPage from "./Pages/PackListPage";
import PackDetails from "./Pages/PackDetails";
import Login from "./Pages/Login";
import NotFoundPage from "./Pages/NotFoundPage";
import AddMPLayout from "./Pages/addPack/AddMPLayout";
import AddImage from "./Pages/addPack/AddImage";
import EditModpack from "./Pages/EditModpack";
// import Customers from "./Pages/Customers";
// import Subscriptions from "./Pages/Subscriptions";
import LoginDev from "./Pages/LoginDev";
import { CreateModpack } from "./Pages/addPack/CreateModpack";

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
            <Route path="loginDev" element={<LoginDev />} />

            <Route path="*" element={<Navigate to="/404" replace />} />
            <Route path="404" element={<NotFoundPage />} />
            <Route
              path="/payment-succeeded/:modpackId"
              element={<CheckoutSuccess />}
            />
            <Route
              path="/payment-failed/:modpackId"
              element={<CheckoutFail />}
            />

            {user?.isLoggedIn && (
              <>
                <Route path="/checkout/:modpackId" element={<Checkout />} />
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
                <Route path="add-modpack" element={<AddMPLayout />}>
                  <Route path="create" element={<CreateModpack />} />
                  <Route path="photos/:modpackId" element={<AddImage />} />
                </Route>
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
