import { injected, } from "src/utils/connectors";

export const ConnectorNames = {
    MetaMask: "MetaMask",
};

export const connectorsByName = {
    [ConnectorNames.MetaMask]: injected,
};
