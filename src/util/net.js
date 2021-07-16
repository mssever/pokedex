export async function getPokemon() {
  let pokemon_data = 'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json'
  let response = await fetch(pokemon_data)
  return await response.json()
}
