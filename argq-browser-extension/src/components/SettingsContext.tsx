// import React, { createContext, useState, useEffect, ReactNode } from 'react';

// // Tipos para os valores do contexto
// interface SettingsContextType {
//     clareza: boolean;
//     setClareza: React.Dispatch<React.SetStateAction<boolean>>;
//     organizacao: boolean;
//     setOrganizacao: React.Dispatch<React.SetStateAction<boolean>>;
//     credibilidade: boolean;
//     setCredibilidade: React.Dispatch<React.SetStateAction<boolean>>;
//     apeloEmocionalPolaridade: boolean;
//     setApeloEmocionalPolaridade: React.Dispatch<React.SetStateAction<boolean>>;
    
// }

// // Criação do Contexto com tipos
// export const SettingsContext = createContext<SettingsContextType | null>(null);

// interface SettingsProviderProps {
//     children: ReactNode;
// }

// export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
//     const [clareza, setClareza] = useState<boolean>(JSON.parse(localStorage.getItem('clareza') || 'true'));
//     const [organizacao, setOrganizacao] = useState<boolean>(JSON.parse(localStorage.getItem('organizacao') || 'true'));
//     // ... Outros estados

//     useEffect(() => {
//         localStorage.setItem('clareza', JSON.stringify(clareza));
//         localStorage.setItem('organizacao', JSON.stringify(organizacao));
//         // ... Outras atualizações
//     }, [clareza, organizacao /* outros estados */]);

//     return (
//         <SettingsContext.Provider value={{ clareza, setClareza, organizacao, setOrganizacao /* outros estados e setters */ }}>
//             {children}
//         </SettingsContext.Provider>
//     );
// };
