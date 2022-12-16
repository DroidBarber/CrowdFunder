import { RequiredParam } from "../../../core/query-utils/required-param";
import { ClaimNFTParams, ClaimNFTReturnType, DelayedRevealLazyMintInput, DropContract, RevealLazyMintInput, NFTContract, RevealableContract } from "../../types";
import { NFTMetadataInput, QueryAllParams, UploadProgressEvent } from "@thirdweb-dev/sdk";
import { NFTDrop } from "@thirdweb-dev/sdk/dist/declarations/src/evm/contracts/prebuilt-implementations/nft-drop";
/** **********************/
/**       READ HOOKS    **/
/** **********************/
/**
 * Use this to get a list of *unclaimed* NFT tokens of your ERC721 Drop contract.
 *
 * @example
 * ```javascript
 * const { data: unclaimedNfts, isLoading, error } = useUnclaimedNFTs(<YourERC721DropContractInstance>, { start: 0, count: 100 });
 * ```
 *
 * @param contract - an instance of a contract that extends the Erc721 spec (nft drop, custom contract that follows the Erc721 & drop spec)
 * @param queryParams - query params to pass to the query for the sake of pagination
 * @returns a response object that includes an array of NFTs that are unclaimed
 * @twfeature ERC721LazyMintable | ERC1155LazyMintable
 * @beta
 */
export declare function useUnclaimedNFTs(contract: RequiredParam<NFTDrop>, queryParams?: QueryAllParams): import("@tanstack/react-query").UseQueryResult<{
    [x: string]: unknown;
    name?: string | number | undefined;
    description?: string | null | undefined;
    image?: string | null | undefined;
    external_url?: string | null | undefined;
    animation_url?: string | null | undefined;
    background_color?: string | undefined;
    properties?: {
        [x: string]: unknown;
    } | {
        [x: string]: unknown;
    }[] | undefined;
    attributes?: {
        [x: string]: unknown;
    } | {
        [x: string]: unknown;
    }[] | undefined;
    id: string;
    uri: string;
}[], unknown>;
/**
 * Use this to get a list of *claimed* (minted) NFT tokens of your ERC721 Drop contract.
 *
 * @remarks Equivalent to using {@link useNFTs}.
 *
 * @example
 * ```javascript
 * const { data: claimedNFTs, isLoading, error } = useClaimedNFTs(<YourERC721DropContractInstance>, { start: 0, count: 100 });
 * ```
 *
 * @param contract - an instance of a {@link DropContract}
 * @param queryParams - query params to pass to the query for the sake of pagination
 * @returns a response object that includes an array of NFTs that are claimed
 * @twfeature ERC721LazyMintable | ERC1155LazyMintable
 * @beta
 */
export declare function useClaimedNFTs(contract: RequiredParam<NFTContract>, queryParams?: QueryAllParams): import("@tanstack/react-query").UseQueryResult<import("@thirdweb-dev/sdk").NFT[], unknown>;
/**
 *
 * @param contract - an instance of a {@link NFTDrop}
 * @returns a response object that includes the number of NFTs that are unclaimed
 * @twfeature ERC721LazyMintable | ERC1155LazyMintable
 */
export declare function useUnclaimedNFTSupply(contract: RequiredParam<DropContract>): import("@tanstack/react-query").UseQueryResult<import("ethers").BigNumber, unknown>;
/**

 *
 * @param contract - an instance of a {@link DropContract}
 * @returns a response object that includes the number of NFTs that are claimed
 * @twfeature ERC721LazyMintable | ERC1155LazyMintable
 */
export declare function useClaimedNFTSupply(contract: RequiredParam<DropContract>): import("@tanstack/react-query").UseQueryResult<import("ethers").BigNumber, unknown>;
/**
 *
 * @param contract - an instance of a {@link RevealableContract}
 * @returns a response object that gets the batches to still be revealed
 * @twfeature ERC721Revealable | ERC1155Revealable
 */
