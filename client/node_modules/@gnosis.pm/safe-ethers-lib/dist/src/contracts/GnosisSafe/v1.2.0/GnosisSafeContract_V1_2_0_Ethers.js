"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GnosisSafeContractEthers_1 = __importDefault(require("../GnosisSafeContractEthers"));
class GnosisSafeContract_V1_2_0_Ethers extends GnosisSafeContractEthers_1.default {
    constructor(contract) {
        super(contract);
        this.contract = contract;
    }
    async getModules() {
        return this.contract.getModules();
    }
    async isModuleEnabled(moduleAddress) {
        return this.contract.isModuleEnabled(moduleAddress);
    }
}
exports.default = GnosisSafeContract_V1_2_0_Ethers;
//# sourceMappingURL=GnosisSafeContract_V1_2_0_Ethers.js.map