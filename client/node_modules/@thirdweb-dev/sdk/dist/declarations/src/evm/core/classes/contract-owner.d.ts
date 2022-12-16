import { DetectableFeature } from "../interfaces/DetectableFeature";
import { TransactionResult } from "../types";
import { ContractWrapper } from "./contract-wrapper";
import type { Ownable } from "@thirdweb-dev/contracts-js";
/**
 * Encodes and decodes Contract functions
 * @public
 */
export declare class ContractOwner<TContract extends Ownable> implements DetectableFeature {
    featureName: "Ownable";
    private contractWrapper;
    constructor(contractWrapper: ContractWrapper<TContract>);
    /**
     * Return the current owner of the contract
     * @returns the owner address
     */
    get(): Promise<string>;
    /**
     * Set the new owner of the contract
     * @remarks Can only be called by the current owner.
     *
     * @param address - the address of the new owner
     *
     * @example
     * ```javascript
     * await contract.owner.set("0x1234567890123456789012345678901234567890");
     * ```
     */
    set(address: string): Promise<TransactionResult>;
}
//# sourceMappingURL=contract-owner.d.ts.map