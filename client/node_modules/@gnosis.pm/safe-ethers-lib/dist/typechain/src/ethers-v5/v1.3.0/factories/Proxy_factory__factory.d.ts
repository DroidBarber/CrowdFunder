import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { Proxy_factory, Proxy_factoryInterface } from "../Proxy_factory";
export declare class Proxy_factory__factory {
    static readonly abi: ({
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): Proxy_factoryInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Proxy_factory;
}
