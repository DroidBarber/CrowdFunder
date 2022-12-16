import { LoginConfig } from "../../hooks/auth";
import { ThemeProviderProps } from "../shared/ThemeProvider";
import { LoginOptions } from "@thirdweb-dev/sdk";
import React from "react";
interface ConnectWalletProps extends ThemeProviderProps {
    auth?: {
        loginOptions?: LoginOptions;
        loginConfig?: LoginConfig;
        loginOptional?: boolean;
    };
    className?: string;
}
/**
 * A component that allows the user to connect their wallet.
 *
 * The button has to be wrapped in a `ThirdwebProvider` in order to function.
 *
 * @example
 * ```javascript
 * import { ConnectWallet } from '@thirdweb-dev/react';
 *
 * const App = () => {
 *  return (
 *   <div>
 *     <ConnectWallet />
 *   </div>
 * )
 * }
 * ```
 *
 *
 * @beta
 */
export declare const ConnectWallet: React.FC<ConnectWalletProps>;
export {};
//# sourceMappingURL=index.d.ts.map