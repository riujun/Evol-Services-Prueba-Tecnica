const { Medidor } = require("../db.js");
// const Medidor = require("../models/Medidor.js");

const createMedidor = async (req, res) => {
  try {
    const { codigo, nombre, descripcion, clienteId } = req.body;
    const medidor = await Medidor.create({
      codigo,
      nombre,
      descripcion,
      clienteId,
    });

    return res.status(201).json(medidor);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear el medidor" });
  }
};

const getMedidores = async (req, res) => {
  try {
    const medidores = await Medidor.findAll();
    return res.json(medidores);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener los medidores" });
  }
};

const getMedidorById = async (req, res) => {
  const { id } = req.params;
  try {
    const medidor = await Medidor.findByPk(id);

    if (!medidor) {
      return res.status(404).json({ error: "Medidor no encontrado" });
    }

    return res.json(medidor);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al obtener el medidor por id" });
  }
};

const updateMedidor = async (req, res) => {
  const { id } = req.params;
  const { codigo, nombre, descripcion, clienteId } = req.body;

  try {
    const medidor = await Medidor.findByPk(id);

    if (!medidor) {
      return res.status(404).json({ error: "Medidor no encontrado" });
    }

    await Medidor.update(
      { codigo, nombre, descripcion, clienteId },
      { where: { id } }
    );

    res.json({ message: "Medidor actualizado con éxito" });
  } catch (error) {
    return res.status(500).json({ error: "Error al actualizar el medidor" });
  }
};

const deleteMedidor = async (req, res) => {
  const { id } = req.params;
  try {
    const medidor = await Medidor.findByPk(id);
    if (!medidor) {
      return res.status(404).json({ error: "Medidor no encontrado" });
    }

    await medidor.destroy();

    res.json({ message: "Medidor eliminado con éxito" });
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar el medidor" });
  }
};

module.exports = {
  createMedidor,
  getMedidores,
  getMedidorById,
  updateMedidor,
  deleteMedidor,
};
