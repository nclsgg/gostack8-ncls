// Processa a fila separadamente, para melhor performance da aplicação
import 'dotenv/config';

import Queue from './lib/Queue';

Queue.processQueue();
