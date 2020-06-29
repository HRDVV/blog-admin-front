
const proxy = require("http-proxy-middleware");
 
module.exports = function(app) {
  app.use(
    proxy(['/user/*', '/blog/*', '/check/*'], {
      target: "http://152.136.114.144/blog",
      changeOrigin: true
    })
  )
}