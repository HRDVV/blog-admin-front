
const proxy = require("http-proxy-middleware");
 
module.exports = function(app) {
  app.use(
    proxy(['/user/*', '/blog/*', '/check/*'], {
      target: "http://114.67.66.81:8081",
      changeOrigin: true
    })
  )
}