// Crear y llenar la lista
let listaNombres = [];
let listaDuplicadaNombres = [];

// Validar campos
function validarFormulario() {
  let inputNick = document.getElementById("nick").value;
  let inputAmigo = document.getElementById("amigo").value;
  if (inputNick === "" || inputAmigo === "") {
    alert("Los campos no pueden estar vacíos");
  } else {
    agregarObjeto();
  }
}

// Agregar información a la lista
function agregarObjeto() {
  // Obtener datos
  let nombres = document.getElementById('nick').value;
  let valores = document.getElementById('amigo').value;

  // Crear objeto
  let nuevoObjeto = {
    nombre: nombres,
    valor: valores
  };

  listaNombres.push(nuevoObjeto);
  limpieza();
  visualizarLista ()
}

function visualizarLista () {
  const contenidolistaAmigos = document.getElementById('listaAmigos');
  contenidolistaAmigos.innerHTML = ''; // Limpiar contenido anterior

  const listaJugadores = document.createElement('ul');
  for (let i = 0; i < listaNombres.length; i++) {
    const element = document.createElement('li');
    element.textContent = `${listaNombres[i].nombre}`;
    listaJugadores.appendChild(element);
  }
  contenidolistaAmigos.appendChild(listaJugadores);
}

function limpieza() {
  document.getElementById('nick').value = '';
  document.getElementById('amigo').value = '';
}

function sortearAmigo() {
  listaDuplicadaNombres = [...listaNombres];
  // Organizar lista aleatoriamente
  listaDuplicadaNombres.sort(() => Math.random() - 0.5);
  return listaDuplicadaNombres;
}

function compararListas(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i].nombre === b[i].nombre) {
      // La lista tiene elementos iguales
      return false;
    }
  }
  // Contenido distinto
  return true;
}

function condicionalLista(listasDiferentes) {
  const contenidoResultado = document.getElementById('resultado');
  contenidoResultado.innerHTML = ''; // Limpiar contenido anterior
  
  if (listasDiferentes) {
    // Imprimir en la página las parejas por medio de una lista
    const listaEmparejados = document.createElement('ul');
    for (let i = 0; i < listaNombres.length; i++) {
      const element = document.createElement('li');
      element.textContent = `▪️ ${listaNombres[i].nombre}, tu amigo secreto es: ${listaDuplicadaNombres[i].nombre} 🎉`;
      listaEmparejados.appendChild(element);
    }
    contenidoResultado.appendChild(listaEmparejados);
  } else {
    // Llamar a la función ordenar lista
    console.log(`Las listas tienen contenido igual en algún índice. Volviendo a sortear...`);
    sortearAmigo();
    // Llamar a comparar listas
    listasDiferentes = compararListas(listaNombres, listaDuplicadaNombres);
    condicionalLista(listasDiferentes);
  }
} 

// Generar PDF
function generarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.setTextColor(40, 40, 40);
  doc.text("Resultados del Sorteo de Amigo Secreto", 20, 20);

  let y = 30; // Inicializamos y para comenzar a escribir después del título

  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  
  for (let i = 0; i < listaNombres.length; i++) {
    doc.text(`${listaNombres[i].nombre} tu amigo secreto es: ${listaDuplicadaNombres[i].nombre}`, 20, y);
    y += 10; // Incrementamos y en 10 para la siguiente línea
  }

  // Añadir borde
  doc.setLineWidth(1);
  doc.setDrawColor(255, 0, 0);
  doc.rect(10, 10, 190, y + 10);

  // Guardar PDF
  doc.save("amigo_secreto.pdf");
}

// modal
function toggleModal() {
  const modal = document.getElementById("helpModal");
  if (modal.style.display === "block") {
    modal.style.display = "none";
  } else {
    modal.style.display = "block";
  }
}

// Evento agregar objeto y sorteo amigos
document.querySelector('.button-add').addEventListener('click', validarFormulario);
document.querySelector('.button-draw').addEventListener('click', () => {
  listaDuplicadaNombres = [...listaNombres];
  // Llamar función para sortear la lista listaNombres
  sortearAmigo();
  // Comparar las listas
  const listasDiferentes = compararListas(listaNombres, listaDuplicadaNombres);
  // Verificar condición
  condicionalLista(listasDiferentes);
  // Activando boton PDF
  document.querySelector('.button-pdf').disabled = false;
});
document.querySelector('.button-pdf').addEventListener('click', generarPDF);
