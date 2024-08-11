"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
class DynamoService {
    constructor(credentials) {
        this.client = new DynamoDBClient(credentials);
    }
}
exports.default = DynamoService;
