import React, { createContext, useEffect, useState } from "react";

export const ConfigurationListContext = createContext(null);

const ConfigurationListProvider: React.FC = ({ children }) => {
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
        {children}
    )
}

export default ConfigurationListProvider
