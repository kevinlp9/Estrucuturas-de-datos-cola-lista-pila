const contenedor = document.querySelector("#contenedor");
const contenedorCola = document.getElementById("contenedor-cola");

const enlacePila = document.getElementById("enlace-pila");
const enlaceCola = document.getElementById("enlace-cola");

const botonesPila = document.getElementById("botones-pila");
const botonesCola = document.getElementById("botones-cola");

const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btn5 = document.getElementById("btn5");

const btnEnqueue = document.getElementById("btn-enqueue");
const btnDequeue = document.getElementById("btn-dequeue");
const btnGuardarCola = document.getElementById("btn-guardar-cola");
const btnCargarCola = document.getElementById("btn-cargar-cola");
const btnNuevaCola = document.getElementById("btn-nueva-cola");
const btnBorrarElementosCola = document.getElementById("borrar-cola");

const valor = document.getElementById("numero");
const pilas = document.getElementById("opciones");
const colas = document.getElementById("opciones-cola");

const codigosCola = document.getElementById("codigos-cola");

const codigoPush = document.getElementById("push-code");
const codigoPop = document.getElementById("pop-code");
const codigosTituloPila = document.getElementById("codigos-titulo-pila");

const codigoEnqueue = document.getElementById("enqueue-code");
const codigoDequeue = document.getElementById("dequeue-code");
const codigosTitulo = document.getElementById("codigos-titulo");

const numeros = [];
let cola = [];

//verifica si el localStorage no este vacio y agrega el boton para seleccionar las opciones guardadas
if (localStorage.length > 0) {
  for (var i = 0; i < localStorage.length; i++) {
    var nombreClave = localStorage.key(i);

    const objeto = JSON.parse(localStorage.getItem(nombreClave));
    if (objeto.tipo === "cola") agregarOpcionCola(nombreClave);

    btnPilas(nombreClave);
  }
}

// Co estas funciones se controla el cambio de una estructura a otra.
enlacePila.addEventListener("click", function (event) {
  event.preventDefault();

  codigoPop.classList.add('noview')
  codigoPush.classList.add('noview')
  codigosTituloPila.classList.add('noview')

  botonesPila.style.display = "none";
  botonesCola.style.display = "flex";

  contenedor.style.display = "none";
  contenedorCola.style.display = "flex";
  codigosCola.style.display = "flex";

  enlacePila.classList.add("active");
  enlaceCola.classList.remove("active");
});

enlaceCola.addEventListener("click", function (event) {
  event.preventDefault();

  botonesPila.style.display = "flex";
  botonesCola.style.display = "none";

  contenedor.style.display = "flex";
  contenedorCola.style.display = "none";
  codigosCola.style.display = "none";

  enlacePila.classList.remove("active");
  enlaceCola.classList.add("active");
});

//Evento para saber que valor tenemos selccionado en el select
pilas.addEventListener("change", function () {
  // Obtén el valor seleccionado en ese momento
  var valorSeleccionado = pilas.value;

  if (valorSeleccionado) {
    pilaRecuperada = JSON.parse(localStorage.getItem(valorSeleccionado));

    if (contenedor.childElementCount > 0) {
      //Elimina todos los divs que se muestran en pantalla
      while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
      }

      //Vacia el array que contiene los numeros que le pasamos
      while (numeros.length > 0) {
        numeros.pop();
      }
    }

    if (pilaRecuperada) {
      pilaRecuperada.forEach((element) => {
        const elem = document.createElement("div");
        elem.textContent = element;
        numeros.push(element);
        elem.classList.add("hijo");
        elem.classList.add("anim");
        contenedor.insertBefore(elem, contenedor.firstChild);
      });
    } else {
      console.log("No hay pila almacenada con el nombre proporcionado.");
    }
  } else {
    console.log("No se proporcionó un nombre válido.");
  }
});

btn1.addEventListener("click", (e) => {
  e.preventDefault();
  agregarElemento(1);
});
btn2.addEventListener("click", (e) => {
  e.preventDefault();
  const hijo = document.querySelector(".hijo");
  hijo.classList.remove("anim");
  hijo.classList.add("anim2");
  agregarElemento(2);
});
btn3.addEventListener("click", (e) => {
  e.preventDefault();
  agregarElemento(3);
});
btn4.addEventListener("click", (e) => {
  e.preventDefault();
  agregarElemento(4);
});
btn5.addEventListener("click", (e) => {
  e.preventDefault();
  agregarElemento(5);
});

