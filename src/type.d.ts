interface IConfig {
    title: string
    id: string
    status: string
    startDate: string
    endDate: string
}

type ConfigurationListContextType = {
    configList: IConfig[]
}
