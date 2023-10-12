const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Medidor",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fechaCreacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      descripcion: {
        type: DataTypes.TEXT,
      },
      tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "medidor",
      },
      clienteId: {
        type: DataTypes.INTEGER, // Agregar el campo clienteId como clave foránea
      },
    },
    {
      timestamps: false,
    }
  );
};
