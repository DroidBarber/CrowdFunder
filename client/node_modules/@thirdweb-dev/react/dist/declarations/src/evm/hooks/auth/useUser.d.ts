export interface ThirdwebAuthUser {
    address: string;
}
/**
 * Hook to get the currently logged in user.
 *
 * @returns - The currently logged in user or null if not logged in, as well as a loading state.
 *
 * @beta
 */
export declare function useUser(): {
    user: ThirdwebAuthUser | undefined;
    isLoading: boolean;
};
//# sourceMappingURL=useUser.d.ts.map