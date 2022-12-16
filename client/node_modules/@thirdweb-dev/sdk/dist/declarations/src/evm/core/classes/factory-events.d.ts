import { ContractEvents } from "./contract-events";
import { ContractWrapper } from "./contract-wrapper";
import type { TWFactory } from "@thirdweb-dev/contracts-js";
interface DeployEvent {
    transactionHash: string;
    contractAddress: string;
}
export declare class FactoryEvents extends ContractEvents<TWFactory> {
    constructor(contractWrapper: ContractWrapper<TWFactory>);
    addDeployListener(listener: (event: DeployEvent) => void): void;
}
export {};
//# sourceMappingURL=factory-events.d.ts.map