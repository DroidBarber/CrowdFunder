"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
const GnosisSafeContractEthers_1 = __importDefault(require("../GnosisSafeContractEthers"));
class GnosisSafeContract_V1_1_1_Ethers extends GnosisSafeContractEthers_1.default {
    constructor(contract) {
        super(contract);
        this.contract = contract;
    }
    async getModules() {
        return this.contract.getModules();
    }
    async isModuleEnabled(moduleAddress) {
        const modules = await this.getModules();
        const isModuleEnabled = modules.some((enabledModuleAddress) => (0, utils_1.sameString)(enabledModuleAddress, moduleAddress));
        return isModuleEnabled;
    }
}
exports.default = GnosisSafeContract_V1_1_1_Ethers;
//# sourceMappingURL=GnosisSafeContract_V1_1_1_Ethers.js.map