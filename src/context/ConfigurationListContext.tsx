import React, { createContext, useEffect, useState, ReactNode } from "react";

export const ConfigurationListContext = createContext<ConfigurationListContextType | null>(null);

type ConfigurationListProviderProps = {
    children: ReactNode;
}

const ConfigurationListProvider = (props: ConfigurationListProviderProps) => {
    const { children } = props;
    const [configList, setConfigList] = useState<IConfig[]>([]);

    const getConfigurations=() => {
        fetch('configurations.json'
            ,{
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(response => (response.json()))
            .then(data => setConfigList(data.configurations))
    }

    useEffect(() => {
        getConfigurations()
    },[])

    return (
        <ConfigurationListContext.Provider value={{configList}}>
            {children}
        </ConfigurationListContext.Provider>
    )
}

export default ConfigurationListProvider

