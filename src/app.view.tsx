import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useAppStyles } from "src/app.styles";
import { Layout } from "src/views/core/layout/layout.view";
import { Messages } from "src/views/messages/messages.view";
import { routes } from "src/routes";

const router = createBrowserRouter([
  {
    path: routes.messages.path,
    element: <Messages />,
  },
  {
    path: routes.protocols.path,
    element: <div>protocols page</div>,
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
