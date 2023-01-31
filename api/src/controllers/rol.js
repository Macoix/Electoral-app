import RolServices from '../services/rol';

export default {
  get: async (req, res) => {
    try {
      const roles = await RolServices.getAll();

      res.status(200).json(roles);
    } catch (error) {
      res.status(401).json({ error: error });
    }
  },
  create: async (req, res) => {
    try {
      const rol = await RolServices.create(req);

      res.status(201).json({ rol, message: 'Rol creado exitosamente' });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  update: async (req, res) => {
    try {
      const rol = await RolServices.update(req);

      res.status(201).json({ rol, message: 'Rol actualizado exitosamente' });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  pagination: async (req, res) => {
    try {
      const roles = await RolServices.paginate(req);

      res.status(200).json({ roles });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  findById: async (req, res) => {
    try {
      const rol = await RolServices.getById(req, res);

      res.status(200).json({ rol });
    } catch (error) {
      res.status(200).json({ error });
    }
  }
};
