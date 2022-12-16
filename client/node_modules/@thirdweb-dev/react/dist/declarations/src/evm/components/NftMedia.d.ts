import { SharedMediaProps } from "./MediaRenderer";
import { NFTMetadata } from "@thirdweb-dev/sdk";
import React from "react";
/**
 * The props for the {@link ThirdwebNftMedia} component.
 */
export interface ThirdwebNftMediaProps extends SharedMediaProps {
    /**
     * The NFT metadata of the NFT returned by the thirdweb sdk.
     */
    metadata: NFTMetadata;
}
/**
 * This component can be used to render NFTs from the thirdweb SDK.
 * Props: {@link ThirdwebNftMediaProps}
 *
 * @example
 * ```jsx
 * import { ThirdwebNftMedia, useContract, useNFT } from "@thirdweb-dev/react";
 * export default function NFTCollectionRender() {
 *   const { contract } = useContract(<your-contract-address>);
 *   const { data: nft, isLoading } = useNFT(contract, 0);
 *
 *   return (
 *     <div>
 *       {!isLoading && nft ? (
 *         <ThirdwebNftMedia metadata={nft.metadata} />
 *       ) : (
 *         <p>Loading...</p>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */
export declare const ThirdwebNftMedia: React.ForwardRefExoticComponent<ThirdwebNftMediaProps & React.RefAttributes<HTMLMediaElement>>;
//# sourceMappingURL=NftMedia.d.ts.map