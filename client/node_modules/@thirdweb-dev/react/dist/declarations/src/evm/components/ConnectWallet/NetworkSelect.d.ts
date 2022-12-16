/// <reference types="react" />
import { SelectProps } from "../shared/Select";
import { ChainId } from "@thirdweb-dev/sdk";
export interface SupportedNetworkSelectProps extends SelectProps {
    disabledChainIds?: ChainId[];
}
export declare const SupportedNetworkSelect: React.FC<SupportedNetworkSelectProps>;
//# sourceMappingURL=NetworkSelect.d.ts.map