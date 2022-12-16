import { RequiredParam } from "../../../core/query-utils/required-param";
import { AcceptDirectOffer, ExecuteAuctionSale, MakeBidParams, MakeOfferParams } from "../../types";
import type { AuctionListing, DirectListing, MarketplaceFilter, NewAuctionListing, NewDirectListing } from "@thirdweb-dev/sdk";
import { ListingType } from "@thirdweb-dev/sdk";
import { Marketplace } from "@thirdweb-dev/sdk/dist/declarations/src/evm/contracts/prebuilt-implementations/marketplace";
import { BigNumberish } from "ethers";
/** **********************/
/**     READ  HOOKS     **/
/** **********************/
/**
 * Use this to get a specific listing from the marketplace.
 *
 * @example
 * ```javascript
 * const { data: listing, isLoading, error } = useListing(<YourMarketplaceContractInstance>, <listingId>);
 * ```
 *
 * @param contract - an instance of a marketplace contract
 * @param listingId - the listing id to check
 * @returns a response object that includes an array of listings
 * @beta
 */
export declare function useListing(contract: RequiredParam<Marketplace>, listingId: RequiredParam<BigNumberish>): import("@tanstack/react-query").UseQueryResult<AuctionListing | DirectListing, unknown>;
/**
 * Use this to get a list all listings from your marketplace contract.
 *
 * @example
 * ```javascript
 * const { data: listings, isLoading, error } = useListings(<YourMarketplaceContractInstance>, { start: 0, count: 100 });
 * ```
 *
 * @param contract - an instance of a marketplace contract
 * @param filter - filter to pass to the query for the sake of pagination & filtering
 * @returns a response object that includes an array of listings
 * @beta
 */
export declare function useListings(contract: RequiredParam<Marketplace>, filter?: MarketplaceFilter): import("@tanstack/react-query").UseQueryResult<(AuctionListing | DirectListing)[], unknown>;
/**
 * Use this to get a count of all listings on your marketplace contract.
 *
 * @example
 * ```javascript
 * const { data: listings, isLoading, error } = useListings(<YourMarketplaceContractInstance>);
 * ```
 *
 * @param contract - an instance of a marketplace contract
 * @returns a response object that includes an array of listings
 * @beta
 */
export declare function useListingsCount(contract: RequiredParam<Marketplace>): import("@tanstack/react-query").UseQueryResult<import("ethers").BigNumber, unknown>;
/**
 * Use this to get a list active listings from your marketplace contract.
 *
 * @example
 * ```javascript
 * const { data: listings, isLoading, error } = useActiveListings(<YourMarketplaceContractInstance>, { seller: "0x...", tokenContract: "0x...", tokenId: 1, start: 0, count: 100 });
 * ```
 *
 * @param contract - an instance of a marketplace contract
 * @param filter - filter to pass to the query for the sake of pagination & filtering
 * @returns a response object that includes an array of listings
 * @beta
 */
export declare function useActiveListings(contract: RequiredParam<Marketplace>, filter?: MarketplaceFilter): import("@tanstack/react-query").UseQueryResult<(AuctionListing | DirectListing)[], unknown>;
/**
 * Use this to get a the winning bid for an auction listing from your marketplace contract.
 *
 * @example
 * ```javascript
 * const { data: winningBid, isLoading, error } = useWinningBid(<YourMarketplaceContractInstance>, <listingId>);
 * ```
 *
 * @param contract - an instance of a marketplace contract
 * @param listingId - the listing id to check
 * @returns a response object that includes the {@link Offer} that is winning the auction
 * @beta
 */
