const { Router } = require("express");

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/users.controllers.js");

const router = Router();

router.get("/getUsers", getUsers);
router.get("/getUser/:id", getUserById);

router.post("/createUser", createUser);

router.put("/updateUser/:id", updateUser);

router.delete("/deleteUser/:id", deleteUser);

/**
 * @swagger
 * /user/getUsers:
 *   get:
 *     summary: Obtener todos los usuarios.
 *     description: Obtiene una lista de todos los usuarios.
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito.
 *         content:
 *           application/json:
 *             example:
 *               - id: 2
 *                 RUT: "12345678-9"
 *                 nombre: "Nombre del Cliente"
 *                 direccion: "Dirección del Cliente"
 *                 Medidores:
 *                   - id: 1
 *                     codigo: "MED033"
 *                     nombre: "Medidor 2"
 *                     fechaCreacion: "2023-10-12T21:21:05.640Z"
 *                     descripcion: "Descripción del medidor 2"
 *                     tipo: "medidor"
 *                     clienteId: 2
 *       500:
 *         description: Error del servidor.
 */

/**
 * @swagger
 * /user/getUser/{id}:
 *   get:
 *     summary: Obtener un usuario por ID.
 *     description: Obtiene un usuario por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario.
 *         type: integer
 *     responses:
 *       200:
 *         description: Usuario obtenido con éxito.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               RUT: "12345678-9"
 *               nombre: "Nombre del Cliente"
 *               direccion: "Dirección del Cliente"
 *               Medidores:
 *                 - id: 1
 *                   codigo: "MED001"
 *                   nombre: "Medidor 1"
 *                   fechaCreacion: "2023-10-12T21:05:49.605Z"
 *                   descripcion: "Descripción del medidor"
 *                   tipo: "medidor"
 *                   clienteId: 1
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error del servidor.
 */

/**
 * @swagger
 * /user/createUser:
 *   post:
 *     summary: Crear un nuevo usuario.
 *     description: Crea un nuevo usuario.
 *     parameters:
 *       - in: body
 *         name: user
 *         required: true
 *         description: Datos del usuario a crear.
 *         schema:
 *           type: object
 *           properties:
 *             RUT:
 *               type: string
 *             nombre:
 *               type: string
 *             direccion:
 *               type: string
 *     responses:
 *       201:
 *         description: Usuario creado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               RUT: "12345678-9"
 *               nombre: "Nombre del Cliente"
 *               direccion: "Dirección del Cliente"
 *       500:
 *         description: Error del servidor.
 */

/**
 * @swagger
 * /user/updateUser/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID.
 *     description: Actualiza un usuario existente por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *       - in: body
 *         name: user
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             RUT:
 *               type: string
 *             nombre:
 *               type: string
 *             direccion:
 *               type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               RUT: "98765432-1"
 *               nombre: "Nuevo Nombre del Cliente"
 *               direccion: "Nueva Dirección del Cliente"
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error del servidor.
 */

/**
 * @swagger
 * /user/deleteUser/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID.
 *     description: Elimina un usuario por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: "Usuario eliminado con éxito"
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error del servidor.
 */

module.exports = router;
