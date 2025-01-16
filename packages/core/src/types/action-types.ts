import { CreateAxiosDefaults } from "axios";
import { RunAction } from "~core/providers/abstract-provider";
import { JsonRpcApiProviderOptions } from "~core/providers/provider-jsonrpc";
import { GetAccountBalanceParams, GetTransactionsParams, GetJettonBurnsParams, GetJettonMastersParams, GetJettonTransfersParams, GetJettonWalletsParams, GetMessagesParams, GetNftCollectionsParams, GetNftItemsParams, GetNftTransfersParams, EstimateFeeParams, GetAddressInformationParams, GetAddressStateParams, GetBlockHeaderParams, GetBlockTransactionsParams, GetExtendedAddressInformationParams, GetMasterchainBlockSignaturesParams, GetTokenDataParams, RunGetMethodParams, SendMessageParams, GetBocStatusParams, VerifyBocParams, RadixConversionParams, BinaryConversionParams, DetectAddressParams, GetTgBTCBalanceParams, GetTgBTCHoldersParams, GetTgBTCBurnsParams, GetTgBTCTransferPayload, GetTgBTCTransfersParams } from "./types";

export type TONXRunAction =
    | RunAction
    | {
        method: "getAccountBalance";
        params: GetAccountBalanceParams;
    }
    | {
        method: "getTransactions";
        params: GetTransactionsParams;
    }
    | {
        method: "getJettonBurns";
        params: GetJettonBurnsParams;
    }
    | {
        method: "getJettonMasters";
        params: GetJettonMastersParams;
    }
    | {
        method: "getJettonTransfers";
        params: GetJettonTransfersParams;
    }
    | {
        method: "getJettonWallets";
        params: GetJettonWalletsParams;
    }
    | {
        method: "getMessages";
        params: GetMessagesParams;
    }
    | {
        method: "getNftCollections";
        params: GetNftCollectionsParams;
    }
    | {
        method: "getNftItems";
        params: GetNftItemsParams;
    }
    | {
        method: "getNftTransfers";
        params: GetNftTransfersParams;
    }
    | {
        method: "estimateFee";
        params: EstimateFeeParams;
    }
    | {
        method: "getAddressInformation";
        params: GetAddressInformationParams;
    }
    | {
        method: "getAddressState";
        params: GetAddressStateParams;
    }
    | {
        method: "getBlockHeader";
        params: GetBlockHeaderParams;
    }
    | {
        method: "getBlockTransactions";
        params: GetBlockTransactionsParams;
    }
    | {
        method: "getConsensusBlock";
    }
    | {
        method: "getExtendedAddressInformation";
        params: GetExtendedAddressInformationParams;
    }
    | {
        method: "getMasterchainBlockSignatures";
        params: GetMasterchainBlockSignaturesParams;
    }
    | {
        method: "getTokenData";
        params: GetTokenDataParams;
    }
    | {
        method: "runGetMethod";
        params: RunGetMethodParams;
    }
    | {
        method: "sendMessage";
        params: SendMessageParams;
    }
    | {
        method: "getBocStatus";
        params: GetBocStatusParams;
    } | {
        method: "verifyBoc";
        params: VerifyBocParams;
    } | {
        method: "radixConversion";
        params: RadixConversionParams;
    } | {
        method: "binaryConversion";
        params: BinaryConversionParams;
    } | {
        method: "detectAddress";
        params: DetectAddressParams;
    } | {
        method: "getMasterchainInfo";
    } | {
        method: "getTgBTCConfig";
    } | {
        method: "getTgBTCBalance";
        params: GetTgBTCBalanceParams;
    } | {
        method: "getTgBTCMasterAddress";
    } | {
        method: "getTgBTCHolders";
        params: GetTgBTCHoldersParams;
    } | {
        method: "getTgBTCBurns";
        params: GetTgBTCBurnsParams;
    } | {
        method: "getTgBTCTransferPayload",
        params: GetTgBTCTransferPayload;
    } | {
        method: "getTgBTCTransfers",
        params: GetTgBTCTransfersParams;
    }

export type TONXJsonRpcProviderOptions = JsonRpcApiProviderOptions & {
    apiKey: string;
    httpClientOptions?: CreateAxiosDefaults;
};