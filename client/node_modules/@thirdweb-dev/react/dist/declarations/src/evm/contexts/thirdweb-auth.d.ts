import React, { PropsWithChildren } from "react";
/**
 * The configuration to use the react SDK with an [auth](https://portal.thirdweb.com/auth) server.
 *
 * @beta
 */
export interface ThirdwebAuthConfig {
    /**
     * The backend URL of the authentication endoints. For example, if your endpoints are
     * at `/api/auth/login`, `/api/auth/logout`, etc. then this should be set to `/api/auth`.
     */
    authUrl: string;
    /**
     * The frontend domain used to generate the login payload.
     * This domain should match the domain used on your auth backend.
     */
    domain: string;
    /**
     * The URL to redirect to after a succesful login.
     */
    loginRedirect?: string;
}
export declare const ThirdwebAuthConfigProvider: React.FC<PropsWithChildren<{
    value?: ThirdwebAuthConfig;
}>>;
export declare function useThirdwebAuthConfig(): ThirdwebAuthConfig | undefined;
//# sourceMappingURL=thirdweb-auth.d.ts.map