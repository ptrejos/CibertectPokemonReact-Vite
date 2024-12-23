import PropTypes from 'prop-types';
import { Trash2, Edit } from 'lucide-react';
import { typeColors } from '../utils/formatters';
import { formatDate } from '../utils/formatters';

const PokemonCard = ({ pokemon, onDelete, onEdit }) => {
  const type = pokemon.type?.toLowerCase() || 'default';
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold capitalize">{pokemon.name}</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(pokemon)}
            className="p-1 text-gray-500 hover:text-blue-500 transition-colors"
            title="Editar Pokémon"
          >
            <Edit className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(pokemon)}
            className="p-1 text-gray-500 hover:text-red-500 transition-colors"
            title="Eliminar Pokémon"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <span 
          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            typeColors[type] || typeColors.default
          }`}
        >
          {pokemon.type}
        </span>
        
        <div className="flex justify-between items-center mt-4">
          <div className="text-gray-600">
            <span className="font-medium">Combat Power:</span>
            <span className="ml-2">{pokemon.combatPower}</span>
          </div>
          <span className="text-sm text-gray-500">#{pokemon.id}</span>
        </div>
        
        <div className="text-sm text-gray-500 mt-4">
          Captured: {formatDate(pokemon.captureDate)}
        </div>
      </div>
    </div>
  );
};

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    combatPower: PropTypes.number.isRequired,
    captureDate: PropTypes.string.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default PokemonCard;