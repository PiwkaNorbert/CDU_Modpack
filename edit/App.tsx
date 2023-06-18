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
import Header from "./components/Header";
// here we specify the routes for our app
import Footer from "./components/Footer";

const queryClient = new QueryClient();


function App() {

    return (
      <QueryClientProvider client={queryClient}>
        <main className="flex min-h-screen flex-col text-text ">
          <Header />
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

        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
  )

}

export default App;