export declare function useWinningBid(contract: RequiredParam<Marketplace>, listingId: RequiredParam<BigNumberish>): import("@tanstack/react-query").UseQueryResult<import("@thirdweb-dev/sdk").Offer | undefined, unknown>;
/**
 * Use this to get the winner of an auction listing from your marketplace contract.
 *
 * @example
 * ```javascript
 * const { data: auctionWinner, isLoading, error } = useAuctionWinner(<YourMarketplaceContractInstance>, <listingId>);
 * ```
 *
 * @param contract - an instance of a marketplace contract
 * @param listingId - the listing id to check
 * @returns a response object that includes the address of the winner of the auction or undefined if there is no winner yet
 * @beta
 */
export declare function useAuctionWinner(contract: RequiredParam<Marketplace>, listingId: RequiredParam<BigNumberish>): import("@tanstack/react-query").UseQueryResult<string | undefined, unknown>;
/**
 * Use this to get the buffer in basis points between offers from your marketplace contract.
 *
 * @example
 * ```javascript
 * const { data: auctionWinner, isLoading, error } = useBidBuffer(<YourMarketplaceContractInstance>);
 * ```
 *
 * @param contract - an instance of a marketplace contract

 * @returns a response object that includes an array of listings
 * @beta
 */
export declare function useBidBuffer(contract: RequiredParam<Marketplace>): import("@tanstack/react-query").UseQueryResult<import("ethers").BigNumber, unknown>;
/**
 * Use this to get the minimum next bid for the auction listing from your marketplace contract.
 *
 * @example
 * ```javascript
 * const { data: minimumNextBid, isLoading, error } = useMinimumNextBid(<YourMarketplaceContractInstance>, <listingId>);
 * ```
 *
 * @param contract - an instance of a marketplace contract
 * @param listingId - the listing id to check
 * @returns a response object that includes the minimum next bid for the auction listing
 * @beta
 */
export declare function useMinimumNextBid(contract: RequiredParam<Marketplace>, listingId: RequiredParam<BigNumberish>): import("@tanstack/react-query").UseQueryResult<{
    symbol: string;
    value: import("ethers").BigNumber;
    name: string;
    decimals: number;
    displayValue: string;
}, unknown>;
/** **********************/
/**     WRITE HOOKS     **/
/** **********************/
/**
 * Use this to create a new Direct Listing on your marketplace contract.
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: createDirectListing,
 *     isLoading,
 *     error,
 *   } = useCreateDirectListing(">>YourMarketplaceContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to create direct listing", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => createDirectListing(directListingData)}
 *     >
 *       Create Direct Listing!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a Marketplace contract
 * @returns a mutation object that can be used to create a new direct listing
 * @beta
 */
export declare function useCreateDirectListing(contract: RequiredParam<Marketplace>): import("@tanstack/react-query").UseMutationResult<import("@thirdweb-dev/sdk").TransactionResultWithId<never>, unknown, NewDirectListing, unknown>;
/**
 * Use this to create a new Auction Listing on your marketplace contract.
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: createAuctionListing,
 *     isLoading,
 *     error,
 *   } = useCreateAuctionListing(">>YourMarketplaceContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to create auction listing", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => createAuctionListing(auctionListingData)}
 *     >
 *       Create Auction Listing!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a Marketplace contract
 * @returns a mutation object that can be used to create a new auction listing
 * @beta
 */
export declare function useCreateAuctionListing(contract: RequiredParam<Marketplace>): import("@tanstack/react-query").UseMutationResult<import("@thirdweb-dev/sdk").TransactionResultWithId<never>, unknown, NewAuctionListing, unknown>;
/**
 * Use this to cancel a listing on your marketplace contract.
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: cancelListing,
 *     isLoading,
 *     error,
 *   } = useCancelListing(">>YourMarketplaceContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to cancel auction listing", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => cancelListing()}
 *     >
 *       Create Auction Listing!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a Marketplace contract
 * @returns a mutation object that can be used to create a new auction listing
 * @beta
 */
