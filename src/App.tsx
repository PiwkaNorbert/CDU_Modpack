import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Modpack from "./pages/Modpack";
import Login from "./pages/Login";
import AddModpack from "./pages/AddModpack";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    // errorElement: <Errorpage />,
  },
  {
    path: "modpack/:modpackId",
    element: <Modpack />,

    // errorElement: <Errorpage />,
  },
  {
    path: "login",
    element: <Login />,

    // errorElement: <Errorpage />,
  },
  {
    path: "modpacks",
    element: <AddModpack />,

    // errorElement: <Errorpage />,
  },
]);

const queryClient = new QueryClient();

function App() {

    return (
      <QueryClientProvider client={queryClient}>
        <main className="items-start justify-center h-screen  font-Tilt text-bkg-100">
            <RouterProvider router={router} />
        </main>
      </QueryClientProvider>
  )

}

export default App;


