import { useState } from 'react';
import PokemonList from './components/PokemonList';
import {  PlusCircle } from 'lucide-react';

const App = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [newPokemonName, setNewPokemonName] = useState('');
  const [syncMessage, setSyncMessage] = useState('');

  const handleSyncPokemon = async () => {
    if (!newPokemonName.trim()) {
      setSyncMessage('Ingrese el nombre del Pokemon');
      return;
    }

    setIsAdding(true);
    setSyncMessage('');

    try {
      const response = await fetch(`https://localhost:7059/api/Pokemons/Sincronizar/${newPokemonName}`, {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setSyncMessage('Pokemon agregado satisfactoriamente!');
        setNewPokemonName('');
        // Trigger a refresh of the pokemon list
        window.location.reload();
      } else {
        setSyncMessage(data.message || 'Error al agregar Pokemon');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setSyncMessage('Error conentando con el servidor');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Pokemon App - Cibertec</h1>
            
            {/* Add Pokemon Form */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  value={newPokemonName}
                  onChange={(e) => setNewPokemonName(e.target.value)}
                  placeholder="Nombre del Pokemon"
                  className="pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isAdding}
                />
                <button
                  onClick={handleSyncPokemon}
                  disabled={isAdding}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600 disabled:text-gray-400"
                >
                  <PlusCircle className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Sync Message */}
          {syncMessage && (
            <div className={`mt-2 text-sm ${
              syncMessage.includes('Error') ? 'text-red-500' : 'text-green-500'
            }`}>
              {syncMessage}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <PokemonList />
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-sm mt-8">
        <div className="container mx-auto px-4 py-4 text-center text-gray-600">
          <p>&copy; Web API - React </p>
        </div>
      </footer>
    </div>
  );
};

export default App;