export declare function useCancelListing(contract: RequiredParam<Marketplace>): import("@tanstack/react-query").UseMutationResult<Omit<{
    receipt: import("@ethersproject/abstract-provider").TransactionReceipt;
    data: () => Promise<unknown>;
}, "data"> | undefined, unknown, Pick<AuctionListing | DirectListing, "type" | "id">, unknown>;
/**
 * Use this to place a bid on an auction listing from your marketplace contract.
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: makeBid,
 *     isLoading,
 *     error,
 *   } = useMakeBid(">>YourMarketplaceContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to make a bid", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => makeBid({ listingId: 1, bid: 2 })}
 *     >
 *       Bid!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a Marketplace contract
 * @returns a mutation object that can be used to make a bid on an auction listing
 * @beta
 */
export declare function useMakeBid(contract: RequiredParam<Marketplace>): import("@tanstack/react-query").UseMutationResult<Omit<{
    receipt: import("@ethersproject/abstract-provider").TransactionReceipt;
    data: () => Promise<unknown>;
}, "data">, unknown, MakeBidParams, unknown>;
/**
 * Use this to make an offer on direct or auction listing from your marketplace contract.
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: makeOffer,
 *     isLoading,
 *     error,
 *   } = useMakeOffer(">>YourMarketplaceContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to make a bid", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => makeOffer({ listingId: 1, pricePerToken: 0.5, quantity: 1 })}
 *     >
 *       Bid!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a Marketplace contract
 * @returns a mutation object that can be used to make a bid on an auction listing
 * @beta
 */
export declare function useMakeOffer(contract: RequiredParam<Marketplace>): import("@tanstack/react-query").UseMutationResult<Omit<{
    receipt: import("@ethersproject/abstract-provider").TransactionReceipt;
    data: () => Promise<unknown>;
}, "data">, unknown, MakeOfferParams, unknown>;
/**
 * Accept an offer on a direct listing from an offeror, will accept the latest offer by the given offeror.
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: acceptOffer,
 *     isLoading,
 *     error,
 *   } = useAcceptDirectListingOffer(">>YourMarketplaceContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to accept offer", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => acceptOffer({ listingId: 1, addressOfOfferor: "0x..." })}
 *     >
 *       Accept offer
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a Marketplace contract
 * @returns a mutation object that can be used to accept an offer on a direct listing
 * @beta
 */
export declare function useAcceptDirectListingOffer(contract: RequiredParam<Marketplace>): import("@tanstack/react-query").UseMutationResult<Omit<{
    receipt: import("@ethersproject/abstract-provider").TransactionReceipt;
    data: () => Promise<unknown>;
}, "data">, unknown, AcceptDirectOffer, unknown>;
/**
 * Execute an auction sale. Can only be executed once the auction has ended and the auction has a winning bid.
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: executeAuctionSale,
 *     isLoading,
 *     error,
 *   } = useExecuteAuctionSale(">>YourMarketplaceContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to execute sale", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => executeAuctionSale({ listingId: 1 })}
 *     >
 *       Execute sale
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a Marketplace contract
 * @returns a mutation object that can be used to accept an offer on a direct listing
 * @beta
 */
export declare function useExecuteAuctionSale(contract: RequiredParam<Marketplace>): import("@tanstack/react-query").UseMutationResult<import("@ethersproject/abstract-provider").TransactionReceipt, unknown, ExecuteAuctionSale, unknown>;
/**
 * Get all the offers for a listing
 *
 * @remarks Fetch all the offers for a specified direct or auction listing.
 * @example
 * ```javascript
 * const { data: offers, isLoading, error } = useOffers(<YourMarketplaceContractInstance>, <listingId>);
 * ```
 *
 * @param contract - an instance of a Marketplace contract
 * @param listingId - the id of the listing to fetch offers for
 * @beta
 */
