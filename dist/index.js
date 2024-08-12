"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dynamoCommand_1 = __importDefault(require("./clients/dynamoCommand"));
console.log("=================");
console.log(dynamoCommand_1.default);
exports.default = dynamoCommand_1.default;
