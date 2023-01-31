import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Genero extends Model {
    static associate (models) {
      // define association here
    }
  }
  Genero.init(
    {
      name: DataTypes.STRING,
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Genero',
      tableName: 'Genero'
    }
  )
  return Genero
}
