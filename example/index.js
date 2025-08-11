const { Request } = require('carbon-http');

(async () => {
  const resp = await Request("https://yahoo.com")
  console.log(resp.status)
})()
