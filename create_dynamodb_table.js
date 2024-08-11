// docker run -d --name dynamodb -p 8000:8000 amazon/dynamodb-local
const { DynamoDBClient, CreateTableCommand } = require("@aws-sdk/client-dynamodb");
require('dotenv').config();

// DynamoDBクライアントの設定
const client = new DynamoDBClient({
  region: process.env.region,
  endpoint: process.env.endpoint,
  // credentials: {
  //   accessKeyId: process.env.accessKeyId, // 任意のキー
  //   secretAccessKey: process.env.secretAccessKey // 任意のキー
  // }
});

const params = {
  TableName: process.env.table_name,
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" }, // パーティションキー
    { AttributeName: "created_at", KeyType: "RANGE" } // ソートキー
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" }, // プライマリキーの型 (S: String)
    { AttributeName: "created_at", AttributeType: "S" }, // ソートキーの型 (S: String)
    { AttributeName: "operation_method", AttributeType: "S" }, // インデックスのプライマリキーの型 (S: String)
    { AttributeName: "user_id", AttributeType: "S" } // インデックスのプライマリキーの型 (S: String)
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  },
  GlobalSecondaryIndexes: [
    {
      IndexName: "OperationMethodIndex",
      KeySchema: [
        { AttributeName: "operation_method", KeyType: "HASH" }, // GSIのパーティションキー
        { AttributeName: "created_at", KeyType: "RANGE" } // GSIのソートキー
      ],
      Projection: {
        ProjectionType: "ALL" // プロジェクションタイプ (ALL, KEYS_ONLY, INCLUDE)
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    },
    {
      IndexName: "UserIdIndex",
      KeySchema: [
        { AttributeName: "user_id", KeyType: "HASH" }, // GSIのパーティションキー
        { AttributeName: "created_at", KeyType: "RANGE" } // GSIのソートキー
      ],
      Projection: {
        ProjectionType: "ALL" // プロジェクションタイプ (ALL, KEYS_ONLY, INCLUDE)
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    }
  ]
};

const run = async () => {
  try {
    const data = await client.send(new CreateTableCommand(params));
    console.log("Table Created", data);
  } catch (err) {
    console.log("Error", err);
  }
};

run();