import { CreateAxiosDefaults } from "axios";
import { z } from "zod";
import { RunAction } from "./abstract-provider";
import { Network } from "~core/types/network";
import HttpFetchClient from "~core/utils/http-fetch-client";
import { JsonRpcProvider } from "./provider-jsonrpc";
import {
  GetTransactionsParams,
  GetJettonBurnsParams,
  GetJettonMastersParams,
  GetJettonTransfersParams,
  GetJettonWalletsParams,
  GetMessagesParams,
  GetNftCollectionsParams,
  GetNftItemsParams,
  GetNftTransfersParams,
  EstimateFeeParams,
  GetBlockHeaderParams,
  GetBlockTransactionsParams,
  RunGetMethodParams,
  RunGetMethodV3Params,
  RunGetMethodResponse,
  GetTgBTCBalanceParams,
  GetTgBTCHoldersParams,
  GetTgBTCBurnsParams,
  GetTgBTCWalletAddressByOwnerParams,
  RadixConversionParams,
  BinaryConversionParams,
  GetTgBTCTransferPayload,
  GetTgBTCBalanceResponse,
  GetTgBTCBurnsResponse,
  GetTgBTCConfigResponse,
  GetTgBTCHoldersResponse,
  GetTgBTCMasterAddressResponse,
  GetTgBTCTransferResponse,
  GetTgBTCTransfersParams,
  GetTgBTCTransfersResponse,
  GetTgBTCWalletAddressByOwnerResponse,
  TgBTCMetaDataResponse,
} from '~core/types/types';
import { TONXJsonRpcProviderOptions, TONXRunAction } from "~core/types/action-types";


const version = "v2";
export class TONXJsonRpcProvider extends JsonRpcProvider {
  private apiKey: string;
  private network: Network;
  private httpClientOptions?: CreateAxiosDefaults;

  constructor(options: TONXJsonRpcProviderOptions) {
    super();
    const { network, apiKey, httpClientOptions } = options;
    this.apiKey = apiKey;
    this.network = network;
    this.httpClientOptions = httpClientOptions;
    this.initDefaultEndpoint();
  }

  private initDefaultEndpoint() {
    this.init({
      network: this.network,
      httpFetchClient: new HttpFetchClient({
        baseURL: `https://${this.network}-rpc.tonxapi.com/${version}/json-rpc/${this.apiKey}`,
        ...this.httpClientOptions,
      }),
    });
  }

  private async performWithLabsEndpoint(action: TONXRunAction): Promise<any> {
    const labsClient = new HttpFetchClient({
      baseURL: `https://${this.network}-rpc.tonxapi.com/${version}/labs/${this.apiKey}`,
      ...this.httpClientOptions,
    });

    const request = this.getRpcRequest(action);
    if (!request) {
      throw new Error(`Method ${action.method} not implemented`);
    }

    const response = await labsClient.client.post("", {
      id: 1,
      jsonrpc: "2.0",
      method: request.method,
      params: request.params
    });

    return response.data.result;
  }

  getRpcRequest(
    action: TONXRunAction
  ): null | { method: string; params: Record<string, any> } {
    switch (action.method) {
      case "getAccountBalance":
        return { method: "getAccountBalance", params: action.params };
      case "getTransactions":
        return { method: "getTransactions", params: action.params };
      case "getJettonBurns":
        return { method: "getJettonBurns", params: action.params };
      case "getJettonMasters":
        return { method: "getJettonMasters", params: action.params };
      case "getJettonTransfers":
        return { method: "getJettonTransfers", params: action.params };
      case "getJettonWallets":
        return { method: "getJettonWallets", params: action.params };
      case "getMessages":
        return { method: "getMessages", params: action.params };
      case "getNftCollections":
        return { method: "getNftCollections", params: action.params };
      case "getNftItems":
        return { method: "getNftItems", params: action.params };
      case "getNftTransfers":
        return { method: "getNftTransfers", params: action.params };
      case "estimateFee":
        return { method: "estimateFee", params: action.params };
      case "getAddressInformation":
        return { method: "getAddressInformation", params: action.params };
      case "getAddressState":
        return { method: "getAddressState", params: action.params };
      case "getBlockHeader":
        return { method: "getBlockHeader", params: action.params };
      case "getBlockTransactions":
        return { method: "getBlockTransactions", params: action.params };
      case "getConsensusBlock":
        return { method: "getConsensusBlock", params: {} };
      case "getExtendedAddressInformation":
        return {
          method: "getExtendedAddressInformation",
          params: action.params,
        };
      case "getMasterchainBlockSignatures":
        return {
          method: "getMasterchainBlockSignatures",
          params: action.params,
        };
      case "getTokenData":
        return { method: "getTokenData", params: action.params };
      case "runGetMethod":
        return { method: "runGetMethod", params: action.params };
      case "sendMessage":
        return { method: "sendMessage", params: action.params };
      case "getBocStatus":
        return { method: "getBocStatus", params: action.params };
      case "verifyBoc":
        return { method: "verifyBoc", params: action.params };
      case "radixConversion":
        return { method: "radixConversion", params: action.params };
      case "binaryConversion":
        return { method: "binaryConversion", params: action.params };
      case "detectAddress":
        return { method: "detectAddress", params: action.params };
      case "getMasterchainInfo":
        return { method: "getMasterchainInfo", params: {} };
      case "getTgBTCConfig":
        return { method: "getTgBTCConfig", params: {} };
      case "getTgBTCBalance":
        return { method: "getTgBTCBalance", params: action.params };
      case "getTgBTCMasterAddress":
        return { method: "getTgBTCMasterAddress", params: {} };
      case "getTgBTCHolders":
        return { method: "getTgBTCHolders", params: action.params };
      case "getTgBTCBurns":
        return { method: "getTgBTCBurns", params: action.params };
      case "getTgBTCWalletAddressByOwner":
        return { method: "getTgBTCWalletAddressByOwner", params: action.params };
      case "getTgBTCTransferPayload":
        return { method: "getTgBTCTransferPayload", params: action.params };
      case "getTgBTCMetaData":
        return { method: "getTgBTCMetaData", params: {} };
      case "getTgBTCTransfers":
        return { method: "getTgBTCTransfers", params: action.params };
      default:
        return super.getRpcRequest(action as RunAction);
    }
  }

