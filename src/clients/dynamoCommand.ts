// docker run -p 8000:8000 amazon/dynamodb-local
import { DynamoDBClient, PutItemCommand, QueryCommand, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
// import { Credentials } from "@aws-sdk/types";
// import { fromEnv } from "@aws-sdk/credential-providers";
import { QueryParamsType } from '../types/query-type';

class DynamoCommand {
  client: any;
  constructor(
    credentials: any,
    region: string
  ) {
    const config: DynamoDBClientConfig = {
      region: region,
      credentials: credentials,
    };
    const client = new DynamoDBClient(config);
    this.client = client
  }

  async filterCommand (queryParams: QueryParamsType) {
    console.log(queryParams)
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
      const data = await this.client.send(new QueryCommand(params));
      console.log(data.Items);
    } catch (err) {
      console.log("Error executing query:", err);
    }
  }


  async putCommand (putParams: any) {
    try {
      const data = await this.client.send(new PutItemCommand(putParams))
      console.log("Item registered", data);
    } catch (err) {
      console.log("Error", err);
    }
  }

  async scanCommand (params: any) {
    
  }
}

export default DynamoCommand;