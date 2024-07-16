const tableDefinition = 
[
  {
    table_name: "YourTableName",
    primary_key: "id",
    sort_key: "created_at"
  }, {
    index_name: "OperationMethodIndex",
    primary_key: "operation_method",
    sort_key: "created_at"
  }, {
    index_name: "UserIdIndex",
    primary_key: "user_id",
    sort_key: "create_at",
  }
]

const credentials = {
  accessKey: "dymmy",
  secretKey: "dummy"
}