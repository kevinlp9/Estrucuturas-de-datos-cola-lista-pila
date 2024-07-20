document.addEventListener("DOMContentLoaded", function () {
    const opcionesSelect = document.getElementById("opcionesGuardadas");

    const btnInsertarPrincipio = document.getElementById("btnInsertarPrincipio");
    const btnInsertarFinal = document.getElementById("btnInsertarFinal");
    const btnInsertarPosicion = document.getElementById("btnInsertarPosicion");
    const btnEliminarPrincipio = document.getElementById("btnEliminarPrincipio");
    const btnEliminarFinal = document.getElementById("btnEliminarFinal");
    const btnEliminarPosicion = document.getElementById("btnEliminarPosicion");
    const btnEliminarValor = document.getElementById("btnEliminarValor");
    const btnGuardarLocalmente = document.getElementById("btnGuardarLocalmente");
    const btnLimpiarLista = document.getElementById("btnLimpiarLista");
    const btnLimpiarCelda = document.getElementById("btnLimpiarCelda");
    const btnEliminarListaGuardada = document.getElementById("btnEliminarListaGuardada");

    document.getElementById('btnInsertarPrincipio').addEventListener('click', function() {
        if (valor =! NULL) {
            mostrarCodigo('insertar-al-principio-code');
        }else{
            alert("Agrega un valor para insertar");
            return;
        }
    });
    
    document.getElementById('btnInsertarFinal').addEventListener('click', function() {
        mostrarCodigo('insertar-al-final-code');
    });
    
    document.getElementById('btnInsertarPosicion').addEventListener('click', function() {
        mostrarCodigo('insertar-por-posicion-code');
    });
    
    document.getElementById('btnEliminarPrincipio').addEventListener('click', function() {
        mostrarCodigo('eliminar-del-principio-code');
    });
    
    document.getElementById('btnEliminarFinal').addEventListener('click', function() {
        mostrarCodigo('eliminar-del-final-code');
    });
    
    document.getElementById('btnEliminarPosicion').addEventListener('click', function() {
        mostrarCodigo('eliminar-por-posicion-code');
    });
    
    document.getElementById('btnEliminarValor').addEventListener('click', function() {
        mostrarCodigo('eliminar-por-valor-code');
    });

    document.getElementById('btnLimpiarLista').addEventListener('click', function() {
        const contenedor = document.getElementById('contenedor');
        contenedor.innerHTML = '';
    });
    
    actualizarMenuDesplegable();

    btnInsertarPrincipio.addEventListener("click", (e)=> {
        e.preventDefault();
        agregarElemento(1);
    });

    btnInsertarFinal.addEventListener("click", (e)=> {
        e.preventDefault();
        agregarElemento(2);
    });

    btnInsertarPosicion.addEventListener("click", (e)=> {
        e.preventDefault();
        agregarElemento(3);
    });

    btnEliminarPrincipio.addEventListener("click", (e)=> {
        e.preventDefault();
        agregarElemento(4);
    });

    btnEliminarFinal.addEventListener("click", (e)=> {
        e.preventDefault();
        agregarElemento(5);
    });

    btnEliminarPosicion.addEventListener("click", (e)=> {
        e.preventDefault();
        agregarElemento(6);
    });

    btnEliminarValor.addEventListener("click", (e)=> {
        e.preventDefault();
        agregarElemento(7);
    });

    btnGuardarLocalmente.addEventListener("click", (e)=> {
        e.preventDefault();
        agregarElemento(8);
    });

    btnLimpiarLista.addEventListener("click", function () {
        const contenedor = document.getElementById("contenedor");
        contenedor.innerHTML = ''; 
        
    });

    btnLimpiarCelda.addEventListener("click", function () {
        const numeroInput = document.getElementById("numero");
        numeroInput.value = "";
    });

    btnEliminarListaGuardada.addEventListener("click", function () {
        const clavesListas = Object.keys(localStorage);

        if (clavesListas.length === 0) {
            alert("No hay listas guardadas para eliminar");
            return;
        }

        const listaSeleccionada = prompt("Selecciona una lista para eliminar:\n" + clavesListas.join("\n"));

        if (listaSeleccionada === null) {
            return; 
        }

        if (!clavesListas.includes(listaSeleccionada)) {
            alert("La lista seleccionada no existe");
            return;
        }

        const confirmacion = confirm(`¿Estás seguro de que deseas eliminar la lista "${listaSeleccionada}"?`);

        if (confirmacion) {
            localStorage.removeItem(listaSeleccionada);
            actualizarMenuDesplegable();
        }
    });

    opcionesSelect.addEventListener("change", function () {
        const listaSeleccionada = opcionesSelect.value;
        mostrarListaSeleccionada(listaSeleccionada);
    });

    function mostrarCodigo(id) {
        // Oculta todos los elementos con la clase 'noview'
        var elementos = document.querySelectorAll('.noview');
        elementos.forEach(function(elemento) {
            elemento.classList.add('noview');
        });
    
        // Muestra el elemento con el ID correspondiente
        var elementoCodigo = document.getElementById(id);
        elementoCodigo.classList.remove('noview');
    
        // Oculta automáticamente después de 2 segundos
        setTimeout(function() {
            elementoCodigo.classList.add('noview');
        }, 2000);
    }

    function mostrarListaSeleccionada(listaSeleccionada) {
        const contenedor = document.getElementById("contenedor");
        contenedor.innerHTML = "";
        if (listaSeleccionada) {
            const listaGuardada = localStorage.getItem(listaSeleccionada);
            if (listaGuardada) {
                const listaArray = JSON.parse(listaGuardada);
                for (const elemento of listaArray) {
                    const elem = document.createElement("div");
                    elem.textContent = elemento;
                    elem.classList.add("hijo");
                    elem.classList.add("anim");
                    contenedor.appendChild(elem);
                }
            }
        }
    }

    function actualizarMenuDesplegable() {
        const opcionesSelect = document.getElementById("opcionesGuardadas");
        opcionesSelect.innerHTML = "";
        const clavesListas = Object.keys(localStorage);
        for (const claveLista of clavesListas) {
            const option = document.createElement("option");
            option.value = claveLista;
            option.textContent = claveLista;
            opcionesSelect.appendChild(option);
        }
    }


    function agregarElemento(num) {
        const valor = document.getElementById("numero").value;
        const elem = document.createElement("div");
        elem.textContent = valor;
        elem.classList.add("hijo");
        elem.classList.add("anim");
    
       

        const contenedor = document.getElementById("contenedor");
    
        if (num === 1) {
            if (valor === "") {
                alert("Agrega un valor para insertar");
                return;
            }
            contenedor.insertBefore(elem, contenedor.firstChild);
        } else if (num === 2) {
            if (valor === "") {
                alert("Agrega un valor para insertar");
                return;
            }
            contenedor.appendChild(elem);
        } else if (num === 3) {
            if (valor === "") {
                alert("Agrega un valor para insertar");
                return;
            }
            const posicion = parseInt(prompt("Ingrese la posición (1 hasta " + (contenedor.childElementCount + 1) + ")"));
        
            if (posicion > 0 && posicion <= contenedor.childElementCount + 1) {
                const elementos = contenedor.children;
                if (posicion === 1) {
                    contenedor.insertBefore(elem, elementos[0]);
                } else {
                    contenedor.insertBefore(elem, elementos[posicion - 1]);
                }
            } else {
                alert("Posición inválida");
                return;
            }
        } else if (num === 4) {
            if (contenedor.firstChild == null) {
                alert("No hay nada que eliminar");
            }
            setTimeout(function () {
                if (contenedor.firstChild) {
                    contenedor.removeChild(contenedor.firstChild);
                }
            }, 400);
        } else if (num === 5) {
            if (contenedor.lastChild == null) {
                alert("No hay nada que eliminar");
            }
            setTimeout(function () {
                if (contenedor.lastChild) {
                    contenedor.removeChild(contenedor.lastChild);
                }
            }, 400);
        } else if (num === 6) {
            if (contenedor.childElementCount === 0) {
                alert("El contenedor no contiene elementos");
                return;
            }

            const posicion = prompt("Ingrese la posición (1 hasta " + contenedor.childElementCount + ")");

            if (posicion === null) {
            
                return;
            }

            const posicionEntero = parseInt(posicion);

            if (!isNaN(posicionEntero) && posicionEntero > 0 && posicionEntero <= contenedor.childElementCount) {
                const elementos = contenedor.children;

                const indice = posicionEntero - 1;

                if (indice === 0) {
                    contenedor.removeChild(contenedor.firstChild);
                } else if (indice === contenedor.childElementCount - 1) {
                    contenedor.removeChild(contenedor.lastChild);
                } else {
                    contenedor.removeChild(elementos[indice]);
                }
            } else {
                alert("Posición inválida");
                return;
            }

        } else if (num === 7) {
            if (contenedor.childElementCount === 0) {
                alert("El contenedor no contiene elementos");
                return;
            }
            const valorAEliminar = prompt("Ingrese el valor a eliminar");

            if (valorAEliminar === null) {
                return;
            }
    
            const elementos = contenedor.children;
            let valorEncontrado = false;

            for (let i = 0; i < elementos.length; i++) {
                if (elementos[i].textContent === valorAEliminar) {
                    valorEncontrado = true;
                    break;
                }
            }
    
            if (!valorEncontrado) {
                alert("El valor a eliminar no existe en la lista");
                return;
            }
            const posicion = prompt("Ingrese la posición a eliminar (1 hasta " + (contenedor.childElementCount ) + " o deje en blanco para eliminar todos los elementos con ese valor)");

            if (posicion !== "") {
                const posicionNum = parseInt(posicion);
                if (isNaN(posicionNum) || posicionNum <= 0 || posicionNum > contenedor.childElementCount || elementos[posicionNum - 1].textContent !== valorAEliminar) {
                    alert("Posición inválida o no coincide con el valor indicado");
                    return;
                }

                contenedor.removeChild(elementos[posicionNum - 1]);
            } else {
            
                for (let i = elementos.length - 1; i >= 0; i--) {
                    if (elementos[i].textContent === valorAEliminar) {
                        contenedor.removeChild(elementos[i]);
                    }
                }
            }

        } else if (num === 8) {
            if (contenedor.childElementCount === 0) {
                alert("El contenedor no contiene elementos");
                return;
            }
            const nombreClave = prompt("Ingrese el nombre para la clave en localStorage");
            
            if (nombreClave === null || nombreClave.trim() === "") {
                alert("Nombre de clave inválido");
                return;
            }

           const elementos = contenedor.children;
            const listaEnlazada = Array.from(elementos).map(elemento => elemento.textContent);
            const listaEnlazadaString = JSON.stringify(listaEnlazada);
            localStorage.setItem(nombreClave, listaEnlazadaString);

            alert("Lista guardada correctamente en localStorage con clave: " + nombreClave);
                }
            }
});



