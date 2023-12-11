import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// here we specify the routes for our app
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./Context/ThemeContext";

import Header from "./Components/Header";
// import FetchingIndicator from "./Components/FetchingIndicator";
// import Customers from "./Pages/Customers";
// import Subscriptions from "./Pages/Subscriptions";

import { isDev } from "./Constants.tsx";
import LinkedRoutes from "./Utils/LinkedRoutes.tsx";
import AdminRoutes from "./Utils/AdminRoutes.tsx";
import { Suspense, lazy } from "react";
import Loading from "./Components/Loading.tsx";

const LoginDev = lazy(() => import("./Pages/LoginDev.tsx"));
const FoundIssue = lazy(() => import("./Pages/FoundIssue.tsx"));
const Banner = lazy(() => import("./Components/Banner.tsx"));
const CreateModpackSuccess = lazy(() => import("./Pages/SuggestPack/CreateModpackSuccess.tsx"));
const ArchivedPackListPage = lazy(() => import("./Pages/ArchivedPackListPage.tsx"));
const SuggestedPackListPage = lazy(() => import("./Pages/SuggestedPackListPage.tsx"));
const CreateModpack = lazy(() => import("./Pages/SuggestPack/CreateModpack.tsx"));
const EditModpack = lazy(() => import("./Pages/EditModpack.tsx"));
const AddImage = lazy(() => import("./Pages/SuggestPack/AddImage.tsx"));
const PackDetails = lazy(() => import("./Pages/PackDetails.tsx"));
const PackListPage = lazy(() => import("./Pages/PackListPage.tsx"));
const Login = lazy(() => import("./Pages/Login.tsx"));
const NotFoundPage = lazy(() => import("./Pages/NotFoundPage.tsx"));
const SuggestMPLayout = lazy(() => import("./Pages/SuggestPack/SuggestMPLayout.tsx"));
const Footer = lazy(() => import("./Components/Footer.tsx"));


function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<Loading size="la-lx" fullScreen={true} other="" />} >
        <Banner />
        <Header />
          <Routes>
            <Route path="/" element={<PackListPage />} />
            <Route
              path="pack-details/:modpackId"
              element={<PackDetails category="main" />}
            />
            <Route path="login" element={<Login />} />
            {isDev && <Route path="loginDev" element={<LoginDev />} />}
            <Route path="found-issue" element={<FoundIssue />} />

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
        </Suspense>
        {window.location?.pathname === "/404" ? null : <Footer />}
      </BrowserRouter>

      <ToastContainer limit={2} pauseOnFocusLoss={false} autoClose={2000} />
      <ReactQueryDevtools />
    </ThemeProvider>
  );
}

export default App;
