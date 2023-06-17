import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, Navigate, RouterProvider,  } from "react-router-dom";
import PackListPage from "./pages/PackListPage";
import PackDetails from "./pages/PackDetails";
import Login from "./pages/Login";
import AddModpack from "./pages/AddModpack";
import { ToastContainer } from "react-toastify";
import NotFoundPage from "./pages/NotFoundPage";
import FetchingIndicator from "./components/FetchingIndicator";


// here we specify the routes for our app
const router = createBrowserRouter([
  {
    path: "/",
    element: <PackListPage />,
    // errorElement: <Errorpage />,
  },
  {
    path: "pack-details/:modpackId",
    element: <PackDetails />,
    // errorElement: <Errorpage />,
  },
  {
    path: "login",
    element: <Login />,
    // errorElement: <Errorpage />,
  },
  {
    path: "add-modpack",
    element: <AddModpack />,
    // errorElement: <Errorpage />,
  },
  {
    path: "404",
    element: <NotFoundPage />,  // Replace with your 404 component
    // errorElement: <Errorpage />,
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
]);


const queryClient = new QueryClient();


function App() {




    return (
      <QueryClientProvider client={queryClient}>
        <main className="min-h-screen flex flex-col font-Tilt text-text  dark:bg-bg ">
            <RouterProvider router={router} />
            <ToastContainer  limit={3} />
          <FetchingIndicator />

        </main>
      </QueryClientProvider>
  )

}

export default App;


