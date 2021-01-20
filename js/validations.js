/**
 * Valida que el nombre sea correcto
 * El nombre debe de ser de 50 caracteres máximo
 * Únicamente pueden ingresar letras (incluyendo acentos), espacios y puntos.
 * @param {string} nombre parametro a evaluar
 */
export const validaNombre = (nombre) => {
   //Se valida que no existan espacios antes o después de las letras
   nombre = nombre.trim();

   //Si el nombre esta vacio no es valido y retorna un mensaje
   if (nombre.length === 0)
      return {
         valido: false,
         mensaje: "No puede estar vacio"
      }

   //Si el nombre es mayor a 50 no es valido y retorna un mensaje
   if (nombre.length > 50)
      return {
         valido: false,
         mensaje: "No puede ser mayor a 50 caracteres"
      }

   //Si nombre contiene algun caracter no permitido es invalido y retorna un mensaje
   if (!nombre.match(/^[A-Za-zÀ-ÿñÑ .]*$/))
      return {
         valido: false,
         mensaje: "Solo de admiten letras (con acento), espacios y puntos"
      }

   //Si llego a este punto es por que el nombre es valido
   return { valido: true };
}


/**
 * Valida que la edad sea correcta
 * Debe ser entre 18 y 99 inclusive
 * @param {number} edad parametro a evaluar
 */
export const validaEdad = (edad) => {
   //Se valida que no existan espacios antes o después de las numeros
   edad = edad.trim();

   //Si la edad esta vacia es invalido y retorna un mensaje
   if (edad.length === 0)
      return {
         valido: false,
         mensaje: "No puede estar vacia"
      }

   //Si la edad contiene caracteres distintos a numeros es invalido y retorna un mensaje
   if (!edad.match(/^[0-9]*$/))
      return {
         valido: false,
         mensaje: "Solo se aceptan numeros"
      }

   //Si esta fuera del rango entre 18 y 99 es invalido y retorna un mensaje
   if (!(parseInt(edad) >= 18 && parseInt(edad) <= 99))
      return {
         valido: false,
         mensaje: "Debe estar enrtre 18 y 99"
      }

   //Si llego a este punto es por que la edad es valida
   return { valido: true };
}

/**
 * Valida que el valor de un select exista
 * Y sea diferente al defaultValue
 * @param {string} value valor de un select
 */
export const validaSelect = (value) => {
   //se evalua que exista un valor en el select y que sea diferente al defaultValue
   if (!value || value === "Seleciona")
      return {
         valido: false,
         mensaje: "Selecciona una opcion"
      }
   //Si llego a este punto es por que el select es valido
   return { valido: true };
}