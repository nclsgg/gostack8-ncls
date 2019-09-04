import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

//Cria uma rota do tipo post para a criação de usuários
routes.post('/users', UserController.store);

//Cria uma rota do tipo post para o login de usuários
routes.post('/sessions', SessionController.store);

//Todas as rotas abaixo terão esse middleware que verifica os dados colocados
routes.use(authMiddleware);

//Cria uma rota do tipo put para a alteração de dados do usuário
routes.put('/users', UserController.update);

//Cria uma rota do tipo get para a listagem de provedores de serviços
routes.get('/providers', ProviderController.index);

//Cria uma rota do tipo post para o upload de arquivos
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
