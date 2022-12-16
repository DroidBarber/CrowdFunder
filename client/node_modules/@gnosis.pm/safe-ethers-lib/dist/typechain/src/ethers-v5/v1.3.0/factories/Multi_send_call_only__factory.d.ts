import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { Multi_send_call_only, Multi_send_call_onlyInterface } from "../Multi_send_call_only";
export declare class Multi_send_call_only__factory {
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): Multi_send_call_onlyInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Multi_send_call_only;
}
