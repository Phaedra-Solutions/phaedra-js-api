import { AxiosPromise, AxiosResponse } from "axios";

export type getTypes = "GET" | "get";
export type postTypes = "POST" | "post";
export type putTypes = "PUT" | "put";
export type deleteTypes = "DELETE" | "delete";
export type patchTypes = "PATCH" | "patch";

export type requestType = getTypes | postTypes | putTypes | deleteTypes | patchTypes;

export interface IBaseApisOptions {
    authorizationKey?: string;
    auhtorizationPrefix?: string;
}

export namespace RequestData {
    export type requestDataType = 'query-params' | 'params';
    export interface IOptions {
        type: requestDataType;
        headers?: object;
    }
}
export interface ICallMethod {
    (data: object, authToken?: string): Promise<AxiosResponse>;
    (data: object, options?: RequestData.IOptions, authToken?: string): Promise<AxiosResponse>;
}
export interface IEndPoint {
    call: ICallMethod
}