function agregarElemento(num) {
  const valor = document.getElementById("numero-pila").value;
  const elem = document.createElement("div");
  elem.textContent = valor;
  elem.classList.add("hijo");
  elem.classList.add("anim");

  if (num == 5) {
    alert("Se eliminaron todos los elementos guardados");
  } else if (valor === "") {
    alert("Agrega un valor para insertar");
    return;
  }

  if (num == 1) {
    codigoPush.classList.remove('noview')
    codigoPop.classList.add('noview')
    codigosTituloPila.classList.remove('noview')
    //Crea un nuevo div
    contenedor.insertBefore(elem, contenedor.firstChild);
    numeros.push(valor);
  } else if (num == 2) {
    codigoPush.classList.add('noview')
    codigoPop.classList.remove('noview')
    codigosTituloPila.classList.remove('noview')
    //Elimina el hijo del objeto padre despues de 2seg en lo que acaba la animacion
    setTimeout(function () {
      contenedor.removeChild(contenedor.firstChild);
    }, 2000);
    numeros.pop();
    console.log(numeros);
  } else if (num == 3) {
    codigoPush.classList.add('noview')
    codigoPop.classList.add('noview')
    codigosTituloPila.classList.add('noview')
    //Elimina todos los divs que se muestran en pantalla
    while (contenedor.firstChild) {
      contenedor.removeChild(contenedor.firstChild);
    }

    //Vacia el array que contiene los numeros que le pasamos
    while (numeros.length > 0) {
      numeros.pop();
    }
  } else if (num == 4) {
    codigoPush.classList.add('noview')
    codigoPop.classList.add('noview')
    codigosTituloPila.classList.add('noview')
    //Implementacion del Guardado de la pila
    var nombre = window.prompt("Dame el nombre para guardar la pila");

    if (nombre) {
      btnPilas(nombre);
      localStorage.setItem(nombre, JSON.stringify(numeros));
      console.log("guardado correctamente");
    } else {
      console.log("nombre Invalido");
      //poner una alerta
    }
  } else if (num == 5) {
    codigoPush.classList.add('noview')
    codigoPop.classList.add('noview')
    codigosTituloPila.classList.add('noview')
    localStorage.clear();
    while (pilas.options.length > 0) {
      pilas.remove(0);
    }

    while (colas.options.length > 0) {
      colas.remove(0);
    }

    const option = document.createElement("option");
    option.textContent = "---";
    option.value = "vacio";
    colas.appendChild(option);

    colas.appendChild(option);

    pilas.classList.add("noview");
    btn5.classList.add("noview");

    if (contenedor.childElementCount > 0) {
      //Elimina todos los divs que se muestran en pantalla
      while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
      }

      //Vacia el array que contiene los numeros que le pasamos
      while (numeros.length > 0) {
        numeros.pop();
      }
    }
  }
}

function btnPilas(nombre) {
  const option = document.createElement("option");

  option.textContent = nombre;
  pilas.classList.remove("noview");
  btn5.classList.remove("noview");
  pilas.classList.add("btnPilas");

  pilas.appendChild(option);
}

// Animacion para la cola.

// Enqueue
btnEnqueue.addEventListener("click", function (event) {
  const campoNumero = document.getElementById("numero-cola");
  const valor = campoNumero.value;
  const regexEntero = /^\d+$/;
  if (!regexEntero.test(valor)) {
    alert("Debes ingresar un numero entero");
    return;
  }

  campoNumero.value = "";

  cola.push(valor);
  codigosTitulo.classList.remove("noview");
  codigoEnqueue.classList.remove("noview");
  codigoDequeue.classList.add("noview");

  const elementoCola = document.createElement("div");
  elementoCola.textContent = valor;
  elementoCola.classList.add("hijo");
  elementoCola.classList.add("anim");

  contenedorCola.insertBefore(elementoCola, contenedorCola.firstChild);
});

// Dequeue
btnDequeue.addEventListener("click", function (event) {
  const ultimoHijo = contenedorCola.lastElementChild;
  if (!ultimoHijo) return;

  cola.splice(0, 1);
  codigosTitulo.classList.remove("noview");
  codigoEnqueue.classList.add("noview");
  codigoDequeue.classList.remove("noview");

  ultimoHijo.classList.remove("anim");
  ultimoHijo.classList.add("anim2");
  setTimeout(function () {
    contenedorCola.removeChild(ultimoHijo);
  }, 2000);
});

btnGuardarCola.addEventListener("click", function (event) {
  codigosTitulo.classList.add("noview");
  codigoDequeue.classList.add("noview");
  codigoEnqueue.classList.add("noview");

  var nombre = window.prompt("Ingrese el nombre de la cola:");
  if (nombre) {
    if (localStorage.getItem(nombre) === null) {
      localStorage.setItem(
        nombre,
        JSON.stringify({
          tipo: "cola",
          cola,
        })
      );
      agregarOpcionCola(nombre);
    } else {
      localStorage.setItem(
        nombre,
        JSON.stringify({
          tipo: "cola",
          cola,
        })
      );
    }

    alert("Guardado correctamente.");
  } else {
    alert("¡El nombre ingresado no es valido!");
  }
});

btnBorrarElementosCola.addEventListener("click",function(event) {
    agregarElemento(5);
});

btnNuevaCola.addEventListener("click", function (event) {
  codigosTitulo.classList.add("noview");
  codigoDequeue.classList.add("noview");
  codigoEnqueue.classList.add("noview");
  colas.value = "vacio";
  while (contenedorCola.firstChild) {
    contenedorCola.removeChild(contenedorCola.firstChild);
  }

  while (cola.length > 0) {
    cola.pop();
  }
});

function agregarOpcionCola(nombre) {
  const option = document.createElement("option");

  option.textContent = nombre;
  colas.classList.remove("noview");
  btn5.classList.remove("noview");
  colas.classList.add("btnPilas");

  colas.appendChild(option);
}

colas.addEventListener("change", function () {
  codigosTitulo.classList.add("noview");
  codigoDequeue.classList.add("noview");
  codigoEnqueue.classList.add("noview");
  const valorSeleccionado = colas.value;
  if (valorSeleccionado === "vacio") return;

  const colaRecuperada = JSON.parse(localStorage.getItem(valorSeleccionado));
  if (!colaRecuperada) {
    alert("Error al recuperar cola");
    return;
  }

  if (colaRecuperada.tipo !== "cola") {
    alert("¡El archivo seleccionado no es una cola!");
    return;
  }

  if (contenedorCola.childElementCount > 0) {
    //Elimina todos los divs que se muestran en pantalla
    while (contenedorCola.firstChild) {
      contenedorCola.removeChild(contenedorCola.firstChild);
    }

    cola = [];
  }

  if (colaRecuperada) {
    colaRecuperada.cola.forEach((element) => {
      const elem = document.createElement("div");
      elem.textContent = element;
      cola.push(element);
      elem.classList.add("hijo");
      elem.classList.add("anim");
      contenedorCola.insertBefore(elem, contenedorCola.firstChild);
    });
  }
});
