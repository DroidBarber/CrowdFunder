import { RequiredParam } from "../../../core/query-utils/required-param";
import { AirdropNFTParams, BurnNFTParams, MintNFTParams, MintNFTReturnType, MintNFTSupplyParams, TransferNFTParams, WalletAddress, NFTContract } from "../../types";
import { Erc1155, QueryAllParams, NFT } from "@thirdweb-dev/sdk";
import { BigNumber, BigNumberish } from "ethers";
/** **********************/
/**     READ  HOOKS     **/
/** **********************/
/**
 * Use this to get an individual NFT token of your {@link NFTContract}.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: nft, isLoading, error } = useNFT(contract, <tokenId>);
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @param tokenId - the tokenId to look up
 * @returns a response object that includes the metadata for the given tokenId
 * @beta
 * @twfeature ERC721 | ERC1155
 */
export declare function useNFT<TContract extends NFTContract>(contract: RequiredParam<TContract>, tokenId: RequiredParam<BigNumberish>): import("@tanstack/react-query").UseQueryResult<NFT, unknown>;
/**
 * Use this to get a list of NFT tokens of your {@link NFTContract}.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: nfts, isLoading, error } = useNFTs(contract, { start: 0, count: 100 });
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @param queryParams - query params to pass to the query for the sake of pagination
 * @returns a response object that includes an array of NFTs
 * @twfeature ERC721Supply | ERC1155Enumerable
 * @beta
 */
export declare function useNFTs<TContract extends NFTContract>(contract: RequiredParam<TContract>, queryParams?: QueryAllParams): import("@tanstack/react-query").UseQueryResult<NFT[], unknown>;
/**
 * Use this to get the total count of NFT tokens of your {@link NFTContract}.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: count, isLoading, error } = useTotalCount(contract);
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @returns a response object that includes the total count of NFTs
 * @beta
 * @twfeature ERC721Supply | ERC1155Enumerable
 */
export declare function useTotalCount<TContract extends NFTContract>(contract: RequiredParam<TContract>): import("@tanstack/react-query").UseQueryResult<BigNumber, unknown>;
/**
 * Use this to get a the total (minted) supply of your {@link NFTContract}.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: totalCirculatingSupply, isLoading, error } = useTotalCirculatingSupply(contract);
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @returns a response object that incudes the total minted supply
 * @beta
 * @twfeature ERC721Supply | ERC1155Enumerable
 */
export declare function useTotalCirculatingSupply(contract: RequiredParam<NFTContract>, tokenId: RequiredParam<BigNumberish>): import("@tanstack/react-query").UseQueryResult<BigNumber, unknown>;
/**
 * Use this to get a the owned NFTs for a specific {@link Erc721OrErc1155} and wallet address.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(contract, <OwnerWalletAddress>);
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @param ownerWalletAddress - the wallet adress to get owned tokens for
 * @returns a response object that includes the list of owned tokens
 * @beta
 * @twfeature ERC721Enumerable | ERC1155Enumerable
 */
export declare function useOwnedNFTs<TContract extends NFTContract>(contract: RequiredParam<TContract>, ownerWalletAddress: RequiredParam<WalletAddress>): import("@tanstack/react-query").UseQueryResult<NFT[], unknown>;
/**
 * Use this to get a the total balance of a {@link NFTContract} and wallet address.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: ownerBalance, isLoading, error } = useNFTBalance(contract, <OwnerWalletAddress>);
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @param ownerWalletAddress - the wallet adress to check the balance of
 * @returns a response object that includes the total balance of the owner
 * @twfeature ERC721 | ERC1155
 * @beta
 */
export declare function useNFTBalance(contract: RequiredParam<NFTContract>, ownerWalletAddress: RequiredParam<WalletAddress>, tokenId: RequiredParam<BigNumberish>): import("@tanstack/react-query").UseQueryResult<BigNumber, unknown>;
/** **********************/
/**     WRITE HOOKS     **/
/** **********************/
/**
 * Use this to mint a new NFT on your {@link Erc721OrErc1155}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const nftDrop = useNFTDrop(<ContractAddress>);
 *   const {
 *     mutate: mintNft,
 *     isLoading,
 *     error,
 *   } = useMintNFT(nftDrop);
 *
 *   if (error) {
 *     console.error("failed to mint nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => mintNft({ name: "My awesome NFT!", to: "0x..." })}
 *     >
 *       Mint!
 *     </button>
 *   );
 * };
 * ```
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: mintNft,
 *     isLoading,
 *     error,
 *   } = useMintNFT(contract);
 *
 *   if (error) {
 *     console.error("failed to mint nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => mintNft({ name: "My awesome NFT!", to: "0x..." })}
 *     >
 *       Mint!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @returns a mutation object that can be used to mint a new NFT token to the connected wallet
 * @beta
 * @twfeature ERC721Mintable | ERC1155Mintable
 */
