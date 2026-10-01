import React from 'react';
import { usePokemon } from '../context/pokemonContext';

export const InventarioPokemon: React.FC = () => {
  const { entrenadorActivo, eliminarPokemon, actualizarFavorito, mochilaActual } = usePokemon();

  // Función para asignar el color dinámico según el tipo del Pokémon
  const obtenerColorPorTipo = (tipo: string) => {
    if (!tipo) return '#ffffff';
    const t = tipo.toLowerCase();
    if (t === 'bug') return '#483D8B';       // Requerimiento Punto 2a: BUG
    if (t === 'ghost') return '#0000CD';     // Requerimiento Punto 2b: GHOST
    if (t === 'fire') return '#f80b0b';
    if (t === 'water') return '#024aff';
    if (t === 'grass') return '#14f539';
    if (t === 'electric') return '#e2e60c';
    return '#2a2a2a'; // Color por defecto si es otro tipo
  };

  if (!entrenadorActivo) {
    return (
      <div>
        <h3>NO HAY ENTRENADORES</h3>
        <p>Por favor asigne <strong>entrenador activo</strong> o registre un entrenador</p>
      </div>
    );
  }

  return (
    <div className="form-container">
      <header>
        <h2>Mochila de {entrenadorActivo.nombreCompleto}</h2>
      </header>
      <div className="grid-mochila">
        {mochilaActual.length > 0 ? (
          mochilaActual.map((poke, index) => (
            <div 
              key={poke.id} 
              className={`tarjeta-item ${poke.esFavorito ? 'tarjeta-favorita' : ''}`}
              style={{
                backgroundColor: obtenerColorPorTipo(poke.type),
                color: 'white',
                padding: '16px',
                borderRadius: '12px',
                marginBottom: '12px'
              }}
            >
              <span>
                #{index + 1} de {mochilaActual.length}
              </span>

              <img src={poke.image} alt={poke.name} />
              <h4>{poke.name.toUpperCase()}</h4>
              <p>
                Tipo:{' '}
                <span style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontWeight: 'bold'
                }}>
                  {poke.type.toUpperCase()}
                </span>
              </p>

              <div className="panel-botones">
                <button
                  className={`btn-fav ${poke.esFavorito ? 'fav-activo' : ''}`}
                  onClick={() => actualizarFavorito(poke.id)}
                >
                  {poke.esFavorito ? ' 🌟⭐Favorito' : ' 🌟Marcar'}
                </button>
                <button
                  type="button"
                  className="btn-eliminar"
                  onClick={() => eliminarPokemon(poke.id)}
                >
                  Liberar o Soltar
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>Tu mochila está vacía actualmente.</p>
            <p>¡Vaya y capture pokémon!</p>
          </div>
        )}
      </div>
    </div>
  );
};