import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

function ClientesList() {
  const [clientes, setClientes] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [clienteInfo, setClienteInfo] = useState(null);
  const [medidores, setMedidores] = useState([]);
  const [isCrearClientePopupOpen, setIsCrearClientePopupOpen] = useState(false);
  const [nuevoClienteData, setNuevoClienteData] = useState({
    nombre: "",
    RUT: "",
    direccion: "",
  });

  const [isCrearMedidorPopupOpen, setIsCrearMedidorPopupOpen] = useState(false);
  const [nuevoMedidorData, setNuevoMedidorData] = useState({
    codigo: "",
    nombre: "",
    descripcion: "",
    clienteId: null,
  });
  console.log(nuevoMedidorData);

  const loadClientes = () => {
    axios.defaults.baseURL = "http://localhost:4000";
    axios
      .get("user/getUsers")
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de clientes", error);
      });
  };

  useEffect(() => {
    loadClientes();
  }, []);

  const handleClienteChange = (clienteId) => {
    setSelectedCliente(clienteId);

    // Lógica para cargar la información del cliente y los medidores según el cliente seleccionado
    axios
      .get(`user/getUser/${clienteId}`)
      .then((response) => {
        setClienteInfo(response.data);
        setMedidores(response.data.Medidores);
      })
      .catch((error) => {
        console.error("Error al obtener la información del cliente", error);
      });
  };
  useEffect(() => {
    // Convierte el valor de clienteId a número
    setNuevoMedidorData({ ...nuevoMedidorData, clienteId: +selectedCliente });
  }, [selectedCliente]);

  const reiniciarCliente = () => {
    setSelectedCliente(null);
    setClienteInfo(null);
    setMedidores([]);
  };

  const handleOpenCrearClientePopup = () => {
    setIsCrearClientePopupOpen(true);
  };

  const handleCloseCrearClientePopup = () => {
    setIsCrearClientePopupOpen(false);
    setNuevoClienteData({
      nombre: "",
      RUT: "",
      direccion: "",
    });
  };

  const handleNuevoClienteDataChange = (e) => {
    const { name, value } = e.target;
    setNuevoClienteData({
      ...nuevoClienteData,
      [name]: value,
    });
  };

  const handleCrearNuevoCliente = () => {
    axios
      .post("user/createUser", nuevoClienteData) // Ajusta la ruta y el objeto de datos según tu API
      .then((response) => {
        // setClientes([...clientes, response.data]);
        loadClientes();

        handleCloseCrearClientePopup();
      })
      .catch((error) => {
        console.error("Error al crear el cliente", error);
      });
  };

  const handleOpenCrearMedidorPopup = () => {
    setIsCrearMedidorPopupOpen(true);
  };

  const handleCloseCrearMedidorPopup = () => {
    setIsCrearMedidorPopupOpen(false);
    setNuevoMedidorData({
      codigo: "",
      nombre: "",
      descripcion: "",
      clienteId: selectedCliente,
    });
  };

  const handleNuevoMedidorDataChange = (e) => {
    const { name, value } = e.target;
    setNuevoMedidorData({
      ...nuevoMedidorData,
      [name]: value,
    });
  };

  const handleCrearNuevoMedidor = () => {
    axios
      .post("medidor/createMedidor", nuevoMedidorData) // Ajusta la ruta y el objeto de datos según tu API
      .then((response) => {
        // Actualiza la lista de medidores después de crear uno nuevo
        setMedidores([...medidores, response.data]);
        loadClientes();
        handleCloseCrearMedidorPopup();
      })
      .catch((error) => {
        console.error("Error al crear el medidor", error);
      });
  };

  const handleEliminarCliente = (clienteId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      // Realiza la lógica para eliminar el cliente aquí, por ejemplo:
      axios
        .delete(`user/deleteUser/${clienteId}`)
        .then((response) => {
          // Actualiza la lista de clientes después de eliminar
          setClientes((prevClientes) =>
            prevClientes.filter((cliente) => cliente.id !== clienteId)
          );
          loadClientes();

          setSelectedCliente(null);
          setClienteInfo(null);
          setMedidores([]);
        })
        .catch((error) => {
          console.error("Error al eliminar el cliente", error);
        });
    }
  };
  console.log(clienteInfo);
  console.log(selectedCliente);

  return (
    <div className="container mx-auto p-6 relative">
      <h1 className="text-3xl font-semibold mb-4">Lista de Clientes</h1>
      <select
        className="w-full p-2 mb-4 border rounded"
        onChange={(e) => handleClienteChange(e.target.value)}
        value={selectedCliente || ""}
      >
        <option value="">Selecciona un cliente</option>
        {clientes.map((cliente) => (
          <option key={cliente.id} value={cliente.id}>
            {cliente?.nombre} - {cliente?.RUT}
          </option>
        ))}
      </select>
      <button
        className="bg-blue-500 text-white border rounded p-2"
        onClick={handleOpenCrearClientePopup}
      >
        Crear Nuevo Cliente
      </button>

      {selectedCliente && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">Información del Cliente</h2>
          <p>
            <strong>Nombre:</strong> {clienteInfo?.nombre}
          </p>
          <p>
            <strong>RUT:</strong> {clienteInfo?.RUT}
          </p>
          <p>
            <strong>Id:</strong> {clienteInfo?.id}
          </p>
          <h2 className="text-2xl font-semibold mt-4">Medidores</h2>
          <ul>
            {medidores.map((medidor) => (
              <li key={medidor?.id}>
                Código: {medidor?.codigo}, Nombre: {medidor?.nombre}
              </li>
            ))}
          </ul>
          <Link
            to={`/ver/${selectedCliente}`}
            className="text-blue-500 border-4 rounded-md"
          >
            Ver Más..
          </Link>{" "}
          <button
            className="bg-blue-500 text-white border rounded p-2 mt-4"
            onClick={handleOpenCrearMedidorPopup}
          >
            Crear Nuevo Medidor
          </button>
          <button
            className="bg-red-500 text-white border rounded p-2"
            onClick={() => handleEliminarCliente(selectedCliente)}
          >
            Eliminar Cliente
          </button>
          <button
            className="bg-red-500 text-white border rounded p-2"
            onClick={reiniciarCliente}
          >
            Reiniciar
          </button>
        </div>
      )}

      {isCrearClientePopupOpen && (
        <div className="popup absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-700 bg-opacity-90">
          <div className="bg-white p-4 rounded-lg z-10">
            <h2 className="font-bold">Crear Nuevo Cliente</h2>
            <form>
              <label>RUT</label>
              <input
                className="border-2 mx-3"
                type="text"
                name="RUT"
                value={nuevoClienteData.RUT}
                onChange={handleNuevoClienteDataChange}
              />
              <label>Nombre</label>
              <input
                className="border-2 mx-3"
                type="text"
                name="nombre"
                value={nuevoClienteData.nombre}
                onChange={handleNuevoClienteDataChange}
              />
              <label>Dirección</label>
              <input
                className="border-2 mx-3"
                type="text"
                name="direccion"
                value={nuevoClienteData.direccion}
                onChange={handleNuevoClienteDataChange}
              />
              <button
                className="bg-blue-500 text-white border rounded p-2"
                onClick={handleCrearNuevoCliente}
              >
                Crear Cliente
              </button>
              <button
                className="bg-red-500 text-white border rounded p-2"
                onClick={handleCloseCrearClientePopup}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}

      {isCrearMedidorPopupOpen && (
        <div className="popup absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-700 bg-opacity-90">
          <div className="bg-white p-4 rounded-lg z-10">
            <h2 className="font-bold">Crear Nuevo Medidor</h2>
            <form>
              <label>Código</label>
              <input
                className="border-2 mx-3"
                type="text"
                name="codigo"
                value={nuevoMedidorData.codigo}
                onChange={handleNuevoMedidorDataChange}
              />
              <label>Nombre</label>
              <input
                className="border-2 mx-3"
                type="text"
                name="nombre"
                value={nuevoMedidorData.nombre}
                onChange={handleNuevoMedidorDataChange}
              />
              <label>Descripción</label>
              <input
                className="border-2 mx-3"
                type="text"
                name="descripcion"
                value={nuevoMedidorData.descripcion}
                onChange={handleNuevoMedidorDataChange}
              />
              <button
                className="bg-blue-500 text-white border rounded p-2"
                onClick={handleCrearNuevoMedidor}
              >
                Crear Medidor
              </button>
              <button
                className="bg-red-500 text-white border rounded p-2"
                onClick={handleCloseCrearMedidorPopup}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientesList;
