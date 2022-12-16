import { GnosisSafeProxyFactoryContract } from '@gnosis.pm/safe-core-sdk-types';
import { Proxy_factory as ProxyFactory_V1_1_1 } from '../../../typechain/src/ethers-v5/v1.1.1/Proxy_factory';
import { Proxy_factory as ProxyFactory_V1_3_0 } from '../../../typechain/src/ethers-v5/v1.3.0/Proxy_factory';
import { EthersTransactionOptions } from '../../types';
export interface CreateProxyProps {
    safeMasterCopyAddress: string;
    initializer: string;
    saltNonce: string;
    options?: EthersTransactionOptions;
    callback?: (txHash: string) => void;
}
declare class GnosisSafeProxyFactoryEthersContract implements GnosisSafeProxyFactoryContract {
    contract: ProxyFactory_V1_3_0 | ProxyFactory_V1_1_1;
    constructor(contract: ProxyFactory_V1_3_0 | ProxyFactory_V1_1_1);
    getAddress(): string;
    proxyCreationCode(): Promise<string>;
    createProxy({ safeMasterCopyAddress, initializer, saltNonce, options, callback }: CreateProxyProps): Promise<string>;
    encode(methodName: string, params: any[]): string;
    estimateGas(methodName: string, params: any[], options: EthersTransactionOptions): Promise<number>;
}
export default GnosisSafeProxyFactoryEthersContract;
