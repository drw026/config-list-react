import React, {useContext} from 'react';
import { ConfigurationListContext } from "../../context/ConfigurationListContext";

const ConfigurationList: React.FC = () => {
    const { configList } = useContext(ConfigurationListContext) as ConfigurationListContextType;
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Test ID</th>
                    <th>Status</th>
                    <th>Start date</th>
                    <th>End date</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            { configList.map((config, index) => (
                <tr key={index}>
                    {Object.values(config).map((field, index) => (<td key={index}>{field}</td>))}
                    <td><button>Remove</button><button>Edit</button></td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default ConfigurationList;
