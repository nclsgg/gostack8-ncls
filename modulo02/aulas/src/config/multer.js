//Multer é uma biblioteca que trabalha com arquivos fisicos
import multer from 'multer';

//Responsável por gerar caracteres aleatórios
import crypto from 'crypto';

//Extname retorna baseado num nome de um arquivo, a sua extenção. Resolve percorre um caminho dentro da aplicação
import { extname, resolve } from 'path';

//Objeto onde serão guardadas as imagens
export default {
  //diskStorage armazena dentro da própria pasta da aplicação
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),

    //controla o nome da imagem, criando um arquivo único
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        //Altera o nome do arquivo caso não de nenhum erro
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
