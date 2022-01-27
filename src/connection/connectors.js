import { UAuthConnector } from "@uauth/web3-react";
// import { AbstractConnector } from '@web3-react/abstract-connector'
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { supportedChainIds } from "../constants";

// Instanciate your other connectors.
export const injected = new InjectedConnector({
  supportedChainIds: supportedChainIds,
});

export const walletconnect = new WalletConnectConnector({
  supportedChainIds: supportedChainIds,
  infuraId: process.env.REACT_APP_INFURA_ID,
  // rpc: { 1: process.env.REACT_APP_INFURA_ID },
  qrcode: true,
});

export const uauth = new UAuthConnector({
  clientID: process.env?.REACT_APP_CLIENT_ID,
  clientSecret: process.env?.REACT_APP_CLIENT_SECRET,
  redirectUri: process.env?.REACT_APP_REDIRECT_URI,
  // postLogoutRedirectUri: process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI!,
  fallbackIssuer: process.env?.REACT_APP_FALLBACK_ISSUER,

  // Scope must include openid and wallet
  scope: "openid wallet",

  // Injected and walletconnect connectors are required
  connectors: { injected, walletconnect },
});

const connectors = {
  injected,
  walletconnect,
  uauth,
};

export default connectors;
