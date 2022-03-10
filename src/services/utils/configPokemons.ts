import { IPokemon } from "../../models/IPokemon"
import { api } from "../api"
import { typeColors } from "./typeColors"

export const configPokemons = async (results: IPokemon[]) => {
  const pokemons = await Promise.all(results.map(async pokemon => {
    const id = pokemon.url.split('/')[6].padStart(3, '0')
    
    const response = await api.get(`pokemon/${pokemon.name}`)

    const { types, abilities, stats } = response.data

    const formattedTypes = types.map(type => {
      return {
        ...type,
        color: typeColors.find(t => t.name === type.type.name)?.color
      }
    })

    return {
      id: `Nº ${id}`,
      name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
      url: pokemon.url,
      gif_url: `https://projectpokemon.org/images/normal-sprite/${pokemon.name}.gif`,
      image_url: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`,
      types: formattedTypes,
      abilities,
      stats
    }
  }))

  return pokemons
}