import { useState, useEffect } from 'react';
import { fetchPokemons } from '../services/api';

export const usePokemon = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async () => {
    try {
      const data = await fetchPokemons();
      setPokemons(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { pokemons, loading, error, reloadPokemons: loadPokemons };
};