"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let randomList = new Schema({
    randomList: Array
});
exports.default = mongoose_1.default.model('randomList', randomList, 'randomList');
//# sourceMappingURL=randomList.js.map