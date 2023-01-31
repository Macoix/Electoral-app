import documentoServices from '../services/documentos';

export default {
  get: async (req, res) => {
    try {
      const documentos = await documentoServices.get();
      res.status(200).json(documentos);
    } catch (errror) {
      res.status(401).json({ error });
    }
  },
  create: async (req, res) => {
    try {
      const documento = await documentoServices.createDocumento(req);

      res.status(200).json({ message: 'Documento creado correctamente' });
    } catch (error) {
      res.status(401).json({ error });
    }
  },
  update: async (req, res) => {
    try {
      const documento = await documentoServices.update(req);

      res.status(200).json({ documento, message: 'Documento actualizado con exito' });
    } catch (error) {
      res.status(200).json({ error: err });
    }
  },
  getById: async (req, res) => {
    try {
      const documento = await documentoServices.getById(req);

      res.status(200).json({ documento });
    } catch (error) {
      res.status(200).json({ error });
    }
  },
  pagination: async (req, res) => {
    try {
      const documentos = await documentoServices.getPagination(req, res);

      res.status(200).json({ documentos });
    } catch (error) {
      res.status(200).json({ error });
    }
  }
};
