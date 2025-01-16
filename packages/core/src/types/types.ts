export type GetAccountBalanceParams = {
    address: string;
};

export type GetTransactionsParams = {
    account?: string;
    end_lt?: number;
    end_utime?: number;
    hash?: string;
    limit?: number;
    offset?: number;
    seqno?: number;
    shard?: string;
    sort?: string;
    start_lt?: number;
    start_utime?: number;
    workchain?: number;
};

export type GetJettonBurnsParams = {
    address?: string;
    end_lt?: number;
    end_utime?: number;
    jetton_master?: string;
    jetton_wallet?: string;
    limit?: number;
    offset?: number;
    sort?: "ASC" | "DESC";
    start_lt?: number;
    start_utime?: number;
};

export type GetJettonMastersParams = {
    address?: string;
    admin_address?: string;
    limit?: number;
    offset?: number;
};

export type GetJettonTransfersParams = {
    address?: string;
    direction?: "in" | "out" | "both";
    end_lt?: number;
    end_utime?: number;
    jetton_master?: string;
    jetton_wallet?: string;
    limit?: number;
    offset?: number;
    sort?: "ASC" | "DESC";
    start_lt?: number;
    start_utime?: number;
};

export type GetJettonWalletsParams = {
    address?: string;
    jetton_address?: string;
    limit?: number;
    offset?: number;
    owner_address?: string;
};

export type GetMessagesParams = {
    body_hash?: string;
    destination?: string;
    hash?: string;
    limit?: number;
    offset?: number;
    source?: string;
};

export type GetNftCollectionsParams = {
    collection_address?: string;
    limit?: number;
    offset?: number;
    owner_address?: string;
};

export type GetNftItemsParams = {
    collection_address?: string;
    limit?: number;
    offset?: number;
    owner_address?: string;
};

export type GetNftTransfersParams = {
    address?: string;
    collection_address?: string;
    direction?: "in" | "out" | "both";
    end_lt?: number;
    end_utime?: number;
    item_address?: string;
    limit?: number;
    offset?: number;
    sort?: "ASC" | "DESC";
    start_lt?: number;
    start_utime?: number;
};

export type EstimateFeeParams = {
    address?: string;
    body?: string;
    ignore_chksig?: boolean;
    init_code?: string;
    init_data?: string;
};

export type GetAddressInformationParams = {
    address: string;
};

export type GetAddressStateParams = {
    address: string;
};

export type GetBlockHeaderParams = {
    file_hash?: string;
    root_hash?: string;
    seqno: number;
    shard: string;
    workchain: number;
};

export type GetBlockTransactionsParams = {
    after_hash?: string;
    after_lt?: number;
    count?: number;
    file_hash?: string;
    root_hash?: string;
    seqno?: number;
    shard?: string;
    workchain?: number;
};

export type GetExtendedAddressInformationParams = {
    address: string;
};

export type GetMasterchainBlockSignaturesParams = {
    seqno: number;
};

export type GetTokenDataParams = {
    address: string;
};

/**
 * @param address - TON address of the smart contract you want to execute the `get-method`
 * @param method - The function name of the `get-method`
 * @param stack - The input parameter of the `get-method` if it needs
 */
export type RunGetMethodParams = {
    address: string;
    method: string;
    stack?: Array<["num", number] | ["cell", string] | ["slice", string]>;
};

/**
 * @description TON Center V3 style RunGetMethod parameters
 * @param address - TON address of the smart contract you want to execute the `get-method`
 * @param method - The function name of the `get-method`
 * @param stack - The input parameter of the `get-method` if it needs
 */
export type RunGetMethodV3Params = {
    address: string;
    method: string;
    stack?: Array<{ type: "num" | "cell" | "slice"; value: string; }>;
};

export type RunGetMethodResponse = {
    exit_code: number;
    stack: any[];
    gas_used: number;
    "@type": string;
    "@extra": string;
};

export type SendMessageParams = {
    boc: string;
};

export type GetBocStatusParams = {
    boc: string;
}

export type VerifyBocParams = {
    boc: string;
}

export type RadixConversionParams = {
    base: string;
    number: string;
}

export type BinaryConversionParams = {
    ascii: string;
    base64?: string;
    base64url?: string;
    hexadecimal?: string;
}

export type DetectAddressParams = {
    address: string;
}

export type GetTgBTCConfigResponse = {
    jetton_master: string;
    teleport: string;
    coordinator: string;
};

