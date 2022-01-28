# Node Carbon HTTP
Hydro is simplified http(s) library exclusively for Node.js; written in TypeScript and
transpiled to JavaScript.


## Motivation
There are few libraries for a same purpose but most are implemented for both Browser API 
and Node runtime. There are many complication using these libraries; for example:  writing 
unit test could be extremely difficult and might require a third-party mock library due to 
poor engineering.


### How to use
Answer is very easy to use.


#### GET Request Example
```javascript
  const client = new HydroHTTP();
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
  const client = new HydroHTTP();
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
```javascript
  const hydroHTTPMock = new HydroHTTPMock(JSON.stringify({
    status: 'success'
  }), 200);

  const client = new HydroHTTP(hydroHTTPMock.client);

  const resp = await client.request('https://api.syniol.com/v2/user');
  
  console.log(resp.json())

  // prints
  {
    status: 'success'
  }
```


##### Credits
Copyright &copy; 2022 Syniol Limited. All rights reserved.
