import { Amount } from "../../types/currency";
import { DetectableFeature } from "../interfaces/DetectableFeature";
import { TransactionResult } from "../types";
import { ContractWrapper } from "./contract-wrapper";
import { Erc20 } from "./erc-20";
import type { IBurnableERC20 } from "@thirdweb-dev/contracts-js";
export declare class Erc20Burnable implements DetectableFeature {
    featureName: "ERC20Burnable";
    private erc20;
    private contractWrapper;
    constructor(erc20: Erc20, contractWrapper: ContractWrapper<IBurnableERC20>);
    /**
     * Burn Tokens
     *
     * @remarks Burn tokens held by the connected wallet
     *
     * @example
     * ```javascript
     * // The amount of this token you want to burn
     * const amount = 1.2;
     *
     * await contract.token.burn.tokens(amount);
     * ```
     */
    tokens(amount: Amount): Promise<TransactionResult>;
    /**
     * Burn Tokens
     *
     * @remarks Burn tokens held by the specified wallet
     *
     * @example
     * ```javascript
     * // Address of the wallet sending the tokens
     * const holderAddress = "{{wallet_address}}";
     *
     * // The amount of this token you want to burn
     * const amount = 1.2;
     *
     * await contract.token.burn.from(holderAddress, amount);
     * ```
     */
    from(holder: string, amount: Amount): Promise<TransactionResult>;
}
//# sourceMappingURL=erc-20-burnable.d.ts.map