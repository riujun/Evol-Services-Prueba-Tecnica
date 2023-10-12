const { Cliente, Medidor } = require("../db.js");

const createUser = async (req, res) => {
  try {
    const { RUT, nombre, direccion } = req.body;
    const cliente = await Cliente.create({ RUT, nombre, direccion });
    return res.status(201).json(cliente);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear el cliente" });
  }
};

const getUsers = async (req, res) => {
  try {
    const clientes = await Cliente.findAll({
      include: {
        model: Medidor,
        as: "Medidores",
        where: { tipo: "medidor" }, // Filtro para medidores de tipo 'medidor'
        limit: 3, // Límite de 3 medidores por cliente
      },
    });
    return res.json(clientes);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener los clientes" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findByPk(id, {
      include: {
        model: Medidor,
        as: "Medidores",
        where: { tipo: "medidor" }, // Filtro para medidores de tipo 'medidor'
        limit: 3, // Límite de 3 medidores por cliente
      },
    });
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    return res.json(cliente);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al obtener el cliente por id" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    const { RUT, nombre, direccion } = req.body;

    await cliente.update({ RUT, nombre, direccion });
    return res.json(cliente);
  } catch (error) {
    return res.status(500).json({ error: "Error al actualizar el cliente" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    await cliente.destroy();
    res.json({ message: "Cliente eliminado con éxito" });
  } catch (error) {
    return res.status(500).json({ error: "Error al actualizar el cliente" });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
