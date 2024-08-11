const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

class DynamoService {
  private client: any
  constructor (
    credentials: any
  ) {
    this.client = new DynamoDBClient(credentials);
  }
}

export default DynamoService