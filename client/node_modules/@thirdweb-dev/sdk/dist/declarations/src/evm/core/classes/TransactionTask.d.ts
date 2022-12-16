import { TransactionResult } from "../types";
import { ContractWrapper } from "./contract-wrapper";
import { BigNumber, BigNumberish, CallOverrides, ContractTransaction } from "ethers";
/**
 * Arguments for creating a transaction task.
 * @internal
 */
interface TransactionTaskArgs {
    contractWrapper: ContractWrapper<any>;
    functionName: string;
    args?: any[];
    overrides?: CallOverrides;
}
/**
 * @internal
 * Represents a transaction to be executed and can be customized.
 */
export declare class TransactionTask {
    static make(taskArgs: TransactionTaskArgs): TransactionTask;
    private contractWrapper;
    private functionName;
    private args;
    private overrides;
    private encoder;
    private estimator;
    private constructor();
    /**
     * Override the gas limit for this transaction.
     * @param gasLimit
     */
    overrideGasLimit(gasLimit: BigNumberish): TransactionTask;
    /**
     * Override the gas price for this transaction.
     * @param gasPrice
     */
    overrideGasPrice(gasPrice: BigNumberish): TransactionTask;
    /**
     * Override the nonce for this transaction.
     * @param nonce
     */
    overrideNonce(nonce: BigNumberish): TransactionTask;
    /**
     * Override the value sent with this transaction.
     * @param value
     */
    overrideValue(value: BigNumberish): TransactionTask;
    /**
     * Returns the gas limit that this transaction would consume if executed.
     * @returns the gas limit in gas units
     */
    estimateGasLimit(): Promise<BigNumber>;
    /**
     * Returns the total gas cost of this transaction if executed.
     * @returns the gas cost in ether
     */
    estimateGasCostInEther(): Promise<string>;
    /**
     * Returns the encoded function data of this transaction if executed.
     */
    encodeFunctionData(): Promise<string>;
    /**
     * Submits this transaction to the network. Does not wait for the transaction to be mined.
     * To wait for the transaction to be mined, you can call `.wait()` on the result of this function.
     */
    submit(): Promise<ContractTransaction>;
    /**
     * Submits this transaction to the network and waits for it to be mined.
     */
    execute(): Promise<TransactionResult>;
}
export {};
//# sourceMappingURL=TransactionTask.d.ts.map