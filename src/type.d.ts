interface IConfig {
    experiment_id: string
    experiment_name: string
    category_id: number
    category_name: string
    url_tail: string
    also_applies_to_subcategories: string
    after_row: number
    mobile: string
    tablet: string
    desktop: string
    type: string
    required_field_values: string
    module_block_title: string
}

type ConfigurationListContextType = {
    configList: IConfig[]
}
