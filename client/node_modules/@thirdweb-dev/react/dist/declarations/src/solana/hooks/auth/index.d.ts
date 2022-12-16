import { LoginConfig } from "./useLogin";
export * from "./useLogin";
export * from "./useLogout";
export * from "./useUser";
/**
 *
 * @returns
 * @internal
 */
export declare function useAuth(loginConfig?: LoginConfig): {
    login: (cfg?: {
        chainId?: number | undefined;
        nonce?: string | undefined;
        expirationTime?: Date | undefined;
    } | undefined) => Promise<void>;
    logout: () => void;
    user: import("./useUser").ThirdwebAuthUser | undefined;
    isLoading: boolean;
};
//# sourceMappingURL=index.d.ts.map