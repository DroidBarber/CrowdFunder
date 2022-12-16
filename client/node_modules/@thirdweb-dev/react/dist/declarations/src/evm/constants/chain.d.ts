import { SUPPORTED_CHAIN_ID } from "@thirdweb-dev/sdk";
import type { Chain as WagmiChain } from "wagmi";
export type Chain = WagmiChain;
export declare const defaultSupportedChains: WagmiChain[];
export type SupportedChainId = typeof defaultSupportedChains[number]["id"];
export type SupportedChain = SupportedChainId | Chain;
export declare function getChainFromChainId(chainId: SUPPORTED_CHAIN_ID): WagmiChain;
//# sourceMappingURL=chain.d.ts.map