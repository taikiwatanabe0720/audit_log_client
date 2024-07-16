declare class dynamoCommand {
    private client;
    constructor();
    filterCommand(queryParams: any): Promise<void>;
    putCommand(params: any): Promise<void>;
    scanCommand(params: any): Promise<void>;
}
export default dynamoCommand;
