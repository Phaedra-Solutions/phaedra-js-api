## Phaedra solutions javascript APIs library

Calling an api is an essential part of almost every modern javascript application. As it is a very essential part of almost every application, this library is written to facilitate and implement a standarized version of javascript api calls. This library is built on top of axios so be sure to install axios before proceeding with this
```npm i -s Axios```

### Table of contents
  - [Installation](#installation)
  - [Initializing the library](#initializing-the-library)
  - [Creating an end point and calling an api](#creating-an-end-point-and-calling-an-api)
    - [Get request](#get-request)
    - [Post request](#post-request)
    - [Put request](#put-request)
    - [Patch request](#patch-request)
    - [Delete request](#delete-request)

#### Installation
```npm i -s @phaedra/js-api```

#### Initializing the library

`BaseApis` class has a member named `init`. It needs to be called at the root of your project to setup the apis instance. `BaseApis.init` takes three arguments
- `baseUrl`: The base url to be appended with each request.
- `logging`: If set true, you will see logs of each request in the console. Defaults to false
- `options`: An object to override the default configuration of authorization jwt header. If not set manually, it defaults to the following object
~~~js
{
    authorizationKey: "Authorization",
    auhtorizationPrefix: "Bearer ",
}
// This configuration will send the following authorization header
{
    header: {
        Authorization: "Bearer + <authToken>" // This auth token is passed to the api call method and will be explained in calling the api section
    }
}
~~~

~~~js
import { BaseApis } from "@phaedra/js-api";

/**
 *
 * @param {string} baseUrl The base url of apis endpoints
 * @param {boolean} logging If set true, you will see logs of each request in the console
 * @param {IBaseApisOptions} options An object to override the default configuration of authorization jwt header. Defaults to
 *  {
        authorizationKey: "Authorization",
        auhtorizationPrefix: "Bearer ",
    }
 */

BaseApis.init("http://localhost:3000/api/v1", process.env.REACT_APP_ENV === 'development', { authorizationKey: "token", auhtorizationPrefix: "bearer " });

// This configuration will override the default values and the authorization object for guarded apis will be as follows
/*
    {
        header: {
            "token": "bearer + <authToken>" // This auth token is passed to the api call method and will be explained in calling the api section
        }
    }
*/
~~~

#### Creating an end point and calling an api

Endpoints will be an instance of the `Endpoint` Class. The constructor takes three arguments
- `path: string` the endpoint address
- `type: requestType` One of the following
~~~PLAIN
"GET" | "get" | "POST" | "post" | "PUT" | "put" | "DELETE" | "delete" | "PATCH" | "patch"
~~~
- `isGuarded: boolean` if set true, an authorization token will be passed to the headers object as explained in the above section. If set to false, no token will be passed and the headers object will not contain any authorization header

~~~js
import { Endpoint } from "@phaedra/js-api";

const endpoints = {
    getHello: new Endpoint("/hello", "GET", false),
    login: new Endpoint("/auth/login", "POST", false),
    greetServer: new Endpoint("/greet", "POST", true)
}
~~~

Each instance can be invoked by call method. The call method can be invoked in two ways
~~~
call(data?: object, authToken?: string): Promise<AxiosResponse>;
~~~
Or
~~~
call(data?: object, options?: IOptions, authToken?: string): Promise<AxiosResponse>;
~~~
The second argument will be treated as auth token if not passed as object. If you pass second argument as object, the third argument will be treated as auth token

#### Get request
The get request can be simply sent by calling the `call` method
~~~js
import { Endpoint } from "@phaedra/js-api";

const endpoints = {
    getHello: new Endpoint("/hello", "GET", false)
}

apis.endpoints.getHello.call() // Call method will invoke the api and return an axios promise
    .then(console.log) // Log the output to the console in case the promise is resolved
    .catch(console.warn) // Warn the error to the console in case the promise is rejected
~~~
- ##### Passing data to get request
    Some times, get request requires some data as params or query params. To pass data to get request, let's see an example of both scenarios
    <br />

    ```js
    /*
    Scenario

    A magazine publishing company server is upgraded. Every magazine has multiple articles. The server in their v1 documentation accepts requests as follows

    https://some-magazine-server.com/api/v1/magazine/:id/articles/:articleId

    After upgrade to v2, the server now accepts the requests as follows

    https://some-magazine-server.com/api/v2/magazine/articles?id=<magazineId>&articleId=<articleId>

    */
    ```
    The code for both scenarios is as follows
    <br/>

    ~~~js
    import { Endpoint, BaseApis } from "@phaedra/js-api";

    BaseApis.init("https://some-magazine-server.com/api", process.env.REACT_APP_ENV === 'development');

    const endpoints = {
        getMagazineArticlesV1: new Endpoint('/v1/magazine/:id/articles/:articleId', "GET", true), // Input the id and articleId as request params
        getMagazineArticlesV2: new Endpoint('/v2/magazine/articles', "GET", true) // Input the id and articleId as query params
    }

    const apis = {
        getMagazineArticlesV1: ({ id, articleId }, token) => endpoints.getMagazineArticlesV1.call({ id, articleId }, token),
        getMagazineArticlesV2: ({ id, articleId }, token) => endpoints.getMagazineArticlesV2.call({ id, articleId }, { type: "query-params" }, token)
    }

    apis.getMagazineArticlesV1({ id: "some-magazine-id", articleId: "some-article-id" }, 'some-auth-token'); // GET API INVOKED /v1/magazine/some-magazine-id/articles/some-article-id
    apis.getMagazineArticlesV2({ id: "some-magazine-id", articleId: "some-article-id" }, 'some-auth-token'); // GET API INVOKED /v2/magazine/articles?id=some-magazine-id&articleId=some-article-id
    ~~~

    It is visible that if we want the data to be sent as query params, we need to add the `type: "query-params"` in the options object of the request. By default, the library is going to find the key values with the same name in the url path and replace it with actual values

#### Post request
Post requests are fairly simple. They usually contain data in the body. A simple invokation of post request is given as follows

~~~js
import { Endpoint, BaseApis } from "@phaedra/js-api";

BaseApis.init("https://some-social-media-server.com/api", process.env.REACT_APP_ENV === 'development');

const endpoints = {
    loginUser: new Endpoint('/auth/login', "POST", false),
    postComment: new Endpoint('/comments/post-comment', "POST", true)
}

const apis = {
    loginUser: ({ email, password }) => endpoints.loginUser.call({ email, password }),
    postComment: ({ postId, comment }, token) => endpoints.postComment.call({ postId, comment }, token)
}

apis.loginUser({ email: "user@demo.com", password: "password" }); // POST API INVOKED /auth/login DATA { email: 'user@demo.com', password: 'password' }
apis.postComment({ postId: "7t3feg349", comment: "Javascript rocks" }, "some-auth-token"); // POST API INVOKED /comments/post-comment DATA { postId: '7t3feg349', comment: 'Javascript rocks' }
~~~

#### Put request
Put request syntax is exactly the same as [POST request](#post-request) except for a small factor that sometimes put requests contain data as request params as well. The following example shows how the data can be sent through put api in params or query params

~~~js
import { Endpoint, BaseApis } from "./apis";

BaseApis.init("https://www.some-supepr-store.com/api", process.env.REACT_APP_ENV === 'development');

const endpoints = {
    updateProduct: new Endpoint("/products/:productId", "PUT", true)
}

const apis = {
    updateProduct: ({ productId, name, price }, token) => endpoints.updateProduct.call({ productId, name, price }, token)
}

apis.updateProduct({ productId: "78t349gfe", name: "new product name", price: 63 }, "some-auth-token"); // PUT API INVOKED /products/78t349gfe DATA { name: 'new product name', price: 63 }
~~~

Additional parameters can be sent as part of the data object. Once they are appended in request, they are removed from the data object.

#### Patch request
Patch request is exactly the same as put request

#### Delete request
Delete request is essentially the same as get request. It is not recommended to send body with delete request but it can be done. If there is some data that is sent in the body and it is not appended in the path, it will be sent as body.

~~~js
import { Endpoint, BaseApis } from "./apis";

BaseApis.init("https://www.some-supepr-store.com/api", process.env.REACT_APP_ENV === 'development');

const endpoints = {
    deleteProduct: new Endpoint("/products/:productId", "DELETE", true)
}

const apis = {
    deleteProduct: ({ productId, softDelete }, token) => endpoints.deleteProduct.call({ productId, softDelete }, token)
}

apis.deleteProduct({ productId: "78t349gfe", softDelete: true }, "some-auth-token"); // DELETE API INVOKED /products/78t349gfe DATA { softDelete: true }
~~~