import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function UserInfo() {
  const { clienteId } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [medidores, setMedidores] = useState([]);
  const [isClientePopupOpen, setIsClientePopupOpen] = useState(false);
  const [isMedidorPopupOpen, setIsMedidorPopupOpen] = useState(false);
  const [updatedClienteData, setUpdatedClienteData] = useState({});
  const [updatedMedidorData, setUpdatedMedidorData] = useState({
    id: "", // Inicialmente, no hay medidor seleccionado
  });
  const [medidorToDelete, setMedidorToDelete] = useState(""); // Medidor para eliminar
  const loadUserData = () => {
    axios
      .get(`user/getUser/${clienteId}`)
      .then((response) => {
        setUserInfo(response.data);
        setMedidores(response.data.Medidores);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del usuario", error);
      });
  };

  useEffect(() => {
    // Cargamos los datos iniciales del usuario y sus medidores
    loadUserData();
  }, [clienteId]);

  const handleOpenClientePopup = () => {
    setIsClientePopupOpen(true);
  };

  const handleCloseClientePopup = () => {
    setIsClientePopupOpen(false);
  };

  const handleOpenMedidorPopup = () => {
    setIsMedidorPopupOpen(true);
  };

  const handleCloseMedidorPopup = () => {
    setIsMedidorPopupOpen(false);
  };

  const handleUpdateClienteData = () => {
    // Envía una solicitud al servidor para actualizar los datos del cliente
    axios
      .put(`user/updateUser/${clienteId}`, updatedClienteData)
      .then((response) => {
        // Actualiza los datos del componente después de la actualización
        // setUserInfo(response.data);
        loadUserData();

        setIsClientePopupOpen(false);
      });
  };

  const handleUpdateMedidorData = () => {
    // Asegúrate de que se haya seleccionado un medidor antes de actualizar sus datos
    if (updatedMedidorData.id) {
      // Envía una solicitud al servidor para actualizar los datos del medidor
      axios
        .put(
          `medidor/updateMedidor/${updatedMedidorData.id}`,
          updatedMedidorData
        )
        .then((response) => {
          // Actualiza los datos del componente después de la actualización
          //   setMedidores(response.data);
          loadUserData();

          setIsMedidorPopupOpen(false);
        });
    }
  };

  const handleDeleteMedidor = () => {
    if (medidorToDelete) {
      // Envía una solicitud al servidor para eliminar el medidor
      axios
        .delete(`medidor/deleteMedidor/${medidorToDelete}`)
        .then(() => {
          // Elimina el medidor de la lista de medidores

          //   setMedidores(updatedMedidores);
          loadUserData();

          setMedidorToDelete(""); // Reinicia el medidor a eliminar
        })
        .catch((error) => {
          console.error("Error al eliminar el medidor", error);
        });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">
        Información Completa Del Cliente
      </h1>{" "}
      {userInfo && (
        <div className="mt-4">
          <h2 className="font-semibold">Nombre: {userInfo?.nombre}</h2>
          <p>ID: {userInfo?.id}</p>
          <p>RUT: {userInfo?.RUT}</p>
          <p>Dirección: {userInfo?.direccion}</p>

          <button
            className="mt-2 bg-blue-500 text-white rounded px-4 py-1"
            onClick={handleOpenClientePopup}
          >
            Actualizar Datos del Cliente
          </button>
        </div>
      )}
      <div className="mt-8">
        <h1 className="text-2xl font-semibold">
          Información Completa De los Medidores
        </h1>
        {medidores &&
          Array.isArray(medidores) &&
          medidores.map((medidor) => (
            <li className="mt-2" key={medidor?.id}>
              Código: {medidor?.codigo}, Nombre: {medidor?.nombre}, Fecha
              Creación: {medidor?.fechaCreacion}, Descripción:{" "}
              {medidor?.descripcion}
            </li>
          ))}

        <div className="mt-4">
          <select
            className="border p-2"
            value={medidorToDelete}
            onChange={(e) => setMedidorToDelete(e.target.value)}
          >
            <option value="">Selecciona un medidor para eliminar</option>
            {medidores.map((medidor) => (
              <option key={medidor.id} value={medidor.id}>
                {medidor.nombre}
              </option>
            ))}
          </select>
          <button
            className="bg-red-500 text-white rounded px-4 py-1 ml-2"
            onClick={handleDeleteMedidor}
          >
            Eliminar Medidor
          </button>
        </div>

        <button
          className="mt-4 bg-blue-500 text-white rounded px-4 py-1"
          onClick={handleOpenMedidorPopup}
        >
          Actualizar Datos del Medidor
        </button>
      </div>
      <Link to="/" className="mt-4 text-md  block text-blue-500 font-bold">
        Volver a la lista de clientes
      </Link>{" "}
      {isClientePopupOpen && (
        <div className="popup absolute top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded p-4 w-1/2">
            <h2 className="text-xl font-semibold">
              Actualizar Datos del Cliente
            </h2>
            <form>
              <label className="block">Nombre</label>
              <input
                className="border p-2 w-full"
                type="text"
                value={updatedClienteData.nombre}
                onChange={(e) =>
                  setUpdatedClienteData({
                    ...updatedClienteData,
                    nombre: e.target.value,
                  })
                }
              />

              <label className="block">RUT</label>
              <input
                className="border p-2 w-full"
                type="text"
                value={updatedClienteData.RUT}
                onChange={(e) =>
                  setUpdatedClienteData({
                    ...updatedClienteData,
                    RUT: e.target.value,
                  })
                }
              />

              <label className="block">Dirección</label>
              <input
                className="border p-2 w-full"
                type="text"
                value={updatedClienteData.direccion}
                onChange={(e) =>
                  setUpdatedClienteData({
                    ...updatedClienteData,
                    direccion: e.target.value,
                  })
                }
              />
            </form>
            <button
              className="mt-2 bg-blue-500 text-white rounded px-4 py-1"
              onClick={handleUpdateClienteData}
            >
              Guardar Cambios
            </button>
            <button
              className="mt-2 bg-red-500 text-white rounded px-4 py-1 ml-2"
              onClick={handleCloseClientePopup}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      {isMedidorPopupOpen && (
        <div className="popup absolute top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded p-4 w-1/2">
            <h2 className="text-xl font-semibold">
              Actualizar Datos del Medidor
            </h2>

            <form>
              <label className="block">Medidor a Actualizar</label>
              <select
                className="border p-2 w-full"
                value={updatedMedidorData.id}
                onChange={(e) =>
                  setUpdatedMedidorData({
                    ...updatedMedidorData,
                    id: e.target.value,
                  })
                }
              >
                <option value="">Selecciona un medidor</option>
                {medidores.map((medidor) => (
                  <option key={medidor?.id} value={medidor?.id}>
                    {medidor?.nombre}
                  </option>
                ))}
              </select>

              <label className="block">Nombre</label>
              <input
                className="border p-2 w-full"
                type="text"
                value={updatedMedidorData.nombre}
                onChange={(e) =>
                  setUpdatedMedidorData({
                    ...updatedMedidorData,
                    nombre: e.target.value,
                  })
                }
              />

              <label className="block">Descripción</label>
              <input
                className="border p-2 w-full"
                type="text"
                value={updatedMedidorData.descripcion}
                onChange={(e) =>
                  setUpdatedMedidorData({
                    ...updatedMedidorData,
                    descripcion: e.target.value,
                  })
                }
              />

              <label className="block">Cliente ID</label>
              <input
                className="border p-2 w-full"
                type="text"
                value={updatedMedidorData.clienteId}
                onChange={(e) =>
                  setUpdatedMedidorData({
                    ...updatedMedidorData,
                    clienteId: e.target.value,
                  })
                }
              />
            </form>
            <button
              className="mt-2 bg-blue-500 text-white rounded px-4 py-1"
              onClick={handleUpdateMedidorData}
            >
              Guardar Cambios
            </button>
            <button
              className="mt-2 bg-red-500 text-white rounded px-4 py-1 ml-2"
              onClick={handleCloseMedidorPopup}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserInfo;
