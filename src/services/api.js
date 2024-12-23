const API_URL = 'https://localhost:7059/api/Pokemons';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const pokemonApi = {
  getAllPokemons: async () => {
    try {
      const response = await fetch(`${API_URL}`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching pokemons:', error);
      throw new Error(
        'No se pudo conectar con el servidor. ' +
        'Verifica que la API esté corriendo en https://localhost:7059/api/Pokemons'
      );
    }
  },

  syncPokemon: async (name) => {
    try {
      const response = await fetch(`${API_URL}/Sincronizar/${name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error syncing pokemon:', error);
      throw new Error('Error al sincronizar el Pokémon');
    }
  },

  deletePokemon: async (id) => {
    try {
      const response = await fetch(`${API_URL}/Eliminar/${id}`, {
        method: 'DELETE'
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error deleting pokemon:', error);
      throw new Error('Error al eliminar el Pokémon');
    }
  },

  updatePokemon: async (id, pokemonData) => {
    try {
      const response = await fetch(`${API_URL}/Modificar/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idPokemon: id,
          nombre: pokemonData.name,
          tipo: pokemonData.type,
          poderCombate: pokemonData.combatPower
        })
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error updating pokemon:', error);
      throw new Error('Error al actualizar el Pokémon');
    }
  }



};