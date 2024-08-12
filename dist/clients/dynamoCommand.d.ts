import { QueryParamsType } from '../types/query-type';
declare class DynamoCommand {
    client: any;
    constructor(credentials: any, region: string);
    filterCommand(queryParams: QueryParamsType): Promise<void>;
    putCommand(putParams: any): Promise<void>;
    scanCommand(params: any): Promise<void>;
}
export default DynamoCommand;
