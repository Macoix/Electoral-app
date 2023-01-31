import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }

  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      idRol: DataTypes.INTEGER,
      isActive: DataTypes.BOOLEAN,
      idPersona: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      timestamps: true
    }
  );
  User.associate = (models) => {
    User.belongsTo(models.Rol, {
      foreignKey: 'idRol',
      as: 'rol'
    });
    User.belongsTo(models.Persona, {
      foreignKey: 'idPersona',
      as: 'persona'
    });
  };
  return User;
};
