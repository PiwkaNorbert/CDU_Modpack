import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Components/Header";
// here we specify the routes for our app
import Footer from "./Components/Footer";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./Context/ThemeContext";

import PackListPage from "./Pages/PackListPage";
import PackDetails from "./Pages/PackDetails";
import Login from "./Pages/Login";
// import FetchingIndicator from "./Components/FetchingIndicator";
import NotFoundPage from "./Pages/NotFoundPage";
import SuggestMPLayout from "./Pages/SuggestPack/SuggestMPLayout.tsx";
import AddImage from "./Pages/SuggestPack/AddImage.tsx";
import EditModpack from "./Pages/EditModpack";
// import Customers from "./Pages/Customers";
// import Subscriptions from "./Pages/Subscriptions";
import LoginDev from "./Pages/LoginDev";
import { CreateModpack } from "./Pages/SuggestPack/CreateModpack.tsx";
import ArchivedPackListPage from "./Pages/ArchivedPackListPage";
import SuggestedPackListPage from "./Pages/SuggestedPackListPage";

import FoundBugs from "./Pages/FoundIssue.tsx";
import { isDev } from "./Constants.tsx";
import CreateModpackSuccess from "./Pages/SuggestPack/CreateModpackSuccess.tsx";
import LinkedRoutes from "./Utils/LinkedRoutes.tsx";
import AdminRoutes from "./Utils/AdminRoutes.tsx";
import Banner from "./Components/Banner.tsx";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Banner />
        <Header />
        <Routes>
          <Route path="/" element={<PackListPage />} />
          <Route
            path="pack-details/:modpackId"
            element={<PackDetails category="main" />}
          />
          <Route path="login" element={<Login />} />
          <Route path="loginDev" element={<LoginDev />} />
          {isDev && <Route path="loginDev" element={<LoginDev />} />}
          <Route path="found-issue" element={<FoundBugs />} />

          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="404" element={<NotFoundPage />} />

          {/* ------------LINKED ROUTES------------- */}

          <Route element={<LinkedRoutes />}>
            <Route path="suggest-modpack" element={<SuggestMPLayout />}>
              <Route path="create" element={<CreateModpack />} />

              <Route
                path="photos/:modpackId"
                element={<AddImage path="suggest" color="sky" />}
              />
              {/* thank you for submitting pack */}
              <Route path="success" element={<CreateModpackSuccess />} />
            </Route>
          </Route>
          {/* ------------ADMIN ROUTES------------- */}

          <Route element={<AdminRoutes />}>
            <>
              {/* ------------EDIT MODPACKS------------- */}
              <Route
                path="edit-modpack/:modpackId"
                element={
                  <EditModpack
                  // category="main"
                  />
                }
              />
              <Route
                path="edit-suggested-modpack/:modpackId"
                element={
                  <EditModpack
                  // category="suggested"
                  />
                }
              />
              <Route
                path="edit-archived-modpack/:modpackId"
                element={
                  <EditModpack
                  // category="archived"
                  />
                }
              />

              {/* ------------LIST MODPACKS------------- */}
              <Route
                path="list-archived-packs"
                element={<ArchivedPackListPage />}
              />
              <Route
                path="list-suggested-packs"
                element={<SuggestedPackListPage />}
              />

              {/* ------------MODPACK DETAILS------------- */}
              <Route
                path="suggested-pack-details/:modpackId"
                element={<PackDetails category="suggested" />}
              />
              <Route
                path="archived-pack-details/:modpackId"
                element={<PackDetails category="archived" />}
              />
            </>
          </Route>
        </Routes>
        {window.location?.pathname === "/404" ? null : <Footer />}
      </BrowserRouter>

      <ToastContainer limit={2} pauseOnFocusLoss={false} autoClose={2000} />
      <ReactQueryDevtools />
    </ThemeProvider>
  );
}

export default App;
