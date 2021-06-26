import { AxiosResponse } from "axios";
export declare type getTypes = "GET" | "get";
export declare type postTypes = "POST" | "post";
export declare type putTypes = "PUT" | "put";
export declare type deleteTypes = "DELETE" | "delete";
export declare type patchTypes = "PATCH" | "patch";
export declare type requestType = getTypes | postTypes | putTypes | deleteTypes | patchTypes;
export interface IBaseApisOptions {
    authorizationKey?: string;
    auhtorizationPrefix?: string;
}
export declare namespace RequestData {
    type requestDataType = 'query-params' | 'params';
    interface IOptions {
        type: requestDataType;
        headers?: object;
    }
}
export interface ICallMethod {
    (data: object, authToken?: string): Promise<AxiosResponse>;
    (data: object, options?: RequestData.IOptions, authToken?: string): Promise<AxiosResponse>;
}
export interface IEndPoint {
    call: ICallMethod;
}