/**
 * @param {string} address - TON address of the owner's Jetton Wallet (base64, base64Url, or hexadecimal)  
 */
export type GetTgBTCBalanceParams = {
    address: string;
};

export type GetTgBTCBalanceResponse = {
    address: string;
    balance: string;
};

export type GetTgBTCMasterAddressResponse = {
    address: string;
    account_friendly: string;
};

/**
 * @param {number} limit - The number of tgBTC holders you want to see
 * @param {number} offset - The number of tgBTC holders skipped
 */
export type GetTgBTCHoldersParams = {
    limit?: number;
    offset?: number;
};

export type GetTgBTCHoldersResponse = {
    holders: {
        address: string;
        balance: string;
        last_updated: number;
        owner_type: string;
    }[];
    total: number;
};

export type GetTgBTCBurnsAddress = { address: string; } | { jetton_wallet: string; };

export type GetTgBTCBurnsUtime = {
    start_utime: number;
    end_utime: number;
} | {
    start_utime?: undefined;
    end_utime?: undefined;
};

export type GetTgBTCBurnsLt = {
    start_lt: number;
    end_lt: number;
} | {
    start_lt?: undefined;
    end_lt?: undefined;
};

/**
 * @param {string} address - TON address of the tgBTC owner (required when jetton_wallet is absent) (base64, base64Url, or hexadecimal)
 * @param {string} jetton_wallet - TON address of the tgBTC Jetton Wallet (required when address is absent) (base64, base64Url, or hexadecimal)
 * @param {number} start_utime - The beginning transaction Unix timestamp (required when end_utime is used)
 * @param {number} end_utime - The ending transaction Unix timestamp (required when start_utime is used)
 * @param {number} start_lt - The beginning transaction logical time (LT) (required when end_lt is used)
 * @param {number} end_lt - The ending transaction logical time (LT) (required when start_lt is used)
 * @param {"ASC" | "DESC"} sort - Enable sorting on responses by logical time (LT)
 * @param {number} limit - The number of tgBTC burn messages you want to see
 * @param {number} offset - The number of tgBTC burn messages skipped
 */
export type GetTgBTCBurnsParams = GetTgBTCBurnsAddress
    & GetTgBTCBurnsUtime
    & GetTgBTCBurnsLt
    & Partial<{ sort: "ASC" | "DESC"; limit: number; offset: number; }>;

export type GetTgBTCBurnsResponse = {
    query_id: string;
    owner: string;
    jetton_master: string;
    jetton_wallet: string;
    amount: string;
    transaction_hash: string;
    transaction_lt: string;
    transaction_now: number;
    response_destination?: string;
    custom_payload?: string;
}

export type GetTgBTCWalletAddressByOwnerParams = {
    owner_address: string;
}

export type GetTgBTCWalletAddressByOwnerResponse = {
    address: string;
    address_friendly: string;
    owner: string;
    owner_friendly: string;
    jetton: string;
    jetton_friendly: string;
}

export type GetTgBTCTransferPayload = {
    amount: number;
    destination: string;
    source: string;
    comment?: string;
}

export type GetTgBTCTransferResponse = {
    address: string;
    amount: number;
    payload: string;
}

export type TgBTCMetaDataResponse = {
    address: string;
    name: string;
    symbol: string;
    total_supply?: string;
    admin_address?: string;
    decimals?: string;
    mintable?: boolean;
    uri?: string;
    image?: string;
    image_data?: number[];
    description?: string;
}

export type TimeRange = {
    start_utime: number;
    end_utime: number;
} | {
    start_utime?: undefined;
    end_utime?: undefined;
};

export type LtRange = {
    start_lt: number;
    end_lt: number;
} | {
    start_lt?: undefined;
    end_lt?: undefined;
};

export type GetTgBTCTransfersParams = {
    address: string;
    jetton_wallet?: string;
    direction?: 'in' | 'out' | 'both'
    sort?: 'ASC' | 'DESC';
    /** Use with limit to batch read (1-256) */
    limit?: number;
    /** Skip first N rows*/
    offset?: number;

} & TimeRange & LtRange

export type GetTgBTCTransfersResponse = {
    query_id: string;
    source: string;
    destination: string;
    amount: string;
    source_wallet: string;
    jetton_master: string;
    transaction_hash: string;
    transaction_lt: string;
    transaction_now: number;
    response_destination?: string;
    custom_payload?: string;
    forward_ton_amount: string;
    forward_payload?: string;
}