import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PackListPage from "./pages/PackListPage";
import PackDetails from "./pages/PackDetails";
import Login from "./pages/Login";
import AddModpack from "./pages/AddModpack";
import { ToastContainer } from "react-toastify";

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
]);

const queryClient = new QueryClient();

function App() {

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

// Whenever the user explicitly chooses light mode
localStorage.theme = 'light'

// Whenever the user explicitly chooses dark mode
localStorage.theme = 'dark'

// Whenever the user explicitly chooses to respect the OS preference
localStorage.removeItem('theme')


    return (
      <QueryClientProvider client={queryClient}>
        <main className="min-h-screen flex flex-col items-stretch font-Tilt text-bkg-100 bg-bkg-100 dark:bg-bkg-50 ">
            <RouterProvider router={router} />
      <ToastContainer  limit={3} />

        </main>
      </QueryClientProvider>
  )

}

export default App;


