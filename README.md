# Carbon HTTP
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


## How to use
Answer is very easy to use. You can find a few examples below for 
most commonly used Methods: `GET` and `POST`.


### Module Import
_ES5_

    const { Request } = require('carbon-http');

_ES6+ & TypeScript_

    import { Request } from 'carbon-http'


### GET Request Example

```
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

```
const resp = await Request(
  'https://api.syniol.com/v2/user',
  {
    method: 'POST',
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


### Unit Tests and Mocking Example
You could also test your endpoints with Mock API given in this library
and accessible by `CarbonClientMock` for your unit tests.

```
const resp = await Request(
  'https://api.syniol.com/v2/user',
  undefined,
  CarbonClientMock(JSON.stringify(
    {
      status: 'success'
    }
  ), 200),
);

console.log(resp.json())

// prints
{
  status: 'success'
}
```


### Credits
Copyright &copy; 2022 Syniol Limited. All rights reserved.
