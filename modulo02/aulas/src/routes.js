import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import NotificationController from './app/controllers/NotificationController';
import ScheduleController from './app/controllers/ScheduleController';
import AvailableController from './app/controllers/AvailableController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// Criação de usuários
routes.post('/users', UserController.store);

// Login de usuários
routes.post('/sessions', SessionController.store);

// Todas as rotas abaixo terão esse middleware que verifica os dados colocados
routes.use(authMiddleware);

// Alteração de dados do usuário
routes.put('/users', UserController.update);

// Listagem de provedores de serviços
routes.get('/providers', ProviderController.index);

// Cria rota para o agendamento de serviços
routes.post('/appointments', AppointmentController.store);
// Listagem de serviços de todos os providers
routes.get('/appointments', AppointmentController.index);
// Cancelamento de agendamento
routes.delete('/appointments/:id', AppointmentController.delete);

// Listagem de horários disponiveis do provider
routes.get('/appointments/:providerId/available', AvailableController.index);

// Listagem de serviços de um só provider
routes.get('/schedules', ScheduleController.index);

// Listagem de notificações do usuário
routes.get('/notifications', NotificationController.index);
// Marca a notificação como lida
routes.put('/notifications/:id', NotificationController.update);

// Upload de arquivos
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
