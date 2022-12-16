"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../utils/constants");
const GnosisSafeContractEthers_1 = __importDefault(require("../GnosisSafeContractEthers"));
class GnosisSafeContract_V1_3_0_Ethers extends GnosisSafeContractEthers_1.default {
    constructor(contract) {
        super(contract);
        this.contract = contract;
    }
    async getModules() {
        const { array } = await this.contract.getModulesPaginated(constants_1.SENTINEL_ADDRESS, 10);
        return array;
    }
    async isModuleEnabled(moduleAddress) {
        return this.contract.isModuleEnabled(moduleAddress);
    }
}
exports.default = GnosisSafeContract_V1_3_0_Ethers;
//# sourceMappingURL=GnosisSafeContract_V1_3_0_Ethers.js.map