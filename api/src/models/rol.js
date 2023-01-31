import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Rol extends Model {
    static associate(models) {}
  }
  Rol.init(
    {
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Rol',
      tableName: 'Roles'
    }
  );

  Rol.associate = (models) => {
    Rol.hasMany(models.User, {
      foreignKey: 'id',
      as: 'users'
    });
  };
  return Rol;
};
