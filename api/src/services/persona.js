import models from '../models';
import getPagination from '../utils/getPagination'
import { Op, Sequelize } from 'sequelize';

const {
  Persona,
  PerfilProfesional,
  Estudios,
  Profesion,
  Votacion,
  User,
  Pais,
  Departamento,
  Municipio,
  Comuna,
  Barrio,
  Ambito
} = models;

export default {
  CreatePerson: async (persona) => {
    const newPerson = await Persona.create(persona);

    return newPerson;
  },
  update: async (id, personaObj) => {
    const persona = await Persona.update(personaObj, {
      where: { id }
    });

    return persona;
  },
  delete: async (id, res) => {
    const paisUpdated = await Persona.findOne({ where: { id } }).then((pais) => {
      return pais.update({ deletedAt: Sequelize.fn('NOW') });
    });
  },
  getAll: async () => {
    const personas = await Persona.findAll({
      include: { all: true, nested: true }
    });

    return personas;
  },
  getById: async (req, res) => {
    const { id } = req.params;

    const persona = await Persona.findOne({
      where: { id },
      include: { all: true, nested: true }
    });

    return persona;
  },
  getPagination: async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    const personas = await Persona.findAndCountAll({
      limit,
      offset,
      include: { all: true, nested: true },
      order: [['id', 'ASC']]
    });
    return personas;
  },
  getByDocument: async (document) => {
    const persona = await Persona.findOne({
      where: {
        documento: document
      },
      include: {
        all: true,
        nested: true
      }
    });

    return persona;
  },
  getByEmail: async (email) => {
    const persona = await Persona.findOne({
      where: {
        email: email
      }
    });

    return persona;
  },
  bulkCreate: async (personasArray) => {
    const personas = await Persona.bulkCreate(personasArray);
    return personas;
  },
  searchByCriterios: async (params) => {
    const {
      idPais,
      idDepartamento,
      idMunicipio,
      idComuna,
      idBarrio,
      idGenero,
      profesion_id,
      estudios_id,
      puesto,
      mesa,
      rol
    } = params;

    let where = {};
    let include = [];
    if (idPais) {
      where['idPais'] = idPais;
    }
    if (idDepartamento) {
      where['idDepartamento'] = idDepartamento;
    }
    if (idMunicipio) {
      where['idMunicipio'] = idMunicipio;
    }
    if (idComuna) {
      where['idComuna'] = idComuna;
    }
    if (idBarrio) {
      where['idBarrio'] = idBarrio;
    }
    if (idGenero) {
      where['idGenero'] = idGenero;
    }
    if (profesion_id) {
      include.push({
        model: PerfilProfesional,
        as: 'perfil_profesional',
        where: {
          profesion_id
        },
        include: [
          {
            model: Estudios,
            as: 'estudios'
          },
          {
            model: Profesion,
            as: 'profesion'
          }
        ]
      });
    }
    if (estudios_id) {
      include.push({
        model: PerfilProfesional,
        as: 'perfil_profesional',
        where: {
          estudios_id
        },
        include: [
          {
            model: Estudios,
            as: 'estudios'
          },
          {
            model: Profesion,
            as: 'profesion'
          }
        ]
      });
    }
    if (puesto) {
      include.push({
        model: Votacion,
        as: 'puesto_votacion',
        where: {
          puesto: Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('puesto')), {
            [Op.iLike]: `%${puesto}%`
          })
        }
      });
    }
    if (mesa) {
      include.push({
        model: Votacion,
        as: 'puesto_votacion',
        where: {
          mesa: Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('mesa')), {
            [Op.iLike]: `%${mesa}%`
          })
        }
      });
    }
    if (rol) {
      include.push({
        model: User,
        as: 'usuario',
        where: {
          name: Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('name')), {
            [Op.iLike]: Sequelize.fn('unaccent', `%${rol}%`)
          })
        }
      });
    }
    const personas = await Persona.findAll({
      where,
      include
    });
    console.log(personas);
    return personas;
  },
  totalPersonas: async () => {
    const totalPersonas = await Persona.findAndCountAll();
    return totalPersonas.count;
  },
  totalVotantesPais: async (idPais) => {
    const totalVotantesPais = await Persona.findAndCountAll({
      where: {
        idPais
      }
    });
    return totalVotantesPais.count;
  },
  totalVotantesDepartamento: async (idDepartamento) => {
    const totalVotantesDepartamento = await Persona.findAndCountAll({
      where: {
        idDepartamento
      }
    });
    return totalVotantesDepartamento.count;
  },
  totalVotantesMunicipio: async (idMunicipio) => {
    const totalVotantesMunicipio = await Persona.findAndCountAll({
      where: {
        idMunicipio
      }
    });
    return totalVotantesMunicipio.count;
  },
  totalVotantesComuna: async (idComuna) => {
    const totalVotantesComuna = await Persona.findAndCountAll({
      where: {
        idComuna
      }
    });
    return totalVotantesComuna.count;
  },
  totalVotantesBarrio: async (idBarrio) => {
    const totalVotantesBarrio = await Persona.findAndCountAll({
      where: {
        idBarrio
      }
    });
    return totalVotantesBarrio.count;
  },
  totalVotantesGenero: async (idGenero) => {
    const totalVotantesGenero = await Persona.findAndCountAll({
      where: {
        idGenero
      }
    });
    return totalVotantesGenero.count;
  },
  totalVotantesPuesto: async (puesto) => {
    const totalVotantesPuesto = await Persona.findAndCountAll({
      include: [
        {
          model: Votacion,
          as: 'puesto_votacion',
          where: {
            puesto: Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('puesto')), {
              [Op.iLike]: `%${puesto}%`
            })
          }
        }
      ]
    });
    return totalVotantesPuesto.count;
  },
  totalVotantesMesa: async (mesa) => {
    const totalVotantesMesa = await Persona.findAndCountAll({
      include: [
        {
          model: Votacion,
          as: 'puesto_votacion',
          where: {
            mesa: Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('mesa')), {
              [Op.iLike]: `%${mesa}%`
            })
          }
        }
      ]
    });
    return totalVotantesMesa.count;
  },
  totalVotantesRol: async (idRol) => {
    const totalVotantesMesa = await Persona.findAndCountAll({
      include: [
        {
          model: User,
          as: 'usuario',
          where: {
            idRol
          }
        }
      ]
    });
    return totalVotantesMesa.count;
  }
};
