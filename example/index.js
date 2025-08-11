const { Request } = require("carbon-http-local");

(async () => {
  const resp = await Request("https://yahoo.com")
  console.log(resp.status)
})()
