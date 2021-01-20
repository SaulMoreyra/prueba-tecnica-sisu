import { BASE_URL } from "./config.js";

/**
 * Retorna la respuesta del servidor como un JSON
 * @param {string} nombre del usuarrio
 * @param {number} edad del usuarrio
 * @param {number} ciudadId origen del usuarrio
 */
export const saveUser = async (nombre, edad, ciudadId) => {
   const body = JSON.stringify({ ciudadId, nombre, edad });
   const method = "POST";
   const response = await fetch(`${BASE_URL}/servicio/guardar`,
      {
         method,
         body,
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
      });
   const res = await response.json();
   return res;
}