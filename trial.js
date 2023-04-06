const pokedex = document.getElementById("pokedex");
console.log(pokedex);

async  function fetchPokemon(){

    const pokes = [];
    for(let i = 1; i <= 21; i++){
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        pokes.push(fetch(url).then((res) => res.json()));
    }
    
    Promise.all(pokes).then(results =>{
        
        const pokemon = results.map(data =>({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            weight: data.weight,
            height: data.height,
            abilities: data.abilities.map((power) => power.ability.name).join(", "),
            type: data.types.map(type => type.type.name).join(", "),
            moves: data.moves.map((power,index)=> {
                if(index <=3){
                    return power.move.name
                }
            }).join(' ')
            
            
        }));
        displayPokemon(pokemon);
    })
};



const displayPokemon = (pokemon) =>{
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map(pokeman =>`
    <li class="card">
        <img class="card-image" src="${pokeman.image}"/ >
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>       
        <p class="card-subtitle">Type: ${pokeman.type}</p>
        <p class="card-subtitle">Abilities: ${pokeman.abilities}</p>
        <p class="card-subtitle">Weight: ${pokeman.weight} Height: ${pokeman.height}</p>
        <p class="card-subtitle">Moves: ${pokeman.moves}</p>
    </li>
    `)
    .join('');
    pokedex.innerHTML = pokemonHTMLString;
}

fetchPokemon();