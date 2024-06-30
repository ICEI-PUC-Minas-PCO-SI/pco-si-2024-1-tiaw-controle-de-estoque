const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('codigo/assets/javascript/Json/login.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.use(jsonServer.static('codigo/html'));
server.listen(process.env.PORT || 3000, () => {
  console.log('JSON Server is running on port', process.env.PORT || 3000);
});
