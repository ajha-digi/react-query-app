import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import App from "./App";
import "./index.css";

const queryClinet = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClinet}>
      <App />
      <ReactQueryDevtools initialIsOpen={true}/>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
