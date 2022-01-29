# Node Carbon HTTP
Carbon HTTP is simplified http(s) library exclusively for Node.js; 
written in TypeScript and transpiled to JavaScript. It would be a 
great replacement for libraries such as: node-fetch, axios, end etc.


## Motivation
There are few libraries for a same purpose but most are implemented 
for both Browser API and Node runtime. Given exising libraries try to 
meet the needs both for Browser API and Node; cause many complications 
for enterprise level applications. For example:  writing unit test could 
be extremely frustrating and might require a third-party test library due 
to poor engineering of original library itself.


### How to use
Answer is very easy to use. You can find few examples below for most commonly 
used Methods: `GET` and `POST`.


#### GET Request Example

```javascript
  const client = new CarbonHTTP();
const resp = await client.request('https://api.syniol.com/v2/user/hadi/history');

console.log(resp.json())

// prints
{
  username: 'hadi'
  joinDate: '2020-02-19'
  lastLoginDate: '2021-09-21'
}
```

#### POST Request Example

```javascript
  const client = new CarbonHTTP();
const resp = await client.request(
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


#### Unit Tests and Mocking Example
You could also test your endpoints with Mock API given in this library
and accessible by `CarbonHTTPMock` for your unit tests.

```javascript
  const carbonHTTPMock = new CarbonHTTPMock(JSON.stringify(
    { 
      status: 'success' 
    }
  ), 200);

const client = new CarbonHTTP(carbonHTTPMock.client);

const resp = await client.request('https://api.syniol.com/v2/user');

console.log(resp.json())

// prints
{
  status: 'success'
}
```


##### Credits
Copyright &copy; 2022 Syniol Limited. All rights reserved.
