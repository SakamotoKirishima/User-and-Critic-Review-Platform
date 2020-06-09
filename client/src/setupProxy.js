const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    app.use(createProxyMiddleware('/auth/google',{target:"http://localhost:5000"}));
    app.use(createProxyMiddleware('/api',{target:"http://localhost:5000"}));
    app.use(createProxyMiddleware('/userimages',{target:"http://localhost:5000"}));
    //app.use(createProxyMiddleware(`/api/update/:id/:newDispName`,{target:"http://localhost:5000"}));
};