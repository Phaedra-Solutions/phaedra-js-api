import { ICallMethod, IEndPoint, requestType } from "./@types";
import { BaseApis } from "./base-apis";
export declare class Endpoint extends BaseApis implements IEndPoint {
    private path;
    private type;
    private isGuarded;
    constructor(path: string, type: requestType, isGuarded: boolean);
    call: ICallMethod;
    private _call;
    private appendDataToPath;
}
//# sourceMappingURL=enpoint.d.ts.map