"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Code = new Schema({
    id: Number,
    wholeCode: String,
    methodsCombinations: Array,
    methods: Array,
    status: String,
    name: String
});
exports.default = mongoose_1.default.model('Code', Code, 'codes');
//# sourceMappingURL=code.js.map