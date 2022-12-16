import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { Multi_send, Multi_sendInterface } from "../Multi_send";
export declare class Multi_send__factory {
    static readonly abi: ({
        inputs: never[];
        stateMutability: string;
        type: string;
        name?: undefined;
        outputs?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
    })[];
    static createInterface(): Multi_sendInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Multi_send;
}
