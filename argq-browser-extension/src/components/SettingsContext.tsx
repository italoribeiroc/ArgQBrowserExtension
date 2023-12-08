import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SettingsContextType {
    clareza: boolean;
    setClareza: React.Dispatch<React.SetStateAction<boolean>>;
    organizacao: boolean;
    setOrganizacao: React.Dispatch<React.SetStateAction<boolean>>;
    credibilidade: boolean;
    setCredibilidade: React.Dispatch<React.SetStateAction<boolean>>;
    apeloEmocionalPolaridade: boolean;
    setApeloEmocionalPolaridade: React.Dispatch<React.SetStateAction<boolean>>;
    apeloEmocionalIntensidade: boolean;
    setApeloEmocionalIntensidade: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultState: SettingsContextType = {
    clareza: true,
    setClareza: () => {},
    organizacao: true,
    setOrganizacao: () => {},
    credibilidade: true,
    setCredibilidade: () => {},
    apeloEmocionalPolaridade: true,
    setApeloEmocionalPolaridade: () => {},
    apeloEmocionalIntensidade: true,
    setApeloEmocionalIntensidade: () => {},
};

const SettingsContext = createContext<SettingsContextType>(defaultState);

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [clareza, setClareza] = useState<boolean>(defaultState.clareza);
    const [organizacao, setOrganizacao] = useState<boolean>(defaultState.organizacao);
    const [credibilidade, setCredibilidade] = useState<boolean>(defaultState.credibilidade);
    const [apeloEmocionalPolaridade, setApeloEmocionalPolaridade] = useState<boolean>(defaultState.apeloEmocionalPolaridade);
    const [apeloEmocionalIntensidade, setApeloEmocionalIntensidade] = useState<boolean>(defaultState.apeloEmocionalIntensidade);

    useEffect(() => {
        chrome.storage.sync.get([
            'clareza',
            'organizacao',
            'credibilidade',
            'apeloEmocionalPolaridade',
            'apeloEmocionalIntensidade'
            ], (result) => {
            if (result.clareza !== undefined) setClareza(result.clareza);
            if (result.organizacao !== undefined) setOrganizacao(result.organizacao);
            if (result.credibilidade !== undefined) setCredibilidade(result.credibilidade);
            if (result.apeloEmocionalPolaridade !== undefined) setApeloEmocionalPolaridade(result.apeloEmocionalPolaridade);
            if (result.apeloEmocionalIntensidade !== undefined) setApeloEmocionalIntensidade(result.apeloEmocionalIntensidade);
            });
    }, []);

    // Salvar o estado no Chrome Storage sempre que ele mudar
    useEffect(() => {
        chrome.storage.sync.set({ clareza, organizacao, credibilidade, apeloEmocionalPolaridade, apeloEmocionalIntensidade });
    }, [clareza, organizacao, credibilidade, apeloEmocionalPolaridade, apeloEmocionalIntensidade]);

    return (
        <SettingsContext.Provider value={{ clareza, setClareza, organizacao, setOrganizacao, credibilidade, setCredibilidade, apeloEmocionalPolaridade, setApeloEmocionalPolaridade, apeloEmocionalIntensidade, setApeloEmocionalIntensidade }}>
        {children}
        </SettingsContext.Provider>
    );
};
