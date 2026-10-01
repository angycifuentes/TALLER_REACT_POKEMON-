import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { usePokemon, type PokemonTarjeta } from '../context/pokemonContext';

export const BuscadorPokemon: React.FC = () => {
    const navigate = useNavigate(); 
    const { entrenadorActivo, guardarPokemonMochila } = usePokemon();

    const [busqueda, setBusqueda] = useState('');
    const [pokemonActual, setPokemonActual] = useState<PokemonTarjeta | null>(null);
    const [mensajeError, setMensajeError] = useState<string | null>(null);
    const [cargando, setCargando] = useState(false);

    
    const obtenerColorPorTipo = (tipo: string) => {
        const t = tipo.toLowerCase();
        if (t === 'bug') return '#483D8B';       
        if (t === 'ghost') return '#0000CD';     
        if (t === 'fire') return '#f80b0b';
        if (t === 'water') return '#024aff';
        if (t === 'grass') return '#14f539';
        if (t === 'electric') return '#e2e60c';
        return '#55080c';
    };

    const buscarPokemon = async (e: React.FormEvent) => {
        e.preventDefault();

        const query = busqueda.trim().toLowerCase();

        if (!query) {
            return;
        }

        setCargando(true);
        setMensajeError(null);

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
            if (!res.ok) throw new Error('Auxilio, Socorro, no hay Pokemon');

            const datos = await res.json();
            setPokemonActual({
                id: datos.id,
                name: datos.name,
                image: datos.sprites.front_default,
                type: datos.types[0].type.name,
                baseExperience: datos.base_experience,
                esFavorito: false
            });
        } catch (error: any) {
            setPokemonActual(null);
            setMensajeError(error.message);
        } finally {
            setCargando(false);
        }
    };

    const clickGuardar = () => {
        if (!entrenadorActivo) {
            alert('Debes seleccionar o registrar un entrenador');
            return;
        }
        if (pokemonActual) {
            guardarPokemonMochila(pokemonActual);
            alert(`El Pokemon ${pokemonActual.name} fue guardado en la mochila de ${entrenadorActivo?.nombreCompleto}`);
            
            
            navigate('/inventario'); 
        }
    };

    return (
        <div className='form-container'>
            <div>
                {entrenadorActivo ? (
                    <p>Mochila Activa de: <strong>{entrenadorActivo.nombreCompleto}</strong></p>
                ) : (
                    <p>No hay Entrenador Activo. Ve al formulario de registro para activarlo, socio.</p>
                )}
            </div>

            <form onSubmit={buscarPokemon}>
                <div>
                    <label>Buscar Pokemon</label>
                    <input 
                        type='text' 
                        value={busqueda} 
                        onChange={(e) => setBusqueda(e.target.value)} 
                        placeholder="Ej: Caterpie, Gengar, Pikachu" 
                    />
                </div>
                <button type="submit" disabled={cargando}>
                    {cargando ? 'Escaneando...' : 'Buscar'}
                </button>
            </form>

            {mensajeError && <p style={{ color: 'red' }}>{mensajeError}</p>}

            {pokemonActual && (
                <div 
                    className="pokemon-card"
                    style={{
                        backgroundColor: obtenerColorPorTipo(pokemonActual.type),
                        padding: '16px',
                        borderRadius: '12px',
                        marginTop: '16px',
                        color: 'white'
                    }}
                >
                    <h3>{pokemonActual.name.toUpperCase()}</h3>
                    <img src={pokemonActual.image} alt={pokemonActual.name} />
                    <p>
                        Elemento:{' '}
                        <span style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            color: 'white',
                            padding: '4px 10px',
                            borderRadius: '10px',
                            border: '1px solid #ffffff',
                            fontWeight: 'bold'
                        }}>
                            {pokemonActual.type.toUpperCase()}
                        </span>
                    </p>
                    <p>
                        Experiencia Base: <strong>{pokemonActual.baseExperience}</strong>
                    </p>
                    <button 
                        type="button" 
                        className="btn-capturar" 
                        onClick={clickGuardar}  
                        disabled={!entrenadorActivo}
                        style={{ marginTop: '10px', cursor: 'pointer' }}
                    >
                        Guardar en la Mochila
                    </button>
                </div>
            )}
        </div>
    );
};