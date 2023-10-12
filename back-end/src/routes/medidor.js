const { Router } = require("express");

const {
  createMedidor,
  getMedidores,
  getMedidorById,
  updateMedidor,
  deleteMedidor,
} = require("../controllers/Medidores.controllers");

const router = Router();

router.get("/getMedidores", getMedidores);

router.get("/getMedidor/:id", getMedidorById);

router.post("/createMedidor", createMedidor);

router.put("/updateMedidor/:id", updateMedidor);
router.delete("/deleteMedidor/:id", deleteMedidor);

/**
 * @swagger
 * /medidor/getMedidores:
 *   get:
 *     summary: Obtener todos los medidores.
 *     description: Obtiene una lista de todos los medidores.
 *     responses:
 *       200:
 *         description: Lista de medidores obtenida con éxito.
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 {
 *                     "id": 2,
 *                     "codigo": "MED001",
 *                     "nombre": "Medidor 1",
 *                     "fechaCreacion": "2023-10-12T22:07:52.828Z",
 *                     "descripcion": "Descripción del medidor",
 *                     "tipo": "medidor",
 *                     "clienteId": 1
 *                 },
 *                 {
 *                     "id": 3,
 *                     "codigo": "MED002",
 *                     "nombre": "Medidor 2",
 *                     "fechaCreacion": "2023-10-12T22:08:18.660Z",
 *                     "descripcion": "Descripción del medidor 2",
 *                     "tipo": "medidor",
 *                     "clienteId": 1
 *                 }
 *               ]
 *       500:
 *         description: Error del servidor.
 */

/**
 * @swagger
 * /medidor/getMedidor/{id}:
 *   get:
 *     summary: Obtener un medidor por ID.
 *     description: Obtiene un medidor por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del medidor.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Medidor obtenido con éxito.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               codigo: "MED002"
 *               nombre: "Medidor 2"
 *               fechaCreacion: "2023-10-12T22:16:46.109Z"
 *               descripcion: "Descripción del medidor 2"
 *               tipo: "medidor"
 *               clienteId: 1
 *       '404':
 *         description: Medidor no encontrado.
 *       '500':
 *         description: Error del servidor.
 */

/**
 * @swagger
 * /medidor/createMedidor:
 *   post:
 *     summary: Crear un nuevo medidor.
 *     description: Crea un nuevo medidor.
 *     parameters:
 *       - in: body
 *         name: medidor
 *         required: true
 *         description: Datos del medidor a crear.
 *         schema:
 *           type: object
 *           properties:
 *             codigo:
 *               type: string
 *             nombre:
 *               type: string
 *             descripcion:
 *               type: string
 *             clienteId:
 *               type: integer
 *     responses:
 *       201:
 *         description: Medidor creado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               fechaCreacion: "2023-10-12T22:16:46.109Z"
 *               tipo: "medidor"
 *               id: 1
 *               codigo: "MED002"
 *               nombre: "Medidor 2"
 *               descripcion: "Descripción del medidor 2"
 *               clienteId: 1
 *       500:
 *         description: Error del servidor.
 */

/**
 * @swagger
 * /medidores/updateMedidor/{id}:
 *   put:
 *     summary: Actualizar un medidor por ID.
 *     description: Actualiza un medidor existente por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *         description: ID del medidor que se está actualizando
 *       - in: body
 *         name: medidor
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             codigo:
 *               type: string
 *             nombre:
 *               type: string
 *             descripcion:
 *               type: string
 *             clienteId:
 *               type: integer
 *     responses:
 *       200:
 *         description: Medidor actualizado con éxito.
 *         content:
 *           application/json:
 *             example:
 *
 *               message: "Medidor actualizado con éxito"
 *       404:
 *         description: Medidor no encontrado.
 *       500:
 *         description: Error del servidor.
 */
/**
 * @swagger
 * /medidores/deleteMedidor/{id}:
 *   delete:
 *     summary: Eliminar un medidor por ID.
 *     description: Elimina un medidor por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Medidor eliminado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: "Medidor eliminado con éxito"
 *       404:
 *         description: Medidor no encontrado.
 *       500:
 *         description: Error del servidor.
 */
module.exports = router;
