"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseApis = void 0;
var axios_1 = __importDefault(require("axios"));
var BaseApis = /** @class */ (function () {
    function BaseApis() {
    }
    BaseApis.init = function (baseUrl, logging, options) {
        if (options === void 0) { options = {}; }
        axios_1.default.defaults.baseURL = baseUrl;
        BaseApis.logging = logging || false;
        BaseApis.options = {
            auhtorizationPrefix: options.auhtorizationPrefix !== undefined ?
                options.auhtorizationPrefix
                :
                    BaseApis.options.auhtorizationPrefix,
            authorizationKey: options.authorizationKey !== undefined ?
                options.authorizationKey
                :
                    BaseApis.options.authorizationKey
        };
    };
    BaseApis.prototype.get = function (route, authToken, type, headers) {
        if (headers === void 0) { headers = {}; }
        var _headers = __assign({}, headers);
        if (authToken)
            _headers[BaseApis.options.authorizationKey] = BaseApis.options.auhtorizationPrefix + authToken;
        BaseApis.logging && console.log('GET API INVOKED', route);
        return type === 'get' ?
            axios_1.default({
                method: "get",
                url: route,
                headers: _headers
            })
            :
                axios_1.default.get(route, {
                    headers: _headers
                });
    };
    BaseApis.prototype.post = function (route, data, authToken, type, headers) {
        if (headers === void 0) { headers = {}; }
        var _headers = __assign({}, headers);
        if (authToken)
            _headers[BaseApis.options.authorizationKey] = BaseApis.options.auhtorizationPrefix + authToken;
        BaseApis.logging && console.log('POST API INVOKED', route, "DATA", data);
        return type === 'post' ?
            axios_1.default({
                method: "post",
                url: route,
                data: data,
                headers: _headers
            })
            :
                axios_1.default.post(route, data, {
                    headers: _headers
                });
    };
    BaseApis.prototype.put = function (route, data, authToken, type, headers) {
        if (headers === void 0) { headers = {}; }
        var _headers = __assign({}, headers);
        if (authToken)
            _headers[BaseApis.options.authorizationKey] = BaseApis.options.auhtorizationPrefix + authToken;
        BaseApis.logging && console.log('PUT API INVOKED', route, "DATA", data);
        return type === 'put' ?
            axios_1.default({
                method: "put",
                url: route,
                data: data,
                headers: _headers
            })
            :
                axios_1.default.put(route, data, {
                    headers: _headers
                });
    };
    BaseApis.prototype.patch = function (route, data, authToken, type, headers) {
        if (headers === void 0) { headers = {}; }
        var _headers = __assign({}, headers);
        if (authToken)
            _headers[BaseApis.options.authorizationKey] = BaseApis.options.auhtorizationPrefix + authToken;
        BaseApis.logging && console.log('PATCH API INVOKED', route, "DATA", data);
        return type === 'patch' ?
            axios_1.default({
                method: 'patch',
                url: route,
                data: data,
                headers: _headers
            })
            :
                axios_1.default.patch(route, data, {
                    headers: _headers
                });
    };
    BaseApis.prototype.delete = function (route, data, authToken, type, headers) {
        if (headers === void 0) { headers = {}; }
        var _headers = __assign({}, headers);
        if (authToken)
            _headers[BaseApis.options.authorizationKey] = BaseApis.options.auhtorizationPrefix + authToken;
        BaseApis.logging && console.log('DELETE API INVOKED', route, "DATA", data);
        return type === 'delete' ?
            axios_1.default({
                method: "delete",
                url: route,
                data: data,
                headers: _headers
            })
            :
                axios_1.default.delete(route, {
                    headers: _headers,
                    data: data
                });
    };
    BaseApis.options = {
        authorizationKey: "Authorization",
        auhtorizationPrefix: "Bearer ",
    };
    return BaseApis;
}());
exports.BaseApis = BaseApis;
//# sourceMappingURL=base-apis.js.map