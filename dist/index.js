"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoCommand = void 0;
const dynamoCommand_1 = __importDefault(require("./clients/dynamoCommand"));
exports.DynamoCommand = dynamoCommand_1.default;
console.log("=================");
console.log(dynamoCommand_1.default);
