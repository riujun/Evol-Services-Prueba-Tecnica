# Evol-Services-Prueba-Tecnica

# puedes consultar la documentación de la API con Swagger

http://localhost:4000/api-docs/#/

# Instalación

## .env
PORT=4000
DB_USER=postgres
DB_PASSWORD=******(Reemplazar)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=EvolServices



## Clona el repositorio
git clone [https://github.com/tu-usuario/tu-proyecto.git](https://github.com/riujun/Evol-Services-Prueba-Tecnica.git)

## Accede al directorio del proyecto 
cd front-end, npm i

cd back-end npm i

## Instala las dependencias en ambos directorio del proyecto
npm install

## Inicia la aplicación en ambos directorio del proyecto
npm start

# Descripción General
 El proyecto Front-end proporciona una interfaz de usuario para interactuar con una base de datos de clientes y medidores. Los elementos clave de esta interfaz incluyen:

1.-Selector de Clientes:Un menú desplegable que permite a los usuarios seleccionar un cliente de la base de datos.

2.-Informacion del Cliente:Una vez que se selecciona un cliente, se muestra su información, incluyendo nombre, RUT y Id.

3.-Medidores Asociados:Se muestra una lista de los medidores asociados al cliente seleccionado.Si no hay medidores asociados, los usuarios tienen la opción de agregar uno nuevo.

4.-Creacion de Medidores:Al hacer clic en el boton "Crear Nuevo Medidor", se abre un formulario emergente que permite ingresar información sobre un nuevo medidor. El ID del cliente se asocia automáticamente a través del código, lo que vincula el medidor al cliente.

5.-Eliminar Cliente:Los usuarios tienen la opción de eliminar el cliente selecionado.Esta acción eliminará al cliente y todos sus medidores asociados.

6.-Reiniciar Cliente:Permite a los usuarios reiniciar la visualización eliminando la selección de cliente actual y ocultando la información y medidores asociados.

7.-Ver Mas Detalles: Los usuarios pueden hacer clic en esta opción para acceder a una vista detallada del cliente junto con sus medidores. Aquí tienen la capacidad de:

Actualizar la información del cliente, como nombre, RUT, etc.
Actualizar detalles de los medidores.
Eliminar medidores específicos asociados al cliente.



