import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Auth0Provider } from '@auth0/auth0-react';
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Auth0Provider
      domain="dev-jnqbrnacrvbr8j0f.us.auth0.com"
      clientId="5cDZqejJbOWjkrlhGh0oDv6bDt8XsBcY"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);