export declare function useBatchesToReveal<TContract extends RevealableContract>(contract: RequiredParam<TContract>): import("@tanstack/react-query").UseQueryResult<import("@thirdweb-dev/sdk").BatchToReveal[], unknown>;
/** **********************/
/**     WRITE HOOKS     **/
/** **********************/
/**
 * Use this to claim a NFT on your {@link DropContract}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: claimNft,
 *     isLoading,
 *     error,
 *   } = useClaimNFT(contract);
 *
 *   if (error) {
 *     console.error("failed to claim nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => claimNft({ to: "0x...", quantity: 1 })}
 *     >
 *       Claim NFT!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link DropContract}
 * @returns a mutation object that can be used to claim a NFT to the wallet specificed in the params
 * @twfeature ERC721Claimable | ERC1155Claimable
 * @beta
 */
export declare function useClaimNFT<TContract extends DropContract>(contract: RequiredParam<TContract>): import("@tanstack/react-query").UseMutationResult<ClaimNFTReturnType, unknown, ClaimNFTParams, unknown>;
/**
 * Use this to lazy mint a batch of NFTs on your {@link DropContract}
 *
 * @param contract - an instance of a {@link NFTContract} with the drop extension
 * @param onProgress - an optional callback that will be called with the progress of the upload
 * @returns a mutation object that can be used to lazy mint a batch of NFTs
 * @twfeature ERC721LazyMintable | ERC1155LazyMintable
 * @beta
 */
export declare function useLazyMint<TContract extends DropContract>(contract: RequiredParam<TContract>, onProgress?: (progress: UploadProgressEvent) => void): import("@tanstack/react-query").UseMutationResult<import("@thirdweb-dev/sdk").TransactionResultWithId<{
    [x: string]: unknown;
    name?: string | number | undefined;
    description?: string | null | undefined;
    image?: string | null | undefined;
    external_url?: string | null | undefined;
    animation_url?: string | null | undefined;
    background_color?: string | undefined;
    properties?: {
        [x: string]: unknown;
    } | {
        [x: string]: unknown;
    }[] | undefined;
    attributes?: {
        [x: string]: unknown;
    } | {
        [x: string]: unknown;
    }[] | undefined;
    id: string;
    uri: string;
}>[], unknown, {
    metadatas: NFTMetadataInput[];
}, unknown>;
/**
 * Use this to lazy mint a batch of delayed reveal NFTs on your {@link DropContract}
 *
 * @param contract - an instance of a {@link DropContract}
 * @param onProgress - an optional callback that will be called with the progress of the upload
 * @returns a mutation object that can be used to lazy mint a batch of NFTs
 * @twfeature ERC721Revealable | ERC1155Revealable
 * @beta
 */
export declare function useDelayedRevealLazyMint<TContract extends RevealableContract>(contract: RequiredParam<TContract>, onProgress?: (progress: UploadProgressEvent) => void): import("@tanstack/react-query").UseMutationResult<import("@thirdweb-dev/sdk").TransactionResultWithId<never>[], unknown, DelayedRevealLazyMintInput, unknown>;
/**
 * Use this to reveal a batch of delayed reveal NFTs on your {@link RevealableContract}
 *
 * @param contract - an instance of a {@link RevealableContract}
 * @returns a mutation object that can be used to reveal a batch of delayed reveal NFTs
 * @twfeature ERC721Revealable | ERC1155Revealable
 * @beta
 */
export declare function useRevealLazyMint<TContract extends RevealableContract>(contract: RequiredParam<TContract>): import("@tanstack/react-query").UseMutationResult<Omit<{
    receipt: import("@ethersproject/abstract-provider").TransactionReceipt;
    data: () => Promise<unknown>;
}, "data">, unknown, RevealLazyMintInput, unknown>;
//# sourceMappingURL=drop.d.ts.map