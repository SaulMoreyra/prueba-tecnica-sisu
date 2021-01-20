import { loadPaises, loadEstados, loadCiudades, loadUsuarios } from './js/ajax.js';
import { validaNombre, validaEdad, validaSelect } from './js/validations.js';
import { saveUser } from './js/services.js';

const main = (() => {
   let nombreInput = document.getElementById("nombre");
   let edadInput = document.getElementById("edad");
   let paisSelect = document.getElementById("pais");
   let estadoSelect = document.getElementById("estado");
   let ciudadSelect = document.getElementById("ciudad");
   let form = document.getElementById("form");
   let notify = document.getElementById("notify");
   let usersContainer = document.getElementById("users-container");

   const init = async () => {

      loadUsers();

      //Se establecen los paises al select de paises (se carga con el documento)
      getElement(paisSelect, "select").innerHTML = await loadPaises();

      //Se establecen los listener change de los select pais y estado
      getElement(paisSelect, "select").onchange = (e) => loadSelect(e, estadoSelect);
      getElement(estadoSelect, "select").onchange = (e) => loadSelect(e, ciudadSelect);

      //Se establecen los listener de los input (nombre, edad) y el select ciudad
      //Para limpiar los errores una vez que se modifica el valor
      getElement(nombreInput, "input").addEventListener("input", () => clearErrors(nombreInput));
      getElement(edadInput, "input").addEventListener("input", () => clearErrors(edadInput));
      getElement(ciudadSelect, "select").addEventListener("change", () => clearErrors(ciudadSelect));

      form.addEventListener("submit", validationForm);
   }

   const loadUsers = async () => usersContainer.innerHTML = await loadUsuarios();

   /**
    * Valida los inputs ocupados
    * Si alguno no es valido muestra un mensaje accediendo al metodo setError
    * Si todos son validos hace el envio de la informacion al service saveUser
    * @param {event} evt evento provocado pot el form
    */
   const validationForm = (evt) => {
      evt.preventDefault();

      //Se extraen los valores de los input
      const nombre = getElement(nombreInput, "input").value;
      const edad = getElement(edadInput, "input").value;
      const ciudad = getElement(ciudadSelect, "select").value;

      //Se llama al metodo que valida el nombre
      const vNombre = validaNombre(nombre);
      //Se llama al metodo que valida la edad
      const vEdad = validaEdad(edad);
      //Se llama al metodo que valida la ciudad
      const vCiudad = validaSelect(ciudad);

      //Se evalua la validacion
      //De ser ser correcta la validacion se establece un mensaje con el problema
      if (!vNombre.valido) { setError(nombreInput, vNombre.mensaje); }
      if (!vEdad.valido) setError(edadInput, vEdad.mensaje)
      if (!vCiudad.valido) setError(ciudadSelect, vCiudad.mensaje);

      //Se evalua si todos los campos requeridos son validos
      //Si estos lo son se envia al servicio saveUser
      if (vNombre.valido && vEdad.valido && vCiudad.valido) {
         saveUser(nombre, parseInt(edad), parseInt(ciudad))
            .then(resp => {
               clearForm();
               showNotify("success", resp.resultado);
               loadUsers();
            })
            .catch(() => showNotify("error", "Ha ocurrido un errror"));
      }
   }

   /**
    * Limpia los elementos input y select
    * Con exepción de paisesSelect, se establece la opcion 0 (Selecciona)
    */
   const clearForm = () => {
      const disabledOption = "<option disabled selected>Seleciona</option>";
      getElement(nombreInput, "input").value = "";
      getElement(edadInput, "input").value = "";
      getElement(paisSelect, "select").selectedIndex = 0;
      getElement(ciudadSelect, "select").innerHTML = disabledOption;
      getElement(estadoSelect, "select").innerHTML = disabledOption;
   }

   /**
    * Muestra una notificación dependiendo del type
    * @param {string} type tipo del mensaje success o error
    * @param {string} mensaje mensaje a mostrarse
    */
   const showNotify = (type, mensaje) => {
      //Establece el mensaje al elemento <p>
      getElement(notify, "p").innerHTML = mensaje;
      //Se muesta la notificación dependiendo del tipo
      notify.classList.add(type === "success" ? "notify-success" : "notify-error");

      //El mensaje desaparece despues de 3 segundos
      setTimeout(() => {
         getElement(notify, "p").innerHTML = "";
         notify.classList.remove(type === "success" ? "notify-success" : "notify-error");
      }, 3000);

   }

   /**
    * Muestra una notificación dependiendo del type
    * @param {event} e evento provocado por el listener onChange
    * @param {Element} nodo el nodo contiene un label, select y span 
    */
   const loadSelect = async (e, nodo) => {
      switch (e.target.id) {
         case "pais":
            const idPais = e.target.value;
            getElement(nodo, "select").innerHTML = await loadEstados(idPais);
            break;
         default:
            const idEstado = e.target.value;
            getElement(nodo, "select").innerHTML = await loadCiudades(idEstado);
            break;
      }
   }

   /**
    * Limpia los errores de la etiqueta span
    * @param {Element} nodo contiene un label, input y span 
    */
   const clearErrors = (nodo) => {
      getElement(nodo, "span").innerHTML = "";
      getElement(nodo, "span").classList.remove("error-alert");
   }


   /**
    * Muestra un un error en la etiqueta span
    * @param {Element} nodo contiene un label, input y span 
    * @param {mensaje} mensaje mensaje que se mostrara en la etiqueta span
    */
   const setError = (nodo, mensaje) => {
      getElement(nodo, "span").innerHTML = mensaje;
      getElement(nodo, "span").classList.add("error-alert");
   }


   /**
    * Retorna el elemento requerido de un nodo
    * @param {Element} nodo contiene un label, input o select y span 
    * @param {string} elemento elemento requerido dentro del nodo
    */
   const getElement = (nodo, elemento) => {
      return nodo.getElementsByTagName(elemento)[0];
   }

   return { init };
})();

//Inicializa la lógica una vez cargado el documento html
document.addEventListener("DOMContentLoaded", main.init);