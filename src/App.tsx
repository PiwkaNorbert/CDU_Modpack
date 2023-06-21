import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import { useUser } from "./Context/useUser";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  const { user } = useUser();
  console.log(user);
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex min-h-screen flex-col text-text ">
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PackListPage />} />
            <Route path="pack-details/:modpackId" element={<PackDetails />} />
            <Route path="login" element={<Login />} />

            <Route path="*" element={<Navigate to="/404" replace />} />
            <Route path="404" element={<NotFoundPage />} />
            {/* {user?.isAdmin && ( */}
              <>
                <Route path="add-modpack" element={<AddModpack />} />
                <Route
                  path="edit-modpack/:modpackId"
                  element={<EditModpack />}
                />
              </>
            {/* )} */}
          </Routes>
          <ToastContainer limit={3} pauseOnFocusLoss={false} autoClose={2000} />
        </BrowserRouter>

        <FetchingIndicator />
        {window.location.pathname === "/404" ? null : <Footer />}
      </main>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
