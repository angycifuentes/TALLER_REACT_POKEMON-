import React from 'react';
import { usePokemon } from '../context/pokemonContext';

export const InventarioPokemon: React.FC = () => {
  const { entrenadorActivo, eliminarPokemon, actualizarFavorito, mochilaActual } = usePokemon();

  
  const obtenerColorPorTipo = (tipo: string) => {
    if (!tipo) return '#ffffff';
    const t = tipo.trim().toLowerCase();
    if (t === 'bug') return '#483D8B';       
    if (t === 'ghost') return '#0000CD';    
    if (t === 'fire') return '#f80b0b';
    if (t === 'water') return '#024aff';
    if (t === 'grass') return '#14f539';
    if (t === 'electric') return '#e2e60c';
    return '#ffffff'; 
  };

  if (!entrenadorActivo) {
    return (
      <div className="form-container">
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
                backgroundColor: '#1e1e1e', 
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
                  backgroundColor: '#000000',
                  color: obtenerColorPorTipo(poke.type), 
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: `2px solid ${obtenerColorPorTipo(poke.type)}`, 
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