"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// docker run -p 8000:8000 amazon/dynamodb-local
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
class DynamoCommand {
    constructor(credentials) {
        const config = {
            region: "your-region",
            credentials: credentials,
        };
        const client = new client_dynamodb_1.DynamoDBClient(config);
        this.client = client;
    }
    async filterCommand(queryParams) {
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
            const data = await this.client.send(new client_dynamodb_1.QueryCommand(params));
            console.log(data.Items);
        }
        catch (err) {
            console.log("Error executing query:", err);
        }
    }
    async putCommand(putParams) {
        try {
            const data = await this.client.send(new client_dynamodb_1.PutItemCommand(putParams));
            console.log("Item registered", data);
        }
        catch (err) {
            console.log("Error", err);
        }
    }
    async scanCommand(params) {
    }
}
exports.default = DynamoCommand;
