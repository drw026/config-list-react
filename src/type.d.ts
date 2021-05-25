interface IConfig {
    title: string
    id: string
    status: string
    creationDate: string
    startDate: string
    endDate: string
    testSegments: number[]
    referenceSegments: number[]
}

type ConfigurationListContextType = {
    configList: IConfig[]
    isConfigListLoading: boolean
    updateConfigList: (IConfig) => void
    refreshConfigList: () => void
}
