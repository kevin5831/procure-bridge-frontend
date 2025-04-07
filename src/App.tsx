
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Create a client
const queryClient = new QueryClient();

import { Router } from "./route";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Router} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
