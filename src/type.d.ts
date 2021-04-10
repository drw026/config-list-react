interface IConfig {
    title: string
    test_id: string
    status: string
    start_date: string
    end_date: string
}

type ConfigurationListContextType = {
    configList: IConfig[]
}
