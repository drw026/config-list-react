import React, {useContext} from 'react';
import { ConfigurationListContext } from "../../context/ConfigurationListContext";

const ConfigurationList: React.FC = () => {
    const { configList } = useContext(ConfigurationListContext) as ConfigurationListContextType;
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Start date</th>
                    <th>End date</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            { configList.map((config, index) => (
                <tr key={index}>
                    {Object.keys(config)
                        .filter((key) => (!['id'].includes(key)))
                        .map((field, index) => {
                            let fieldValue = config[field as keyof IConfig];
                            if (['startDate', 'endDate'].includes(field)) {
                                fieldValue = new Date(fieldValue).toISOString().substring(0, 10);
                            }
                            return (
                                <td key={index}>{fieldValue}</td>
                            )
                        }
                    )}
                    <td><button>Remove</button></td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default ConfigurationList;
