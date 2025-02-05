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
      element.textContent = `${listaNombres[i].nombre}, tu amigo secreto es: ${listaDuplicadaNombres[i].nombre}`;
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
  const {jsPDF} = window.jspdf;
  const descargable = new jsPDF();

  descargable.setFontSize(16);
  descargable.text("Resultado de Sorteo amigo secreto", 20, 20);

  let y = 30;
  for (let i = 0; i < listaNombres.length; i++) {
    descargable.text(`${listaNombres[i].nombre}, tu amigo secreto es: ${listaDuplicadaNombres[i].nombre}`, 20, y);
    y += 10;    
  }
  descargable.save("Listado_amigo_secreto.pdf");
}

// Evento agregar objeto y sorteo amigos
document.querySelector('.button-add').addEventListener('click', validarFormulario);
document.querySelector('.button-draw').addEventListener('click', () => {
  listaDuplicadaNombres = [...listaNombres];
  // Llamar función para sortear la lista listaNombres
  sortearAmigo();
  // Comparar las listas
  listasDiferentes = compararListas(listaNombres, listaDuplicadaNombres);
  // Verificar condición
  condicionalLista(listasDiferentes);
});
document.querySelector('.button-pdf').addEventListener('click', generarPDF);
