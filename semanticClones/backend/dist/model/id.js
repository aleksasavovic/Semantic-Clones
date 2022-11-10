"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Id = new Schema({
    nextId: Number,
    nextIdCode: Number
});
exports.default = mongoose_1.default.model('Id', Id, 'id');
//# sourceMappingURL=id.js.map