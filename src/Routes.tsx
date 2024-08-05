import { createBrowserRouter } from "react-router-dom";
import MyComponent from "./MyComponent";
import FormPage from "./pages/FormPage";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <MyComponent />,
      },
      {
        path: "/form",
        element: <FormPage />,
      },
    ],
  },
]);
export default router;
