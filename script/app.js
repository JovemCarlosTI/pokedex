let pokemons;

// Para carregar a pokedex com filtros e ordenamentos
let pokemonsChanged;
let pokedex = document.getElementById('pokedex');

async function carregarPokedex() {
    await fetch('/script/pokedex.json').then(res => res.json()).then(data => {pokemons = data;});

    construirPokedex(pokemons);
}

// Função que cria a pokedex no inicio e nas alterações
function construirPokedex(pokemons) {
  pokedex.innerHTML = '';

  pokemons.forEach(pokemon => {

    pokedex.innerHTML += `<div class="pokemon" data-name="${pokemon.name}"
    data-type="${pokemon.type}" tabindex="${pokemon.id}">
    <figure class="pokemon-figure">
      <img src="img/${pokemon.name.toLowerCase()}.png" alt="${pokemon.name}">
    </figure>
    <section class="pokemon-description">
      <span class="pokemon-id">${imprimirIdPokemon(pokemon.id)}</span>
      <h1 class="pokemon-name">${pokemon.name}</h1>
      <div class="pokemon-types">${tiposPokemon(pokemon)}</div>
    </section>
    <section class="pokemon-stats">
      <div class="stat-row">
        <div>hp</div>
        <div class="stat-bar">
          <div class="stat-bar-bg" style="width: 18%">${pokemon.stats.hp}</div>
        </div>
      </div>
      <div class="stat-row">
        <div>attack</div>
        <div class="stat-bar">
          <div class="stat-bar-bg" style="width: 19.6%">${pokemon.stats.attack}</div>
        </div>
      </div>
      <div class="stat-row">
        <div>defense</div>
        <div class="stat-bar">
          <div class="stat-bar-bg" style="width: 19.6%">${pokemon.stats.defense}</div>
        </div>
      </div>
      <div class="stat-row">
        <div>sp-atk</div>
        <div class="stat-bar">
          <div class="stat-bar-bg" style="width: 26%">${pokemon.stats["sp-atk"]}</div>
        </div>
      </div>
      <div class="stat-row">
        <div>sp-def</div>
        <div class="stat-bar">
          <div class="stat-bar-bg" style="width: 26%">${pokemon.stats["sp-def"]}</div>
        </div>
      </div>
      <div class="stat-row">
        <div>speed</div>
        <div class="stat-bar">
          <div class="stat-bar-bg" style="width: 18%">${pokemon.stats.speed}</div>
        </div>
      </div>
    </section>
  </div>
  `
  });

}

function tiposPokemon(pokemon) {
  let typeprint = '';

  pokemon.type.forEach(type => {
    typeprint += `<span class="pokemon-type background-${type}">${type}</span>`
  });

  return typeprint;

}

function filtrarNomePokemon() {
  let inputValue = document.getElementById('filter-name').value.toLowerCase();
  
  if (inputValue === '') {
    pokemonsChanged = pokemons.filter(function(pokemon) {
      return (pokemon.name.toLowerCase().includes(inputValue));
    })
  } else {
    pokemonsChanged = pokemonsChanged.filter(function(pokemon) {
      return (pokemon.name.toLowerCase().includes(inputValue));
    })
  }

  pokedex.innerHTML = '';
  
  construirPokedex(pokemonsChanged);
}

function filtrarTipoPokemon() {
  let inputValue = document.getElementById('filter-type').value;
  
  if(inputValue === '') {
    return true;
  } else {
    pokemonsChanged = pokemonsChanged.filter(function(pokemon) {
      return (pokemon.type.includes(inputValue));
    })
  }

  pokedex.innerHTML = '';
  
  construirPokedex(pokemonsChanged);

}

function ordenarPokemon() {
  let inputValue = document.getElementById('sort-type').value;

  if (inputValue === 'crescentnumber') {
    pokemonsChanged = pokemonsChanged.sort(function(a, b) {
      if (a["id"] > b["id"]) return 1;
      if(a["id"] < b["id"]) return -1;
      return 0;
    })
  } else if (inputValue === 'decrescentnumber') {
    pokemonsChanged = pokemonsChanged.sort(function(a, b) {
      if (a["id"] < b["id"]) return 1;
      if(a["id"] > b["id"]) return -1;
      return 0;
    })
  } else if (inputValue === 'crescentletter') {
    pokemonsChanged = pokemonsChanged.sort(function(a, b) {
      if (a["name"] > b["name"]) return 1;
      if(a["name"] < b["name"]) return -1;
      return 0;
    })
  } else if (inputValue === 'decrescentletter') {
    pokemonsChanged = pokemonsChanged.sort(function(a, b) {
      if (a["name"] < b["name"]) return 1;
      if(a["name"] > b["name"]) return -1;
      return 0;
    })
  }

  construirPokedex(pokemonsChanged);
}

// Função auxiliar de organização do id na pokedex
function imprimirIdPokemon(id) {
  if (id < 10) return `#00${id}`
  if (id < 100) return `#0${id}`
  return `#${id}`
}

// Intermediário entre os filtros e ordenação
function verificarFiltros() {
  pokemonsChanged = pokemons;

  filtrarNomePokemon();
  filtrarTipoPokemon();
  ordenarPokemon();
}
