import VotacionServices from '../services/votacion';

export default {
  get: async (req, res) => {
    try {
      const puestos = await VotacionServices.get();

      res.status(200).json(puestos);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  create: async (req, res) => {
    try {
      const votacion = req.body;
      const total = parseInt(votacion.Femenino) + parseInt(votacion.Masculino);
      votacion['Total'] = total;
      const puesto = await VotacionServices.create(votacion);

      res.status(201).json({ puesto, message: 'Puesto de votacion creado exitosamente' });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const votacion = req.body;
      const total = parseInt(votacion.Femenino) + parseInt(votacion.Masculino);
      votacion['Total'] = total;
      const puesto = await VotacionServices.update(id, votacion);

      res
        .status(201)
        .json({ puesto, message: 'Puesto de votacion actualizado exitosamente' });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  pagination: async (req, res) => {
    try {
      const Puestos = await VotacionServices.paginate(req);

      res.status(200).json({ Puestos });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  findById: async (req, res) => {
    try {
      const puesto = await VotacionServices.getById(req, res);

      res.status(200).json(puesto);
    } catch (error) {
      res.status(200).json({ error });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const persona = await VotacionServices.delete(id, res);

      res.status(200).json({ message: 'Puesto de votacion borrado satisfactoriamente' });
    } catch (error) {
      res.status(500).json({ message: 'Hubo un error' });
    }
  },
  puestos: async (req, res) => {
    try {
      const puestosArray = [];
      const puestoObject = {};
      const puestos = [];
      const puestosFetch = await VotacionServices.get();
      puestosFetch.map((puesto) => {
        puestosArray.push(puesto.puesto);
      });
      const puestos2 = [...new Set(puestosArray)];

      puestos2.map((puesto, index) => {
        let puesto1 = { name: `${puesto}` };
        puestos.push(puesto1);
      });
      res.status(200).json(puestos);
    } catch (error) {
      console.log(error);
    }
  },
  mesas: async (req, res) => {
    try {
      const mesasArray = [];
      const mesas = [];
      const mesasFetch = await VotacionServices.get();
      mesasFetch.map((mesa) => {
        mesasArray.push(mesa.mesa);
      });
      const mesas2 = [...new Set(mesasArray)];

      mesas2.map((mesa, index) => {
        let puesto1 = { name: `${mesa}` };
        mesas.push(puesto1);
      });
      res.status(200).json(mesas);
    } catch (error) {
      console.log(error);
    }
  }
};
