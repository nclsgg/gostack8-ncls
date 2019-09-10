import express from 'express';
import path from 'path';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  // Faz o middleware usar json
  middlewares() {
    this.server.use(express.json());
    // Faz com que o link das imagens seja utilizável
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  // Faz com que as rotas da aplicação seja o routes.js
  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
