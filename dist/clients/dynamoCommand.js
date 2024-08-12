"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// docker run -p 8000:8000 amazon/dynamodb-local
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
class DynamoCommand {
    constructor(credentials, region) {
        const config = {
            region: region,
            credentials: credentials,
        };
        const client = new client_dynamodb_1.DynamoDBClient(config);
        this.client = client;
    }
    filterCommand(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(queryParams);
            const params = {
                TableName: queryParams.TableName,
                IndexName: queryParams.IndexName,
                KeyConditionExpression: `${queryParams.primaryKeyName} = :primary_key AND ${queryParams.sortKeyName} BETWEEN :start_value AND :end_value`,
                ExpressionAttributeValues: {
                    ":primary_key": { S: queryParams.primaryKey },
                    ":start_value": { S: queryParams.sortKey1 },
                    ":end_value": { S: queryParams.sortKey2 },
                }
            };
            try {
                const data = yield this.client.send(new client_dynamodb_1.QueryCommand(params));
                console.log(data.Items);
            }
            catch (err) {
                console.log("Error executing query:", err);
            }
        });
    }
    putCommand(putParams) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.client.send(new client_dynamodb_1.PutItemCommand(putParams));
                console.log("Item registered", data);
            }
            catch (err) {
                console.log("Error", err);
            }
        });
    }
    scanCommand(params) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = DynamoCommand;
