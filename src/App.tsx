import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Modpack from "./pages/Modpack";

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
]);
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