export declare function useOffers(contract: RequiredParam<Marketplace>, listingId: RequiredParam<BigNumberish>): {
    data: Record<string, any>[] | undefined;
    error: unknown;
    isError: true;
    isLoading: false;
    isLoadingError: false;
    isRefetchError: true;
    isSuccess: false;
    status: "error";
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: unknown;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isPlaceholderData: boolean;
    isPreviousData: boolean;
    isRefetching: boolean;
    isStale: boolean;
    refetch: <TPageData>(options?: (import("@tanstack/react-query").RefetchOptions & import("@tanstack/react-query").RefetchQueryFilters<TPageData>) | undefined) => Promise<import("@tanstack/react-query").QueryObserverResult<import("@thirdweb-dev/sdk").ContractEvent<Record<string, any>>[], unknown>>;
    remove: () => void;
    fetchStatus: import("@tanstack/react-query").FetchStatus;
} | {
    data: Record<string, any>[] | undefined;
    error: null;
    isError: false;
    isLoading: false;
    isLoadingError: false;
    isRefetchError: false;
    isSuccess: true;
    status: "success";
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: unknown;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isPlaceholderData: boolean;
    isPreviousData: boolean;
    isRefetching: boolean;
    isStale: boolean;
    refetch: <TPageData>(options?: (import("@tanstack/react-query").RefetchOptions & import("@tanstack/react-query").RefetchQueryFilters<TPageData>) | undefined) => Promise<import("@tanstack/react-query").QueryObserverResult<import("@thirdweb-dev/sdk").ContractEvent<Record<string, any>>[], unknown>>;
    remove: () => void;
    fetchStatus: import("@tanstack/react-query").FetchStatus;
} | {
    data: Record<string, any>[] | undefined;
    error: unknown;
    isError: true;
    isLoading: false;
    isLoadingError: true;
    isRefetchError: false;
    isSuccess: false;
    status: "error";
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: unknown;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isPlaceholderData: boolean;
    isPreviousData: boolean;
    isRefetching: boolean;
    isStale: boolean;
    refetch: <TPageData>(options?: (import("@tanstack/react-query").RefetchOptions & import("@tanstack/react-query").RefetchQueryFilters<TPageData>) | undefined) => Promise<import("@tanstack/react-query").QueryObserverResult<import("@thirdweb-dev/sdk").ContractEvent<Record<string, any>>[], unknown>>;
    remove: () => void;
    fetchStatus: import("@tanstack/react-query").FetchStatus;
} | {
    data: Record<string, any>[] | undefined;
    error: null;
    isError: false;
    isLoading: true;
    isLoadingError: false;
    isRefetchError: false;
    isSuccess: false;
    status: "loading";
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: unknown;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isPlaceholderData: boolean;
    isPreviousData: boolean;
    isRefetching: boolean;
    isStale: boolean;
    refetch: <TPageData>(options?: (import("@tanstack/react-query").RefetchOptions & import("@tanstack/react-query").RefetchQueryFilters<TPageData>) | undefined) => Promise<import("@tanstack/react-query").QueryObserverResult<import("@thirdweb-dev/sdk").ContractEvent<Record<string, any>>[], unknown>>;
    remove: () => void;
    fetchStatus: import("@tanstack/react-query").FetchStatus;
};
/**
 * Use this to buy out an auction listing from your marketplace contract.
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: buyNow,
 *     isLoading,
 *     error,
 *   } = useBuyNow(">>YourMarketplaceContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to buyout listing", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => buyNow({listingId: 1, type: ListingType.Auction})}
 *     >
 *       Buy listing!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a Marketplace contract
 * @returns a mutation object that can be used to buy out an auction listing
 * @beta
 */
export declare function useBuyNow(contract: RequiredParam<Marketplace>): import("@tanstack/react-query").UseMutationResult<Omit<{
    receipt: import("@ethersproject/abstract-provider").TransactionReceipt;
    data: () => Promise<unknown>;
}, "data">, unknown, {
    id: BigNumberish;
    type: ListingType.Direct;
    buyAmount: BigNumberish;
    buyForWallet?: string | undefined;
} | {
    id: BigNumberish;
    type: ListingType.Auction;
}, unknown>;
//# sourceMappingURL=marketplace.d.ts.map