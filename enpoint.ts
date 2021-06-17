import { ICallMethod, IEndPoint, RequestData, requestType } from "./@types";
import { BaseApis } from "./base-apis";

export class Endpoint extends BaseApis implements IEndPoint {
    private path: string;
    private type: requestType;
    private isGuarded: boolean;

    constructor(path: string, type: requestType, isGuarded: boolean) {
        super();
        this.path = path;
        this.type = type;
        this.isGuarded = isGuarded;
    }

    public call: ICallMethod = function (data?: object, additionalData?: RequestData.IOptions | string, authToken?: string) {
        return typeof additionalData === "string" ?
            this._call(data || {}, undefined, additionalData)
            :
            this._call(data || {}, additionalData, authToken);
    }

    private _call(data: object = {}, options?: RequestData.IOptions, authToken?: string) {
        if (this.isGuarded && !authToken) throw new Error("AUTH_TOKEN_REQUIRED");
        switch (this.type) {
            case "GET":
            case "get":
                {
                    const { _path } = this.appendDataToPath(data, this.path, options?.type);
                    return this.get(_path, authToken, this.type, options?.headers);
                }
            case "POST":
            case "post":
                return this.post(this.path, data, authToken, this.type, options?.headers);
            case "PUT":
            case "put":
                {
                    if (options?.type === 'query-params') throw new Error("QUERY_PARAMS_NOT SUPPORTED");
                    const { _path, _data } = this.appendDataToPath(data, this.path, options?.type);
                    return this.put(_path, _data, authToken, this.type, options?.headers);
                }
            case "PATCH":
            case "patch":
                {
                    if (options?.type === 'query-params') throw new Error("QUERY_PARAMS_NOT SUPPORTED");
                    const { _path, _data } = this.appendDataToPath(data, this.path, options?.type);
                    return this.patch(_path, _data, authToken, this.type, options?.headers);
                }
            case "DELETE":
            case "delete":
                {
                    const { _path, _data } = this.appendDataToPath(data, this.path, options?.type);
                    return this.delete(_path, options?.type === 'query-params' ? {} : _data, authToken, this.type, options?.headers);
                }
            default:
                throw new Error("INVALID_CONFIGURATION");
        }
    }

    private appendDataToPath(data: object, path: string, type?: RequestData.requestDataType) {
        let _data = {};
        let _path = path;
        if (type === 'query-params') {
            const queryParams = "?" + Object.keys(data).map(key => `${key}=${data[key]}`).join("&");
            _path = _path + queryParams;
        }
        else {
            Object.keys(data).forEach(key => {
                if (_path.includes(":" + key)) {
                    _path = _path.split(":" + key).join(data[key])
                    data[key] = undefined;
                } else {
                    _data[key] = data[key]
                }
            });
        }
        return { _data, _path };
    }
}