  async getAccountBalance(address: string): Promise<any> {
    return await this._perform({
      method: "getAccountBalance",
      params: { address },
    });
  }

  async getTransactions(params: GetTransactionsParams = {}): Promise<any> {
    return await this._perform({
      method: "getTransactions",
      params,
    });
  }

  async getJettonBurns(params: GetJettonBurnsParams = {}): Promise<any> {
    return await this._perform({
      method: "getJettonBurns",
      params,
    });
  }

  async getJettonMasters(params: GetJettonMastersParams = {}): Promise<any> {
    return await this._perform({
      method: "getJettonMasters",
      params,
    });
  }

  async getJettonTransfers(
    params: GetJettonTransfersParams = {}
  ): Promise<any> {
    return await this._perform({
      method: "getJettonTransfers",
      params,
    });
  }

  async getJettonWallets(params: GetJettonWalletsParams = {}): Promise<any> {
    return await this._perform({
      method: "getJettonWallets",
      params,
    });
  }

  async getMessages(params: GetMessagesParams = {}): Promise<any> {
    return await this._perform({
      method: "getMessages",
      params,
    });
  }

  async getNftCollections(params: GetNftCollectionsParams = {}): Promise<any> {
    return await this._perform({
      method: "getNftCollections",
      params,
    });
  }

  async getNftItems(params: GetNftItemsParams = {}): Promise<any> {
    return await this._perform({
      method: "getNftItems",
      params,
    });
  }

  async getNftTransfers(params: GetNftTransfersParams = {}): Promise<any> {
    return await this._perform({
      method: "getNftTransfers",
      params,
    });
  }

  async estimateFee(params: EstimateFeeParams = {}): Promise<any> {
    return await this._perform({
      method: "estimateFee",
      params,
    });
  }

  async getAddressInformation(address: string): Promise<any> {
    return await this._perform({
      method: "getAddressInformation",
      params: { address },
    });
  }

  async getAddressState(address: string): Promise<any> {
    return await this._perform({
      method: "getAddressState",
      params: { address },
    });
  }

  async getBlockHeader(params: GetBlockHeaderParams): Promise<any> {
    return await this._perform({
      method: "getBlockHeader",
      params,
    });
  }

  async getBlockTransactions(params: GetBlockTransactionsParams): Promise<any> {
    return await this._perform({
      method: "getBlockTransactions",
      params,
    });
  }

  async getConsensusBlock(): Promise<any> {
    return await this._perform({
      method: "getConsensusBlock",
      params: {},
    });
  }

  async getExtendedAddressInformation(address: string): Promise<any> {
    return await this._perform({
      method: "getExtendedAddressInformation",
      params: { address },
    });
  }

  async getMasterchainBlockSignatures(seqno: number): Promise<any> {
    return await this._perform({
      method: "getMasterchainBlockSignatures",
      params: { seqno },
    });
  }

  async getTokenData(address: string): Promise<any> {
    return await this._perform({
      method: "getTokenData",
      params: { address },
    });
  }

