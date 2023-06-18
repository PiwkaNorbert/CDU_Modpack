import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes,  } from "react-router-dom";
import PackListPage from "./pages/PackListPage";
import PackDetails from "./pages/PackDetails";
import Login from "./pages/Login";
import AddModpack from "./pages/AddModpack";
import { ToastContainer } from "react-toastify";
import NotFoundPage from "./pages/NotFoundPage";
import FetchingIndicator from "./components/FetchingIndicator";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // for dev only
import EditModpack from "./pages/EditModpack";
<<<<<<< HEAD
import Header from "./components/Header";
=======
import { useUser,UserProvider } from "./HELPER/UserContext";

>>>>>>> e622e20625c751e9696a07c6ef087b029ed5f2a0
// here we specify the routes for our app
import Footer from "./components/Footer";

const queryClient = new QueryClient();


function App() {

    return (
      <QueryClientProvider client={queryClient}>
<<<<<<< HEAD
        <main className="flex min-h-screen flex-col text-text ">
          <Header />
=======
        <UserProvider>
        <main className="min-h-screen flex flex-col font-Tilt text-text  dark:bg-bg ">
>>>>>>> e622e20625c751e9696a07c6ef087b029ed5f2a0
          <BrowserRouter> 
            <Routes>
              <Route path="/"  element={<PackListPage />} />
              <Route path="pack-details/:modpackId" element={ <PackDetails />} />
              <Route path="login" element={<Login />} />

              <Route path="add-modpack" element={<AddModpack />} />
              <Route path="edit-modpack/:modpackIdin" element={<EditModpack />} />

              <Route path="*" element={<Navigate to="/404" replace />} />
              <Route path="404" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter> 

          <ToastContainer  limit={3} />
          <FetchingIndicator />
        <Footer  />
        </main>
<<<<<<< HEAD

=======
        </UserProvider>
>>>>>>> e622e20625c751e9696a07c6ef087b029ed5f2a0
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
  )

}

export default App;


