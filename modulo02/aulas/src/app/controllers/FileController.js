// Responsável pelo upload e organização de arquivos

import File from '../models/File';

//
class FileController {
  async store(req, res) {
    // Pega informações do Multer config para utilizar com informações da migration da database
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }
}

export default new FileController();
