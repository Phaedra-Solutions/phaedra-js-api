"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endpoint = void 0;
var base_apis_1 = require("./base-apis");
var Endpoint = /** @class */ (function (_super) {
    __extends(Endpoint, _super);
    function Endpoint(path, type, isGuarded) {
        var _this = _super.call(this) || this;
        _this.call = function (data, additionalData, authToken) {
            return typeof additionalData === "string" ?
                this._call(data || {}, undefined, additionalData)
                :
                    this._call(data || {}, additionalData, authToken);
        };
        _this.path = path;
        _this.type = type;
        _this.isGuarded = isGuarded;
        return _this;
    }
    Endpoint.prototype._call = function (data, options, authToken) {
        if (data === void 0) { data = {}; }
        if (this.isGuarded && !authToken)
            throw new Error("AUTH_TOKEN_REQUIRED");
        switch (this.type) {
            case "GET":
            case "get":
                {
                    var _path = this.appendDataToPath(data, this.path, options === null || options === void 0 ? void 0 : options.type)._path;
                    return this.get(_path, authToken, this.type, options === null || options === void 0 ? void 0 : options.headers);
                }
            case "POST":
            case "post":
                return this.post(this.path, data, authToken, this.type, options === null || options === void 0 ? void 0 : options.headers);
            case "PUT":
            case "put":
                {
                    if ((options === null || options === void 0 ? void 0 : options.type) === 'query-params')
                        throw new Error("QUERY_PARAMS_NOT SUPPORTED");
                    var _a = this.appendDataToPath(data, this.path, options === null || options === void 0 ? void 0 : options.type), _path = _a._path, _data = _a._data;
                    return this.put(_path, _data, authToken, this.type, options === null || options === void 0 ? void 0 : options.headers);
                }
            case "PATCH":
            case "patch":
                {
                    if ((options === null || options === void 0 ? void 0 : options.type) === 'query-params')
                        throw new Error("QUERY_PARAMS_NOT SUPPORTED");
                    var _b = this.appendDataToPath(data, this.path, options === null || options === void 0 ? void 0 : options.type), _path = _b._path, _data = _b._data;
                    return this.patch(_path, _data, authToken, this.type, options === null || options === void 0 ? void 0 : options.headers);
                }
            case "DELETE":
            case "delete":
                {
                    var _c = this.appendDataToPath(data, this.path, options === null || options === void 0 ? void 0 : options.type), _path = _c._path, _data = _c._data;
                    return this.delete(_path, (options === null || options === void 0 ? void 0 : options.type) === 'query-params' ? {} : _data, authToken, this.type, options === null || options === void 0 ? void 0 : options.headers);
                }
            default:
                throw new Error("INVALID_CONFIGURATION");
        }
    };
    Endpoint.prototype.appendDataToPath = function (data, path, type) {
        var _data = {};
        var _path = path;
        if (type === 'query-params') {
            var queryParams = "?" + Object.keys(data).map(function (key) { return key + "=" + data[key]; }).join("&");
            _path = _path + queryParams;
        }
        else {
            Object.keys(data).forEach(function (key) {
                if (_path.includes(":" + key)) {
                    _path = _path.split(":" + key).join(data[key]);
                    data[key] = undefined;
                }
                else {
                    _data[key] = data[key];
                }
            });
        }
        return { _data: _data, _path: _path };
    };
    return Endpoint;
}(base_apis_1.BaseApis));
exports.Endpoint = Endpoint;
