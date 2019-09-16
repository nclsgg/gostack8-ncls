import 'dotenv/config';

import express from 'express';
import path from 'path';

// Tratativa das mensagens de error para mais informações
import Youch from 'youch';

// Serviço para monitorar errors na aplicação
import * as Sentry from '@sentry/node';

// Faz com que os errors nos asyncs sejam reportados
import 'express-async-errors';

import routes from './routes';

import sentryConfig from './config/sentry';

import './database';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);
    this.middlewares();
    this.routes();
  }

  // Faz o middleware usar json
  middlewares() {
    // Faz com que todos os middlewares utilizem o Sentry
    this.server.use(Sentry.Handlers.requestHandler());
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

    // Reporta errors depois de executar as rotas
    this.server.use(Sentry.Handlers.errorHandler());
  }

  // Dá detalhes sobre o error no backend (insomina)
  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_DEV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
