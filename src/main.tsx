import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UserProvider } from "./Context/UserContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const queryClient = new QueryClient();

export const stripePromise = loadStripe(
  "pk_test_51NQxDnL5T85uKxdIMo0DT5909UKJHiWZzOdAqx5w87slUndmCNZF2gFeKhExWGfyE9WA5eDp0zG3oMg2AdoYBY6b00uvq1Zud7"
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <App />
        </UserProvider>
      </QueryClientProvider>
    </Elements>
  </React.StrictMode>
);
