import { theme } from "@chakra-ui/react"
import { IPokemon } from "../models/IPokemon"
import { api } from "../services/api"
import { typeColors } from "./typeColors"

export const configPokemons = async (results: IPokemon[]) => {
  const pokemons = await Promise.all(results.map(async pokemon => {
    const id = pokemon.url.split('/')[6].padStart(3, '0')
    
    const pokemonEndPoint = await api.get(`pokemon/${pokemon.name}`)
    const specieEndPoint = await api.get(`pokemon-species/${pokemon.name}`)

    const { 
      types, 
      abilities, 
      stats, 
      base_experience, 
      height, 
      weight,
    } = pokemonEndPoint.data

    const { 
      is_baby, 
      is_legendary, 
      is_mythical, 
      flavor_text_entries,
      evolution_chain,
    } = specieEndPoint.data

    const { url } = evolution_chain

    const evolutionChainId = url.split('/')[6]

    const evolutionChainEndPoint = await api.get(`evolution-chain/${evolutionChainId}`)

    const evoChain = [];
    let evoData = evolutionChainEndPoint.data.chain

    do {
      const evoDetails = evoData['evolution_details'][0];

      evoChain.push({
        species_name: evoData.species.name,
        min_level: !evoDetails ? 1 : evoDetails.min_level,
        image_url: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${evoData.species.url.split('/')[6].padStart(3, '0')}.png`,
        gif_url: `https://projectpokemon.org/images/normal-sprite/${evoData.species.name}.gif`,
      });
    
      evoData = evoData['evolves_to'][0];
    } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

    const flavor_text = flavor_text_entries.find(flavor => flavor.language.name === 'en').flavor_text

    const formattedTypes = types.map(type => {
      return {
        ...type,
        color: typeColors.find(t => t.name === type.type.name)?.color
      }
    })

    const stats_data = [
      { name: 'hp', value: 'HP', color: theme.colors.red[500] },
      { name: 'attack', value: 'ATK', color: theme.colors.orange[500] },
      { name: 'defense', value: 'DEF', color: theme.colors.yellow[500] },
      { name: 'special-attack', value: 'SP.ATK', color: theme.colors.cyan[500] },
      { name: 'special-defense', value: 'SP.DEF', color:  theme.colors.green[500] },
      { name: 'speed', value: 'SPD', color: theme.colors.pink[500] },
    ]

    const formattedStats = stats.map(item => {
      return {
        ...item,
        stat: {
          ...item.stat,
          label: stats_data.find(s => s.name === item.stat.name)?.value,
          color: stats_data.find(s => s.name === item.stat.name)?.color
        }
      }
    })

    return {
      id: `Nº ${id}`,
      name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
      url: pokemon.url,
      gif_url: `https://projectpokemon.org/images/normal-sprite/${pokemon.name}.gif`,
      image_url: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`,
      types: formattedTypes,
      base_experience,
      height: `${height / 10}m`,
      weight: `${weight / 10}kg`,
      abilities,
      stats: formattedStats,
      flavor_text,
      is_baby, 
      is_legendary, 
      is_mythical, 
      evolution_chain: evoChain,
    }
  }))

  return pokemons
}