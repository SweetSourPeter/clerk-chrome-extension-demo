import "../style.css";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

// Import the layouts
import { RootLayout } from "./layouts/root-layout";

// Import the components
import { SignInPage } from "./routes/sign-in";
import { SignUpPage } from "./routes/sign-up";
import { Settings } from "./routes/settings";
import { SDKFeatures } from "./routes/sdk-features";
import { Home } from "./routes/home";
import { DashboardPage } from "./routes/dashboard";

// Create the router
// This removes the need for an App.tsx file
const router = createMemoryRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/sign-in", element: <SignInPage /> },
      { path: "/sign-up", element: <SignUpPage /> },
      { path: "/settings", element: <Settings /> },
      { path: "/sdk-features", element: <SDKFeatures /> },
      { path: "/dashboard", element: <DashboardPage /> }
    ],
  },
]);

export default function PopupIndex() {
  return (
    <RouterProvider router={router} />
  )
}