  async runGetMethod(params: RunGetMethodParams | RunGetMethodV3Params): Promise<RunGetMethodResponse> {
    const v2Params = z.object({
      address: z.string(),
      method: z.string(),
      stack: z.optional(
        z.array(
          z.tuple([z.literal("num"), z.number()])
            .or(z.tuple([z.literal("cell"), z.string()]))
            .or(z.tuple([z.literal("slice"), z.string()]))
        )
      ),
    }).safeParse(params);

    if (v2Params.success) {
      return await this._perform({
        method: "runGetMethod",
        params: {
          address: v2Params.data.address,
          method: v2Params.data.method,
          stack: (!v2Params.data.stack) ? [] : v2Params.data.stack.map((eachStack) => {
            switch (eachStack[0]) {
              case "num":
                return ["num", eachStack[1].toString(10)];
              case "cell":
                return ["tvm.Cell", eachStack[1]];
              case "slice":
                return ["tvm.Slice", eachStack[1]];
            }
          }),
        },
      });
    }

    const v3Params = z.object({
      address: z.string(),
      method: z.string(),
      stack: z.optional(
        z.array(
          z.object({ type: z.literal("num"), value: z.string() })
            .or(z.object({ type: z.literal("cell"), value: z.string() }))
            .or(z.object({ type: z.literal("slice"), value: z.string() }))
        )
      ),
    }).safeParse(params);

    if (v3Params.success) {
      return await this._perform({
        method: "runGetMethod",
        params: {
          address: v3Params.data.address,
          method: v3Params.data.method,
          stack: (!v3Params.data.stack) ? [] : v3Params.data.stack.map((eachStack) => {
            switch (eachStack.type) {
              case "num":
                if (eachStack.value.toLowerCase().startsWith("0x")) {
                  return ["num", BigInt(eachStack.value.toLowerCase()).toString(10)];
                } else {
                  return ["num", eachStack.value]; // decimal number string
                }
              case "cell":
                return ["tvm.Cell", eachStack.value];
              case "slice":
                return ["tvm.Slice", eachStack.value];
            }
          }),
        },
      });
    }

    throw new Error("Unknown type of params");
  }

  async sendMessage(boc: string): Promise<any> {
    return await this._perform({
      method: "sendMessage",
      params: { boc },
    });
  }

  async getBocStatus(boc: string): Promise<any> {
    return await this.performWithLabsEndpoint({
      method: "getBocStatus",
      params: { boc },
    });
  }

  async verifyBoc(boc: string): Promise<any> {
    return await this.performWithLabsEndpoint({
      method: "verifyBoc",
      params: { boc },
    });
  }

  async radixConversion(params: RadixConversionParams): Promise<any> {
    return await this.performWithLabsEndpoint({
      method: "radixConversion",
      params
    });
  }

  async binaryConversion(params: BinaryConversionParams): Promise<any> {
    return await this.performWithLabsEndpoint({
      method: "binaryConversion",
      params
    });
  }

  async detectAddress(address: string): Promise<any> {
    return await this.performWithLabsEndpoint({
      method: "detectAddress",
      params: { address }
    });
  }

  async getMasterchainInfo(): Promise<any> {
    return await this._perform({
      method: "getMasterchainInfo",
      params: {},
    });
  }

  async getTgBTCConfig(): Promise<GetTgBTCConfigResponse> {
    return await this._perform({
      method: "getTgBTCConfig",
      params: {}
    });
  }

  async getTgBTCBalance(params: GetTgBTCBalanceParams): Promise<GetTgBTCBalanceResponse> {
    return await this._perform({
      method: "getTgBTCBalance",
      params: params
    });
  }

  async getTgBTCMasterAddress(): Promise<GetTgBTCMasterAddressResponse> {
    return await this._perform({
      method: "getTgBTCMasterAddress",
      params: {},
    });
  }

  async getTgBTCHolders(params?: GetTgBTCHoldersParams): Promise<GetTgBTCHoldersResponse> {
    return await this._perform({
      method: "getTgBTCHolders",
      params: params ?? {},
    });
  }

  async getTgBTCBurns(params: GetTgBTCBurnsParams): Promise<GetTgBTCBurnsResponse> {
    return await this._perform({
      method: "getTgBTCBurns",
      params: params,
    });
  }

  async getTgBTCWalletAddressByOwner(params: GetTgBTCWalletAddressByOwnerParams): Promise<GetTgBTCWalletAddressByOwnerResponse> {
    return await this._perform({
      method: "getTgBTCWalletAddressByOwner",
      params: params,
    });
  }

  async getTgBTCTransferPayload(params: GetTgBTCTransferPayload): Promise<GetTgBTCTransferResponse> {
    return await this._perform({
      method: "getTgBTCTransferPayload",
      params
    });
  }

  async getTgBTCMetaData(): Promise<TgBTCMetaDataResponse> {
    return await this._perform({
      method: "getTgBTCMetaData",
      params: {},
    });
  }

  async getTgBTCTransfers(params: GetTgBTCTransfersParams): Promise<GetTgBTCTransfersResponse[]> {
    return await this._perform({
      method: "getTgBTCTransfers",
      params: params,
    });
  }
}
