export declare const MultiwrapContractInput: import("zod").ZodObject<import("zod").extendShape<import("zod").extendShape<{
    name: import("zod").ZodString;
    description: import("zod").ZodOptional<import("zod").ZodString>;
    image: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodUnion<[import("zod").ZodTypeAny, import("zod").ZodObject<{
        data: import("zod").ZodUnion<[import("zod").ZodTypeAny, import("zod").ZodString]>;
        name: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        data?: any;
        name: string;
    }, {
        data?: any;
        name: string;
    }>]>, import("zod").ZodString]>>;
    external_link: import("zod").ZodOptional<import("zod").ZodString>;
}, {
    seller_fee_basis_points: import("zod").ZodDefault<import("zod").ZodNumber>;
    fee_recipient: import("zod").ZodDefault<import("zod").ZodEffects<import("zod").ZodString, string, string>>;
}>, {
    symbol: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
}>, "strip", import("zod").ZodTypeAny, {
    description?: string | undefined;
    image?: any;
    external_link?: string | undefined;
    symbol: string;
    name: string;
    seller_fee_basis_points: number;
    fee_recipient: string;
}, {
    symbol?: string | undefined;
    description?: string | undefined;
    image?: any;
    external_link?: string | undefined;
    seller_fee_basis_points?: number | undefined;
    fee_recipient?: string | undefined;
    name: string;
}>;
export declare const MultiwrapContractOutput: import("zod").ZodObject<import("zod").extendShape<import("zod").extendShape<import("zod").extendShape<{
    name: import("zod").ZodString;
    description: import("zod").ZodOptional<import("zod").ZodString>;
    image: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodUnion<[import("zod").ZodTypeAny, import("zod").ZodObject<{
        data: import("zod").ZodUnion<[import("zod").ZodTypeAny, import("zod").ZodString]>;
        name: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        data?: any;
        name: string;
    }, {
        data?: any;
        name: string;
    }>]>, import("zod").ZodString]>>;
    external_link: import("zod").ZodOptional<import("zod").ZodString>;
}, {
    image: import("zod").ZodOptional<import("zod").ZodString>;
}>, {
    seller_fee_basis_points: import("zod").ZodDefault<import("zod").ZodNumber>;
    fee_recipient: import("zod").ZodDefault<import("zod").ZodEffects<import("zod").ZodString, string, string>>;
}>, {
    symbol: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
}>, "strip", import("zod").ZodTypeAny, {
    description?: string | undefined;
    image?: string | undefined;
    external_link?: string | undefined;
    symbol: string;
    name: string;
    seller_fee_basis_points: number;
    fee_recipient: string;
}, {
    symbol?: string | undefined;
    description?: string | undefined;
    image?: string | undefined;
    external_link?: string | undefined;
    seller_fee_basis_points?: number | undefined;
    fee_recipient?: string | undefined;
    name: string;
}>;
export declare const MultiwrapContractDeploy: import("zod").ZodObject<import("zod").extendShape<import("zod").extendShape<import("zod").extendShape<{
    name: import("zod").ZodString;
    description: import("zod").ZodOptional<import("zod").ZodString>;
    image: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodUnion<[import("zod").ZodTypeAny, import("zod").ZodObject<{
        data: import("zod").ZodUnion<[import("zod").ZodTypeAny, import("zod").ZodString]>;
        name: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        data?: any;
        name: string;
    }, {
        data?: any;
        name: string;
    }>]>, import("zod").ZodString]>>;
    external_link: import("zod").ZodOptional<import("zod").ZodString>;
}, {
    seller_fee_basis_points: import("zod").ZodDefault<import("zod").ZodNumber>;
    fee_recipient: import("zod").ZodDefault<import("zod").ZodEffects<import("zod").ZodString, string, string>>;
}>, {
    symbol: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
}>, {
    trusted_forwarders: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodEffects<import("zod").ZodString, string, string>, "many">>;
}>, "strip", import("zod").ZodTypeAny, {
    description?: string | undefined;
    image?: any;
    external_link?: string | undefined;
    symbol: string;
    name: string;
    seller_fee_basis_points: number;
    fee_recipient: string;
    trusted_forwarders: string[];
}, {
    symbol?: string | undefined;
    description?: string | undefined;
    image?: any;
    external_link?: string | undefined;
    seller_fee_basis_points?: number | undefined;
    fee_recipient?: string | undefined;
    trusted_forwarders?: string[] | undefined;
    name: string;
}>;
export declare const MultiwrapContractSchema: {
    deploy: import("zod").ZodObject<import("zod").extendShape<import("zod").extendShape<import("zod").extendShape<{
        name: import("zod").ZodString;
        description: import("zod").ZodOptional<import("zod").ZodString>;
        image: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodUnion<[import("zod").ZodTypeAny, import("zod").ZodObject<{
            data: import("zod").ZodUnion<[import("zod").ZodTypeAny, import("zod").ZodString]>;
            name: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
            data?: any;
            name: string;
        }, {
            data?: any;
            name: string;
        }>]>, import("zod").ZodString]>>;
        external_link: import("zod").ZodOptional<import("zod").ZodString>;
    }, {
        seller_fee_basis_points: import("zod").ZodDefault<import("zod").ZodNumber>;
        fee_recipient: import("zod").ZodDefault<import("zod").ZodEffects<import("zod").ZodString, string, string>>;
    }>, {
        symbol: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
    }>, {
        trusted_forwarders: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodEffects<import("zod").ZodString, string, string>, "many">>;
    }>, "strip", import("zod").ZodTypeAny, {
        description?: string | undefined;
        image?: any;
        external_link?: string | undefined;
        symbol: string;
        name: string;
        seller_fee_basis_points: number;
        fee_recipient: string;
        trusted_forwarders: string[];
    }, {
        symbol?: string | undefined;
        description?: string | undefined;
        image?: any;
        external_link?: string | undefined;
        seller_fee_basis_points?: number | undefined;
        fee_recipient?: string | undefined;
        trusted_forwarders?: string[] | undefined;
        name: string;
    }>;
    output: import("zod").ZodObject<import("zod").extendShape<import("zod").extendShape<import("zod").extendShape<{
        name: import("zod").ZodString;
        description: import("zod").ZodOptional<import("zod").ZodString>;
        image: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodUnion<[import("zod").ZodTypeAny, import("zod").ZodObject<{
            data: import("zod").ZodUnion<[import("zod").ZodTypeAny, import("zod").ZodString]>;
            name: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
            data?: any;
            name: string;
        }, {
            data?: any;
            name: string;
        }>]>, import("zod").ZodString]>>;
        external_link: import("zod").ZodOptional<import("zod").ZodString>;
    }, {
        image: import("zod").ZodOptional<import("zod").ZodString>;
    }>, {
        seller_fee_basis_points: import("zod").ZodDefault<import("zod").ZodNumber>;
        fee_recipient: import("zod").ZodDefault<import("zod").ZodEffects<import("zod").ZodString, string, string>>;
    }>, {
        symbol: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
    }>, "strip", import("zod").ZodTypeAny, {
        description?: string | undefined;
        image?: string | undefined;
        external_link?: string | undefined;
        symbol: string;
        name: string;
        seller_fee_basis_points: number;
        fee_recipient: string;
    }, {
        symbol?: string | undefined;
        description?: string | undefined;
        image?: string | undefined;
        external_link?: string | undefined;
        seller_fee_basis_points?: number | undefined;
        fee_recipient?: string | undefined;
        name: string;
    }>;
    input: import("zod").ZodObject<import("zod").extendShape<import("zod").extendShape<{
        name: import("zod").ZodString;
        description: import("zod").ZodOptional<import("zod").ZodString>;
        image: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodUnion<[import("zod").ZodTypeAny, import("zod").ZodObject<{
            data: import("zod").ZodUnion<[import("zod").ZodTypeAny, import("zod").ZodString]>;
            name: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
            data?: any;
            name: string;
        }, {
            data?: any;
            name: string;
        }>]>, import("zod").ZodString]>>;
        external_link: import("zod").ZodOptional<import("zod").ZodString>;
    }, {
        seller_fee_basis_points: import("zod").ZodDefault<import("zod").ZodNumber>;
        fee_recipient: import("zod").ZodDefault<import("zod").ZodEffects<import("zod").ZodString, string, string>>;
    }>, {
        symbol: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
    }>, "strip", import("zod").ZodTypeAny, {
        description?: string | undefined;
        image?: any;
        external_link?: string | undefined;
        symbol: string;
        name: string;
        seller_fee_basis_points: number;
        fee_recipient: string;
    }, {
        symbol?: string | undefined;
        description?: string | undefined;
        image?: any;
        external_link?: string | undefined;
        seller_fee_basis_points?: number | undefined;
        fee_recipient?: string | undefined;
        name: string;
    }>;
};
//# sourceMappingURL=multiwrap.d.ts.map