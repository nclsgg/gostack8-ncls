import express from 'express';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  //Faz o middleware usar json
  middlewares() {
    this.server.use(express.json());
  }

  //Faz com que as rotas da aplicação seja o routes.js
  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
