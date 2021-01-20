import { BASE_URL } from "./config.js";
/**
 * Retorna los paises como elementos <option>
 */
export const loadPaises = async () => {
   //Envio la peticion y se espera
   const response = await fetch(`${BASE_URL}/servicio/paises`);
   //Parseo la respuesta a JSON
   const paises = await response.json();

   if (!paises) return;

   //Se agrega la opcion desabilitada
   let options = '<option disabled selected>Seleciona</option>';

   //Se agregan las opciones con los datos de cada pais
   paises.forEach(pais => options += `<option value="${pais.id}">${pais.nombre}</option> `);
   return options;
}

/**
 * Retorna los estados como elementos <option>
 * @param {number} paisId identificador del pais
 */
export const loadEstados = async (paisId) => {
   //Parseo del paisId ya que el endpint recibe un entero
   const body = parseInt(paisId);
   //Se establece el metodo POST
   const method = "POST";
   //Envio de la peticion y se espera
   const response = await fetch(`${BASE_URL}/servicio/estados`,
      {
         method,
         body,
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
      });
   //Parseo de la respuesta
   const estados = await response.json();
   if (!estados) return;

   //Se agrega la opcion desablilitada
   let options = '<option disabled selected>Seleciona</option>';
   //Se agregan las opciones con los datos de cada estado
   estados.forEach(estado => options += `<option value="${estado.id}">${estado.nombre}</option> `);
   return options;
}

/**
 * Retorna las ciudades como elementos <option>
 * @param {number} estadoId identificador del estado
 */
export const loadCiudades = async (estadoId) => {
   //Parseo el estadoId ya que el endpint recibe un entero
   const body = parseInt(estadoId);
   //Se establece el metodo POST
   const method = "POST";
   //Envio la peticion y se espera
   const response = await fetch(`${BASE_URL}/servicio/ciudades`,
      {
         method,
         body,
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
      });
   //Parseo de la respuesta
   const ciudades = await response.json();
   if (!ciudades) return;
   //Se agrega la opcion desablilitada
   let options = '<option disabled selected>Seleciona</option>';
   //Se agregan las opciones con los datos de cada ciudad
   ciudades.forEach(ciudad => options += `<option value="${ciudad.id}">${ciudad.nombre}</option> `);
   return options;
}


/**
 * Retorna los usuarios como elementos <div class="card">
 */
export const loadUsuarios = async () => {

   //Envio la peticion y se espera
   const response = await fetch(`${BASE_URL}/servicio/usuarios`);
   //Parseo de la respuesta
   const usuarios = await response.json();
   if (!usuarios) return;
   //Se agrega la opcion desablilitada
   let options = "";
   //Se agregan las opciones con los datos de cada ciudad
   usuarios.forEach(usuario => {
      options += `
         <div class="card">
            <p> <span class="card-title">Nombre: </span>${usuario.nombre}</p>
            <p> <span class="card-title">Edad: </span>${usuario.edad}</p>
         </div>`
   });
   return options;
}
