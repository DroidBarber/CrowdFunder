import { QueryClientProviderProps } from "../../core/providers/query-client";
import { RequiredParam } from "../../core/query-utils/required-param";
import { ComponentWithChildren } from "../../core/types/component";
import { ThirdwebAuthConfig } from "../contexts/thirdweb-auth";
import { ChainOrRpc, SDKOptions, SignerOrProvider, SUPPORTED_CHAIN_ID, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { Signer } from "ethers";
export interface ThirdwebSDKProviderProps extends QueryClientProviderProps {
    desiredChainId: RequiredParam<SUPPORTED_CHAIN_ID>;
    provider: ChainOrRpc | SignerOrProvider;
    signer?: Signer;
    sdkOptions?: SDKOptions;
    storageInterface?: ThirdwebStorage;
    authConfig?: ThirdwebAuthConfig;
}
/**
 *
 * @internal
 */
export declare const WrappedThirdwebSDKProvider: ComponentWithChildren<Omit<ThirdwebSDKProviderProps, "signer">>;
/**
 * A basic wrapper around the Thirdweb SDK.
 *
 * You can use this in order to be able to pass a provider & signer directly to the SDK.
 *
 * @remarks Utilizing this provider will mean hooks for wallet management are not available, if you need those please use the {@link ThirdwebProvider} instead.
 *
 * @public
 */
export declare const ThirdwebSDKProvider: ComponentWithChildren<ThirdwebSDKProviderProps>;
/**
 *
 * @returns {@link ThirdwebSDK}
 * Access the instance of the thirdweb SDK created by the ThirdwebProvider
 * to call methods using the connected wallet on the desiredChainId.
 * @example
 * ```javascript
 * const sdk = useSDK();
 * ```
 */
export declare function useSDK(): ThirdwebSDK | undefined;
/**
 * @internal
 */
export declare function useDesiredChainId(): number;
/**
 * @internal
 */
export declare function useSDKChainId(): SUPPORTED_CHAIN_ID | undefined;
//# sourceMappingURL=base.d.ts.map