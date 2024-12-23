/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, SlidersHorizontal } from 'lucide-react';
import SearchBar from './SearchBar';
import PokemonCard from './PokemonCard';
import LoadingSpinner from './LoadingSpinner';
import { ConfirmationDialog, EditPokemonDialog } from './Dialogs';
import { pokemonApi } from '../services/api';

const SORT_OPTIONS = {
  NAME: 'name',
  POWER: 'combatPower',
  DATE: 'captureDate'
};

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.NAME);
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedType, setSelectedType] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, pokemon: null });
  const [editDialog, setEditDialog] = useState({ open: false, pokemon: null });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await pokemonApi.getAllPokemons();
      setPokemons(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (pokemon) => {
    setDeleteDialog({ 
      open: true, 
      pokemon,
    });
  };

  const confirmDelete = async () => {
    try {
      await pokemonApi.deletePokemon(deleteDialog.pokemon.id);
      setPokemons(pokemons.filter(p => p.id !== deleteDialog.pokemon.id));
      setDeleteDialog({ open: false, pokemon: null });
    } catch (error) {
      setError('Error al eliminar el Pokémon');
    }
  };

  const handleEdit = (pokemon) => {
    setEditDialog({ open: true, pokemon });
  };

  const handleSaveEdit = async (formData) => {
    try {
      await pokemonApi.updatePokemon(editDialog.pokemon.id, formData);
      setPokemons(pokemons.map(p => 
        p.id === editDialog.pokemon.id 
          ? { ...p, ...formData }
          : p
      ));
      setEditDialog({ open: false, pokemon: null });
    } catch (error) {
      setError('Error al actualizar el Pokémon');
    }
  };

  const toggleSort = (option) => {
    if (sortBy === option) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortDirection('asc');
    }
  };

  const getSortedAndFilteredPokemons = () => {
    let filtered = [...pokemons];

    // Aplicar filtro de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Aplicar filtro por tipo
    if (selectedType) {
      filtered = filtered.filter(pokemon =>
        pokemon.type.toLowerCase() === selectedType.toLowerCase()
      );
    }

    // Aplicar ordenamiento
    filtered.sort((a, b) => {
      let compareA = a[sortBy];
      let compareB = b[sortBy];
      
      if (typeof compareA === 'string') {
        compareA = compareA.toLowerCase();
        compareB = compareB.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return compareA > compareB ? 1 : -1;
      }
      return compareA < compareB ? 1 : -1;
    });

    return filtered;
  };

  const getUniqueTypes = () => {
    const types = new Set(pokemons.map(p => p.type.toLowerCase()));
    return Array.from(types);
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl">{error}</p>
          <button 
            onClick={fetchPokemons}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  const filteredPokemons = getSortedAndFilteredPokemons();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Pokémon Collection</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          <SlidersHorizontal className="h-5 w-5" />
          Filtros
        </button>
      </div>
      
      <div className={`space-y-4 ${showFilters ? 'block' : 'hidden'}`}>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar por nombre o tipo..."
        />

        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos los tipos</option>
            {getUniqueTypes().map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>

          <div className="flex gap-4">
            <button
              onClick={() => toggleSort(SORT_OPTIONS.NAME)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                sortBy === SORT_OPTIONS.NAME ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'
              }`}
            >
              Nombre
              {sortBy === SORT_OPTIONS.NAME && (
                sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={() => toggleSort(SORT_OPTIONS.POWER)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                sortBy === SORT_OPTIONS.POWER ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'
              }`}
            >
              Poder
              {sortBy === SORT_OPTIONS.POWER && (
                sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={() => toggleSort(SORT_OPTIONS.DATE)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                sortBy === SORT_OPTIONS.DATE ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'
              }`}
            >
              Fecha
              {sortBy === SORT_OPTIONS.DATE && (
                sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {filteredPokemons.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          No se encontraron Pokémon que coincidan con tu búsqueda.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
          
          <div className="mt-6 text-center text-gray-600">
            Total Pokémon: {filteredPokemons.length}
          </div>
        </>
      )}

      <ConfirmationDialog
        isOpen={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, pokemon: null })}
        onConfirm={confirmDelete}
        title="Eliminar Pokémon"
        message={`¿Estás seguro que deseas eliminar a ${deleteDialog.pokemon?.name}?`}
      />

      <EditPokemonDialog
        isOpen={editDialog.open}
        onClose={() => setEditDialog({ open: false, pokemon: null })}
        onSave={handleSaveEdit}
        pokemon={editDialog.pokemon}
      />
    </div>
  );
};

export default PokemonList;