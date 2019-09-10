import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verifuca se possui o token gerado pelo jwt
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  // Tenta decodificar o token e logar na conta
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    console.log(decoded);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    // Caso dê erro, retorna um erro de token invalido
    return res.status(401).json({ error: 'Invalid Token ' });
  }
};
