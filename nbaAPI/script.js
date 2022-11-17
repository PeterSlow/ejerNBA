const dictionaryPosition = {
  F: "Alero",
  C: "Pivot",
  PF: "Ala-Pivot",
  G: "Escolta",
}

const jugadoresPosicion = "https://www.balldontlie.io/api/v1/players/?page=";
const jugadoresPosicionPagina = "&&per_page=100";
const positionAPI = "https://www.balldontlie.io/api/v1/players/";
const nbaAPI = "https://www.balldontlie.io/api/v1/teams/";

const selectPosition = document.getElementById("selectPosition");
const selectTeams = document.getElementById("selectTeams");
const cssTypes = ["F", "C", "PF", "G"];
let teams = new Array();

async function getTeam() {
  let response = await fetch(`${nbaAPI}`);
  let infoEquipos = await response.json();
  teams.push(teams.name)
  obtenerTodosEquipos(infoEquipos)
}

const obtenerTodosEquipos = datosEquipos => {

  for (let posicion = 0; posicion < datosEquipos.meta.total_count; posicion++) {
    let optionEquipos = document.createElement("option");
    let equipo = datosEquipos.data[posicion];
    teams.push(equipo.name);
    optionEquipos.innerText = equipo.name;
    selectTeams.appendChild(optionEquipos);
  }
}

async function dameEquipos() {
  let seleccionadoId = teams.indexOf(selectTeams.value);
  let response = await fetch(`${nbaAPI}${seleccionadoId}`);
  let equipoSeleccionado = await response.json();
  console.log(`El nombre abreviado de los ${equipoSeleccionado.full_name} : ${equipoSeleccionado.abbreviation} `)
}

async function getPosition() {
  let response = await fetch(`${positionAPI}`)
  let dataPosition = await response.json();
  fillSelectTypes(cssTypes);
}

const fillSelectTypes = cssTypes => {

  for (let position = 0; position < cssTypes.length; position++) {
    let optionElement = document.createElement("option");
    let typeName = cssTypes[position];

    optionElement.value = typeName;

    if (dictionaryPosition[typeName]) {
      optionElement.textContent = dictionaryPosition[typeName];
    } else {
      optionElement.textContent = typeName;
    }
    selectPosition.appendChild(optionElement);
  }
}
async function getJugadorPosicion() {

  let jugadores = new Array();

  let response = await fetch(`${jugadoresPosicion}1${jugadoresPosicionPagina}`);
  let datosPosiciones = await response.json();

  for (let pos = 1; pos <= datosPosiciones.meta.total_pages; pos++) {
    let response = await fetch(`${jugadoresPosicion}${pos}${jugadoresPosicionPagina}`);
    let pagina = await response.json();

    for (let i = 0; i < pagina.meta.per_page; i++) {

      if (selectPosition.value === pagina.data[0].position) {
        jugadores.push(pagina.data[i]);
      }
    }
  }
  console.log(jugadores);

}

getTeam();
getPosition();
