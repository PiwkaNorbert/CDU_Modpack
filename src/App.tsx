import "./index.css";
import { useEffect } from "react";
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
import ArchivedPackListPage from "./Pages/ArchivedPackListPage";
import SuggestedPackListPage from "./Pages/SuggestedPackListPage";
import SuggestedPackDetails from "./Pages/SuggestedPackDetails";

function App() {
  const { user, setUser } = useUser();
  // check if the user in local storage is an admin or not and set the state accordingly to show the admin panel or not
  useEffect(() => {
    const localStorageProfileData = localStorage.getItem("profileData");
    if (localStorageProfileData) {
      // check if the token is expired or not and if it is then log the user out
      const parsedData = JSON.parse(localStorageProfileData);
      const tokenExpirationDate = new Date(parsedData?.tokenExpiry);
      const currentDate = new Date();
      if (tokenExpirationDate < currentDate) {
        localStorage.removeItem("profileData");
        setUser(undefined);
      }
      setUser(JSON.parse(localStorageProfileData));
    }
  }, []);

  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col text-text ">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<PackListPage />} />
            <Route path="pack-details/:modpackId" element={<PackDetails />} />
            <Route path="login" element={<Login />} />
            <Route path="loginDev" element={<LoginDev />} />

            {/* <Route path="*" element={<Navigate to="/404" replace />} />
            <Route path="404" element={<NotFoundPage />} /> */}

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
                <Route
                  path="archived-modpacks"
                  element={<ArchivedPackListPage />}
                />
                <Route
                  path="suggested-modpacks"
                  element={<SuggestedPackListPage />}
                />

                <Route
                  path="suggested-pack-details/:modpackId"
                  element={<SuggestedPackDetails />}
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
