import { ComponentType, FC } from "react";
import { Route, Routes } from "react-router-dom";

import { RouteId, routes } from "src/routes";
import { Messages } from "src/views/messages/messages.view";
import { Protocols } from "src/views/protocols/protocols.view";
import { TxDetails } from "src/views/tx-details/tx-details.view";
import { ProtocolDetails } from "src/views/protocol-details/protocol-details.view";
import { AddressTxList } from "src/views/address-tx-list/address-tx-list.view";

const components: Record<RouteId, ComponentType> = {
  messages: Messages,
  protocols: Protocols,
  txDetails: TxDetails,
  protocolDetails: ProtocolDetails,
  addressTxList: AddressTxList,
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
