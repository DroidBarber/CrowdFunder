import { DetectableFeature } from "../interfaces/DetectableFeature";
import { TransactionResult } from "../types";
import { ContractWrapper } from "./contract-wrapper";
import type { IBurnableERC721 } from "@thirdweb-dev/contracts-js";
import { BigNumberish } from "ethers";
export declare class Erc721Burnable implements DetectableFeature {
    featureName: "ERC721Burnable";
    private contractWrapper;
    constructor(contractWrapper: ContractWrapper<IBurnableERC721>);
    /**
     * Burn NFTs
     *
     * @remarks Burn NFTs held by the connected wallet
     *
     * @example
     * ```javascript
     * // The token ID of the NFT you want to burn
     * const tokenId = 0;
     *
     * await contract.nft.burn.token(tokenId);
     * ```
     */
    token(tokenId: BigNumberish): Promise<TransactionResult>;
}
//# sourceMappingURL=erc-721-burnable.d.ts.map