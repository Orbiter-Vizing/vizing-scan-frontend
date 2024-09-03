import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useAppStyles } from "src/app.styles";
import { Layout } from "src/views/core/layout/layout.view";
import { Messages } from "src/views/messages/messages.view";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Messages />,
  },
]);

export const App = (): JSX.Element => {
  useAppStyles();

  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
};