export declare function useMintNFT<TContract extends NFTContract>(contract: RequiredParam<TContract>): import("@tanstack/react-query").UseMutationResult<MintNFTReturnType<TContract>, unknown, MintNFTParams, unknown>;
/**
 * Use this to mint a new NFT on your {@link Erc1155}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: mintNftSupply,
 *     isLoading,
 *     error,
 *   } = useMintNFTSupply(contract);
 *
 *   if (error) {
 *     console.error("failed to mint additional supply", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => mintNftSupply({ tokenId: 0, additionalSupply: 100, to: "0x..."})}
 *     >
 *       Mint Additional Supply!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link Erc1155}
 * @returns a mutation object that can be used to mint a more supply of a token id to the provided wallet
 * @beta
 * @twfeature ERC1155Mintable
 */
export declare function useMintNFTSupply(contract: Erc1155): import("@tanstack/react-query").UseMutationResult<import("@thirdweb-dev/sdk").TransactionResultWithId<NFT>, unknown, MintNFTSupplyParams, unknown>;
/**
 * Use this to transfer tokens on your {@link NFTContract}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: transferNFT,
 *     isLoading,
 *     error,
 *   } = useTransferNFT(contract);
 *
 *   if (error) {
 *     console.error("failed to transfer nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => transferNFT({ to: "0x...", tokenId: 2 })}
 *     >
 *       Transfer
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @returns a mutation object that can be used to transfer NFTs
 * @beta
 * @twfeature ERC721 | ERC1155
 */
export declare function useTransferNFT<TContract extends NFTContract>(contract: RequiredParam<TContract>): import("@tanstack/react-query").UseMutationResult<Omit<{
    receipt: import("@ethersproject/abstract-provider").TransactionReceipt;
    data: () => Promise<unknown>;
}, "data">, unknown, TransferNFTParams, unknown>;
/**
 * Use this to transfer tokens on your {@link Erc1155}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const editionDrop = useContract(<ContractAddress>, "edition-drop");
 *   const {
 *     mutate: airdropNFT,
 *     isLoading,
 *     error,
 *   } = useAirdropNFT(editionDrop);
 *
 *   if (error) {
 *     console.error("failed to transfer batch NFTs", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => airdropNFT({
 *          tokenId: 2,
 *          addresses: [{ address: "0x...", quantity: 2 }, { address: "0x...", quantity: 4 } }]
 *       )}
 *     >
 *       Airdrop NFT
 *     </button>
 * };
 * ```
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: airdropNFT,
 *     isLoading,
 *     error,
 *   } = useAirdropNFT(contract);
 *
 *   if (error) {
 *     console.error("failed to transfer batch NFTs", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => airdropNFT({
 *          tokenId: 2,
 *          addresses: [{ address: "0x...", quantity: 2 }, { address: "0x...", quantity: 4 } }]
 *       )}
 *     >
 *       Airdrop NFT
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link Erc1155}
 * @returns a mutation object that can be used to transfer batch NFTs
 * @twfeature ERC1155
 * @beta
 */
export declare function useAirdropNFT(contract: Erc1155): import("@tanstack/react-query").UseMutationResult<Omit<{
    receipt: import("@ethersproject/abstract-provider").TransactionReceipt;
    data: () => Promise<unknown>;
}, "data">, unknown, AirdropNFTParams, unknown>;
/** **********************/
/**     WRITE HOOKS     **/
/** **********************/
/**
 * Use this to burn an NFT on your {@link Erc721OrErc1155}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const nftDrop = useNFTDrop(<ContractAddress>);
 *   const {
 *     mutate: burnNft,
 *     isLoading,
 *     error,
 *   } = useBurnNFT(nftDrop);
 *
 *   if (error) {
 *     console.error("failed to burn nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => burnNft({ tokenId: 0 })}
 *     >
 *       Burn!
 *     </button>
 *   );
 * };
 * ```
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: burnNft,
 *     isLoading,
 *     error,
 *   } = useBurnNFT(contract);
 *
 *   if (error) {
 *     console.error("failed to burn nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => burnNft({ tokenId: 0 })}
 *     >
 *       Burn!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @returns a mutation object that can be used to burn an NFT token from the connected wallet
 * @twfeature ERC721Burnable | ERC1155Burnable
 * @beta
 */
export declare function useBurnNFT<TContract extends NFTContract>(contract: RequiredParam<TContract>): import("@tanstack/react-query").UseMutationResult<Omit<{
    receipt: import("@ethersproject/abstract-provider").TransactionReceipt;
    data: () => Promise<unknown>;
}, "data">, unknown, BurnNFTParams, unknown>;
//# sourceMappingURL=nft.d.ts.map