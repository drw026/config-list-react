import React, { createContext, useEffect, useState, ReactNode } from "react";

export const ConfigurationListContext = createContext<ConfigurationListContextType | null>(null);

type ConfigurationListProviderProps = {
    children: ReactNode;
}

const ConfigurationListProvider = (props: ConfigurationListProviderProps) => {
    const { children } = props;
    const [configList, setConfigList] = useState<IConfig[]>([]);
    const [isConfigListLoading, setConfigListLoading] = useState(false);

    const getConfigurations=() => {
        setConfigListLoading(true);
        fetch('http://localhost:3000/tests/',
            {
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(response => (response.json()))
            .then((data) => {
                setConfigListLoading(false);
                return setConfigList(data);
            })
    }

    useEffect(() => {
        getConfigurations()
    },[])

    return (
        <ConfigurationListContext.Provider value={{
            configList,
            isConfigListLoading,
            refreshConfigList: getConfigurations,
            updateConfigList: (data: IConfig) => {
              setConfigList([
                  ...configList,
                  data
              ])
            },
        }}>
            {children}
        </ConfigurationListContext.Provider>
    )
}

export default ConfigurationListProvider

