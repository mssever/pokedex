export async function getPokemon() {
  let pokemon_data = 'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json'
  let response = await fetch(pokemon_data)
  return await response.json()
}

// calls the callback on each array item and returns true if the callback ever
// returns a non-falsey value
export function any(arr, callback) {
  // debugger
  for(let i=0; i<arr.length; i++) {
    if(callback(arr[i], i, arr)) {
      return true
    }
  }
  return false
}
