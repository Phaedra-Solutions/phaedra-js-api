import { AxiosResponse } from "axios";
import { deleteTypes, getTypes, IBaseApisOptions, patchTypes, postTypes, putTypes } from "./@types";
export declare class BaseApis {
    static logging: boolean;
    static options: IBaseApisOptions;
    static init(baseUrl: string, logging?: boolean, options?: IBaseApisOptions): void;
    protected get(route: string, authToken?: string, type?: getTypes, headers?: object): Promise<AxiosResponse>;
    protected post(route: string, data: object, authToken?: string, type?: postTypes, headers?: object): Promise<AxiosResponse>;
    protected put(route: string, data: object, authToken?: string, type?: putTypes, headers?: object): Promise<AxiosResponse>;
    protected patch(route: string, data: object, authToken?: string, type?: patchTypes, headers?: object): Promise<AxiosResponse>;
    protected delete(route: string, data?: object, authToken?: string, type?: deleteTypes, headers?: object): Promise<AxiosResponse>;
}
//# sourceMappingURL=base-apis.d.ts.map