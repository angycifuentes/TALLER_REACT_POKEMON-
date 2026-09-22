import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Usuario {
    id: number;
    nombreCompleto: string;
    documento: { tipo: string, numero: string};
    fechaNacimiento: string;
    correo: string;
    datosPersonales: boolean;
    fechaRegistro: string;
}

export interface PokemonTarjeta{
    id: number;
    name: string;
    image: string;
    type: string;
    baseExperience: string;
    esfavorito?: boolean;
    }

interface PokemonContextType {
    entrenadores : Usuario[];
    entrenadorActivo : Usuario | null;
    mochilaActual : PokemonTarjeta[];
    seleccionarEntrenador : (usuario: Usuario) => void;
    registrarEntrenador : (usuario : Usuario) => void;
    guardarMochila : (pokemon : PokemonTarjeta) => void;
    actualizarFavorito : (pokemonId : number) => void;
    eliminarPokemon : (pokemonId : number) => void;
}

const PokemonContext = createContext<PokemonContextType | undefined> (undefined);

export const pokemonProvider : React.FC<{ children : React.ReactNode}> = ({ children }) => { 
    const [entrenadores,SetEntrenadores] = useState<Usuario[]>();
    const [entrenadorActivo,SetEntrenadorActivo] = useState<Usuario[] | null> (null);
    const [mochilaActual,SetMochilaActual] = useState<PokemonTarjeta[] | null> (null);

    useEffect(() =>{
        const data = localStorage.getItem('lista_entrenadores');
        if(data){
            const lista : Usuario[]= JSON.parse(data);
            SetEntrenadores(lista);

            const idActivo = localStorage.getItem('entrenador_Activo_id');

            if(idActivo) {
                const encontrado = lista.find(u => u.id.toString() === idActivo);
                if (encontrado) seleccionarEntrenador(encontrado);
            }
        }
    },[]);

    const cargarMochilaEntrenador = (usuarioId: number) =>{
        const data = localStorage.getItem(`mochila_${usuarioId}`);
        SetMochilaActual(data ? JSON.parse(data) :[]);
        
    }

    const seleccionarEntrenador = (usuario : Usuario) => {
        SetEntrenadorActivo(usuario);
        localStorage.setItem('entrenador_activo_id', usuario.id.toString());
        cargarMochilaEntrenador(usuario.id);
    }



}   