# Carbon HTTP
![workflow](https://github.com/syniol/node-carbon-http/actions/workflows/makefile.yml/badge.svg)    ![workflow](https://github.com/syniol/node-carbon-http/actions/workflows/npm_publish.yml/badge.svg)

Carbon HTTP is a user-friendly HTTP(s) library designed specifically for Node.js, developed in TypeScript 
and subsequently converted to JavaScript. Carbon HTTP serves as an excellent alternative to libraries such 
as node-fetch, request-promise, and similar options.


## Motivation
A limited number of libraries are offered for this purpose, with the majority created 
for both the Browser API and Node runtime. The existence of libraries that attempt to 
serve the requirements of both the Browser and Node APIs can result in significant 
challenges for enterprise-level applications. For instance, mandatory updates triggered 
by security flaws in different dependencies of the library can pose problems. In 
comparison, __Carbon HTTP__ is independent of third-party dependencies and has been 
developed and maintained in the UK by a Limited Company.


## Quickstart Guide
First you need to install the Carbon HTTP Library for node.js ecosystem via npm or yarn package management.

__NPM__:
```shell
npm i carbon-http
```

__YARN__:
```shell
yarn add carbon-http
```


## How to use
Simple Answer is it's very easy to use. You can find a few examples below 
for most commonly used Methods: `GET`, `POST`, and `DELETE` below.


### Module Import
_ES5_
```js
const { Request } = require('carbon-http')
```

_ES6+ & TypeScript_
```js
import { Request } from 'carbon-http'
```


### Request Example _<sup>(GET)</sup>_

```js
import { Request } from 'carbon-http';

const resp = await Request('https://api.syniol.com/v2/user/hadi/history');

console.log(resp.json())

// prints
{
  username: 'hadi'
  joinDate: '2020-02-19'
  lastLoginDate: '2021-09-21'
}
```


### Request Example _<sup>(POST)</sup>_

```js
import { Request, HttpMethod } from 'carbon-http';

const resp = await Request(
  'https://api.syniol.com/v2/user',
  {
    method: HttpMethod.POST,
    body: JSON.stringify({
      username: 'myusername',
      email: 'myemail@email.com',
      password: 'myPassword',
    }),
  }
);

console.log(resp.json())

// prints
{
  status: 'success'
}
```


### Request Example _<sup>(DELETE)</sup>_
```js
import { Request, HttpMethod } from 'carbon-http';

const resp = await Request(
  'https://api.syniol.com/v2/user/hadi/history/73',
  {
    method: HttpMethod.DELETE,
  }
);
```


### Response
Response from Promise Request, has the following APIs available:

```js
status            // example 200
headers           // example { "accept-ranges": "bytes", "... }
incomingMessage:  // example { "httpVersion": "1.1", "...} 

text()            // example '<html><header>....</html>'
json()            // example { status: "Success" }
```

> In TypeScript since the version `2.1.x`, you can define the response type as a generic on `json() method`.

```typescript
interface UserResponse {}

// json<T>(): T
const respBody = json<UserResponse>();
```


### Credits
Copyright &copy; 2022-2025 Syniol Limited. All rights reserved.
