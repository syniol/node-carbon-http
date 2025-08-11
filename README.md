# Carbon HTTP
![workflow](https://github.com/syniol/node-carbon-http/actions/workflows/makefile.yml/badge.svg)

Carbon HTTP is simplified http(s) library exclusively for Node.js; 
written in TypeScript and transpiled to JavaScript. It would be a 
great replacement for libraries such as: node-fetch, request-promise, 
end etc.


## Motivation
There are few libraries for a same purpose but most are implemented 
for both Browser API and Node runtime. Given exising libraries try to 
meet the needs both Browser and Node API; it could cause many complications 
for enterprise level applications. For example: forced upgrade due to 
security vulnerability of many dependency of library itself. On the 
other hand, __Carbon HTTP__ has no third-party dependency and been 
developed and maintained in Great Britain by a Limited Company.

Furthermore, writing unit test could be extremely frustrating and might 
require a third-party test library due to poor engineering of original 
library itself.


## Quick Start
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
for most commonly used Methods: `GET`, `POST` in JavaScript and `DELETE` 
in TypeScript below.


### Module Import
_ES5_
```js
const { Request } = require('carbon-http')
```

_ES6+ & TypeScript_
```js
import { Request } from 'carbon-http'
```

### GET Request Example

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

### POST Request Example

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


### TypeScript DELETE Example _<sup>(With HttpStatusCode Type)</sup>_
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
status    // example 200
headers   // example { "accept-ranges": "bytes", "... }
text()    // example '<html><header>....</html>'
json()    // example { status: "Success" }
```


### Unit Tests and Mocking Example
You could also test your endpoints with Mock API given in this library
and accessible by `CarbonClientMock` for your unit tests.

__JavaScript Mocking Library Example__
```js
import { Request, CarbonClientMock, HttpStatusCode } from 'carbon-http'

const resp = await Request(
  'https://api.syniol.com/v2/user',
  undefined,
  CarbonClientMock(JSON.stringify(
    {
      status: 'success'
    }
  ), HttpStatusCode.OK),
);

console.log(resp.json())

// prints
{
  status: 'success'
}
```

__TypeScript Mocking Library Example__
```js
import {
  Request,
  HttpStatusCode,
  CarbonClientMock
} from 'carbon-http'

const resp = await Request(
  'https://api.syniol.com/v2/user',
  undefined,
  CarbonClientMock(JSON.stringify(
    {
      status: 'success'
    }
  ),
    HttpStatusCode.OK
  ),
);

console.log(resp.json())

// prints
{
  status: 'success'
}
```


### Credits
Copyright &copy; 2022-25 Syniol Limited. All rights reserved.
