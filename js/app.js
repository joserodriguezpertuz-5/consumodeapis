const API = "https://rickandmortyapi.com/api/character";
let pagina = 1;
let totalPaginas = 1;

const lista = document.getElementById("lista");
const mensaje = document.getElementById("mensaje");

async function cargar() {
  const nombre = document.getElementById("buscar").value.trim();
  const estado = document.getElementById("estado").value;
  const url = `${API}?page=${pagina}&name=${nombre}&status=${estado}`;

  mensaje.textContent = "Cargando...";
  lista.innerHTML = "";

  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok) throw new Error("Sin resultados");
    const datos = await respuesta.json();

    totalPaginas = datos.info.pages;
    mostrar(datos.results);
    mensaje.textContent = "";
  } catch (error) {
    mensaje.textContent = "No se encontraron personajes.";
    totalPaginas = 1;
  }

  document.getElementById("pagina").textContent = `Página ${pagina} de ${totalPaginas}`;
  document.getElementById("anterior").disabled = pagina === 1;
  document.getElementById("siguiente").disabled = pagina >= totalPaginas;
}

function mostrar(personajes) {
  lista.innerHTML = personajes.map(p => `
    <div class="tarjeta">
      <img src="${p.image}" alt="${p.name}">
      <div>
        <h3>${p.name}</h3>
        <p class="${p.status.toLowerCase()}">${p.status} - ${p.species}</p>
        <p>${p.origin.name}</p>
      </div>
    </div>
  `).join("");
}

document.getElementById("btnBuscar").addEventListener("click", () => { pagina = 1; cargar(); });
document.getElementById("anterior").addEventListener("click", () => { pagina--; cargar(); });
document.getElementById("siguiente").addEventListener("click", () => { pagina++; cargar(); });

cargar();