// utils/formatters.js
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const typeColors = {
  fire: 'bg-red-100 text-red-800',
  water: 'bg-blue-100 text-blue-800',
  grass: 'bg-green-100 text-green-800',
  electric: 'bg-yellow-100 text-yellow-800',
  normal: 'bg-gray-100 text-gray-800',
  bug: 'bg-lime-100 text-lime-800',
  default: 'bg-purple-100 text-purple-800'
};