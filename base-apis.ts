import axios, { AxiosResponse } from "axios";
import { deleteTypes, getTypes, IBaseApisOptions, patchTypes, postTypes, putTypes } from "./@types";

export class BaseApis {
    static logging: boolean;
    static options: IBaseApisOptions = {
        authorizationKey: "Authorization",
        auhtorizationPrefix: "Bearer ",
    }

    static init(baseUrl: string, logging?: boolean, options: IBaseApisOptions = {}) {
        axios.defaults.baseURL = baseUrl;
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
        }
    }

    protected get(route: string, authToken?: string, type?: getTypes, headers: object = {}): Promise<AxiosResponse> {
        const _headers: object = { ...headers }
        if (authToken) _headers[BaseApis.options.authorizationKey] = BaseApis.options.auhtorizationPrefix + authToken;
        BaseApis.logging && console.log('GET API INVOKED', route);
        return type === 'get' ?
            axios({
                method: "get",
                url: route,
                headers: _headers
            })
            :
            axios.get(route, {
                headers: _headers
            })
    }

    protected post(route: string, data: object, authToken?: string, type?: postTypes, headers: object = {}): Promise<AxiosResponse> {
        const _headers: object = { ...headers }
        if (authToken) _headers[BaseApis.options.authorizationKey] = BaseApis.options.auhtorizationPrefix + authToken;
        BaseApis.logging && console.log('POST API INVOKED', route, "DATA", data);
        return type === 'post' ?
            axios({
                method: "post",
                url: route,
                data: data,
                headers: _headers
            })
            :
            axios.post(route, data, {
                headers: _headers
            })
    }

    protected put(route: string, data: object, authToken?: string, type?: putTypes, headers: object = {}): Promise<AxiosResponse> {
        const _headers: object = { ...headers }
        if (authToken) _headers[BaseApis.options.authorizationKey] = BaseApis.options.auhtorizationPrefix + authToken;
        BaseApis.logging && console.log('PUT API INVOKED', route, "DATA", data);
        return type === 'put' ?
            axios({
                method: "put",
                url: route,
                data: data,
                headers: _headers
            })
            :
            axios.put(route, data, {
                headers: _headers
            })
    }

    protected patch(route: string, data: object, authToken?: string, type?: patchTypes, headers: object = {}): Promise<AxiosResponse> {
        const _headers: object = { ...headers }
        if (authToken) _headers[BaseApis.options.authorizationKey] = BaseApis.options.auhtorizationPrefix + authToken;
        BaseApis.logging && console.log('PATCH API INVOKED', route, "DATA", data);
        return type === 'patch' ?
            axios({
                method: 'patch',
                url: route,
                data: data,
                headers: _headers
            })
            :
            axios.patch(route, data, {
                headers: _headers
            })
    }

    protected delete(route: string, data?: object, authToken?: string, type?: deleteTypes, headers: object = {}): Promise<AxiosResponse> {
        const _headers: object = { ...headers }
        if (authToken) _headers[BaseApis.options.authorizationKey] = BaseApis.options.auhtorizationPrefix + authToken;
        BaseApis.logging && console.log('DELETE API INVOKED', route, "DATA", data);
        return type === 'delete' ?
            axios({
                method: "delete",
                url: route,
                data: data,
                headers: _headers
            })
            :
            axios.delete(route, {
                headers: _headers,
                data
            })
    }
}