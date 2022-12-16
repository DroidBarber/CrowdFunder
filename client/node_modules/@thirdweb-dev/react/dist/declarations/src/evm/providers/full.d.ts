import type { GnosisSafeConnector } from "../connectors/gnosis-safe";
import type { MagicConnector } from "../connectors/magic";
import { Chain, SupportedChain } from "../constants/chain";
import { ThirdwebAuthConfig } from "../contexts/thirdweb-auth";
import { QueryClient } from "@tanstack/react-query";
import { SDKOptions } from "@thirdweb-dev/sdk";
import type { ThirdwebStorage } from "@thirdweb-dev/storage";
import React from "react";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
/**
 * @internal
 */
export type InjectedConnectorType = "injected" | "metamask" | {
    name: "injected" | "metamask";
    options?: InjectedConnector["options"];
};
/**
 * @internal
 */
export type WalletConnectConnectorType = "walletConnect" | {
    name: "walletConnect";
    options: WalletConnectConnector["options"];
};
/**
 * @internal
 */
export type WalletLinkConnectorType = "walletLink" | "coinbase" | {
    name: "walletLink" | "coinbase";
    options: CoinbaseWalletConnector["options"];
};
/**
 * @internal
 */
export type WalletConnector = InjectedConnectorType | WalletConnectConnectorType | WalletLinkConnectorType | GnosisSafeConnector | MagicConnector;
/**
 * @internal
 */
export type ChainRpc<TSupportedChain extends SupportedChain> = Record<TSupportedChain extends Chain ? TSupportedChain["id"] : TSupportedChain, string>;
/**
 * the metadata to pass to wallet connection dialog (may show up during the wallet-connection process)
 * @remarks this is only used for wallet connect and wallet link, metamask does not support it
 * @public
 */
export interface DAppMetaData {
    /**
     * the name of your app
     */
    name: string;
    /**
     * optional - a description of your app
     */
    description?: string;
    /**
     * optional - a url that points to a logo (or favicon) of your app
     */
    logoUrl?: string;
    /**
     * optional - the url where your app is hosted
     */
    url?: string;
    /**
     * optional - whether to show the connect dialog in darkmode or not
     */
    isDarkMode?: boolean;
}
/**
 * The possible props for the ThirdwebProvider.
 */
export interface ThirdwebProviderProps<TSupportedChain extends SupportedChain = SupportedChain> {
    /**
     * The {@link SDKOptions | Thirdweb SDK Options} to pass to the thirdweb SDK
     * comes with sensible defaults
     */
    sdkOptions?: SDKOptions;
    /**
     * An array of chainIds or {@link Chain} objects that the dApp supports
     * If not provided, all chains supported by the SDK will be supported by default
     */
    supportedChains?: TSupportedChain[];
    /**
     * An array of connector types (strings) or wallet connector objects that the dApp supports
     * If not provided, will default to metamask (injected), wallet connect and walletlink (coinbase wallet) with sensible defaults
     */
    walletConnectors?: WalletConnector[];
    /**
     * A partial map of chainIds to rpc urls to use for certain chains
     * If not provided, will default to the rpcUrls of the chain objects for the supported chains
     */
    chainRpc?: Partial<ChainRpc<TSupportedChain>>;
    /**
     * Metadata to pass to wallet connect and walletlink wallet connect. (Used to show *which* dApp is being connected to in mobile wallets that support it)
     * Defaults to just the name being passed as `thirdweb powered dApp`.
     */
    dAppMeta?: DAppMetaData;
    /**
     * The chainId that your dApp is running on.
     * While this *can* be `undefined` it is required to be passed. Passing `undefined` will cause no SDK to be instantiated.
     * When passing a chainId, it **must** be part of the `supportedChains` array.
     */
    desiredChainId: TSupportedChain extends Chain ? TSupportedChain["id"] : TSupportedChain | undefined;
    /**
     * The configuration used for thirdweb auth usage. Enables users to login
     * to backends with their wallet.
     * @beta
     */
    authConfig?: ThirdwebAuthConfig;
    /**
     * The storage interface to use with the sdk.
     */
    storageInterface?: ThirdwebStorage;
    /**
     * The react-query client to use. (Defaults to a default client.)
     * @beta
     */
    queryClient?: QueryClient;
    /**
     * Whether or not to attempt auto-connect to a wallet.
     */
    autoConnect?: boolean;
}
/**
 *
 * The `<ThirdwebProvider />` component lets you control what networks you want users to connect to, what types of wallets can connect to your app, and the settings for the [Typescript SDK](https://docs.thirdweb.com/typescript).
 *
 * @example
 * You can wrap your application with the provider as follows:
 *
 * ```jsx title="App.jsx"
 * import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
 *
 * const App = () => {
 *   return (
 *     <ThirdwebProvider desiredChainId={ChainId.Mainnet}>
 *       <YourApp />
 *     </ThirdwebProvider>
 *   );
 * };
 * ```
 *
 * @public
 *
 */
export declare const ThirdwebProvider: <TSupportedChain extends SupportedChain = SupportedChain>({ sdkOptions, chainRpc, supportedChains, walletConnectors, dAppMeta, desiredChainId, authConfig, storageInterface, queryClient, autoConnect, children, }: React.PropsWithChildren<ThirdwebProviderProps<TSupportedChain>>) => JSX.Element;
//# sourceMappingURL=full.d.ts.map