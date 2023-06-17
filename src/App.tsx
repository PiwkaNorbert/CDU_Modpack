import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider, Routes,  } from "react-router-dom";
import PackListPage from "./pages/PackListPage";
import PackDetails from "./pages/PackDetails";
import Login from "./pages/Login";
import AddModpack from "./pages/AddModpack";
import { ToastContainer } from "react-toastify";
import NotFoundPage from "./pages/NotFoundPage";
import FetchingIndicator from "./components/FetchingIndicator";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import EditModpack from "./pages/EditModpack";
import { useUser } from "./HELPER/UserContext";

// here we specify the routes for our app


const queryClient = new QueryClient();


function App() {
  const {user} = useUser()

    return (
      <QueryClientProvider client={queryClient}>
        <main className="min-h-screen flex flex-col font-Tilt text-text  dark:bg-bg ">
          <BrowserRouter> 
            <Routes>
              <Route path="/"  element={<PackListPage />} />
              <Route path="pack-details/:modpackId" element={ <PackDetails />} />
              <Route path="login" element={<Login />} />

              <Route path="add-modpack" element={user?.isAdmin ? <AddModpack /> : <Navigate to="/404" /> } />
              <Route path="edit-modpack/:modpackIdin" element={user?.isAdmin ? <EditModpack /> : <Navigate to="/404"  />} />

              <Route path="*" element={<Navigate to="/404" replace />} />
              <Route path="404" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter> 

          <ToastContainer  limit={3} />
          <FetchingIndicator />
        </main>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
  )

}

export default App;


