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
import AddMPLayout from "./Pages/SuggestPack/SuggestMPLayout.tsx";
import AddImage from "./Pages/SuggestPack/AddImage.tsx";
import EditModpack from "./Pages/EditModpack";
// import Customers from "./Pages/Customers";
// import Subscriptions from "./Pages/Subscriptions";
import LoginDev from "./Pages/LoginDev";
import { CreateModpack } from "./Pages/SuggestPack/CreateModpack.tsx";
import ArchivedPackListPage from "./Pages/ArchivedPackListPage";
import SuggestedPackListPage from "./Pages/SuggestedPackListPage";

import { UserProvider } from "./Context/UserContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FoundBugs from "./Pages/FoundIssue.tsx";
import { isDev } from "./Constants.tsx";

const queryClient = new QueryClient();

function App() {
  const useAuth = () => {
    const user = JSON.parse(localStorage.getItem("profileData") || "{}");
    if (!user) return false;
    if (user.isAdmin) {
      return true;
    } else {
      return false;
    }
  };
  const isAdmin = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ThemeProvider>
          <div className="flex min-h-screen  flex-col text-text ">
            <BrowserRouter>
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

                {isAdmin && (
                  <>
                    <Route path="add-modpack" element={<AddMPLayout />}>
                      <Route path="create" element={<CreateModpack />} />
                      <Route
                        path="photos/:modpackId"
                        element={<AddImage path="suggest" color="sky" />}
                      />
                    </Route>
                    {/* ------------EDIT MODPACKS------------- */}
                    <Route
                      path="edit-modpack/:modpackId"
                      element={<EditModpack 
                        // category="main" 
                        />}
                    />
                    <Route
                      path="edit-suggested-modpack/:modpackId"
                      element={<EditModpack 
                        // category="suggested"
                      />}
                    />
                    <Route
                      path="edit-archived-modpack/:modpackId"
                      element={<EditModpack 
                        // category="archived" 
                        />}
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
                )}
              </Routes>
              <ToastContainer
                limit={2}
                pauseOnFocusLoss={false}
                autoClose={2000}
              />
            </BrowserRouter>

            {/* <FetchingIndicator /> */}
            {window.location?.pathname === "/404" ? null : <Footer />}
          </div>
          <ReactQueryDevtools />
        </ThemeProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
