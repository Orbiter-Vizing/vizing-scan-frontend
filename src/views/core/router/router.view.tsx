import { ComponentType, FC } from "react";
import {
  // Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { RouteId, routes } from "src/routes";
import { Messages } from "src/views/messages/messages.view";
import { Protocols } from "src/views/protocols/protocols.view";

const components: Record<RouteId, ComponentType> = {
  messages: Messages,
  protocols: Protocols,
};

export const Router: FC = () => {
  return (
    <Routes>
      {Object.values(routes).map(({ id, path }) => {
        const Component = components[id];
        return <Route element={<Component />} key={path} path={path} />;
      })}
      {/* <Route element={<Navigate to={routes.home.path} />} path="*" /> */}
    </Routes>
  );
};
