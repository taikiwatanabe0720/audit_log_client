"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// docker run -p 8000:8000 amazon/dynamodb-local
const { DynamoDBClient, PutItemCommand, QueryCommand } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});
class dynamoCommand {
    constructor() {
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
        const exec = async () => {
            try {
                const data = client.send(new QueryCommand(params));
                console.log(data.Items);
            }
            catch (err) {
                console.error("Error executing query:", err);
            }
        };
        exec();
    }
    async putCommand(params) {
    }
    async scanCommand(params) {
    }
}
exports.default = dynamoCommand;
