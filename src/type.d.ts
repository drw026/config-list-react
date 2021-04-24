interface IConfig {
    title: string
    test_id: string
    status: string
    startDate: string
    endDate: string
}

type ConfigurationListContextType = {
    configList: IConfig[]
}
