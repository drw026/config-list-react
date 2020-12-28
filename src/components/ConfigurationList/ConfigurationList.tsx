import React, {useContext} from 'react';
import { ConfigurationListContext } from "../../context/ConfigurationListContext";

const ConfigurationList: React.FC = () => {
    const { configList } = useContext(ConfigurationListContext) as ConfigurationListContextType;
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>field1</th>
                    <th>field2</th>
                    <th>field3</th>
                    <th>controls</th>
                </tr>
            </thead>
            <tbody>
            { configList.map((config, index) => (
                <tr key={index}>
                    {Object.keys(config).map((field, index) => (<td key={index}>{field}</td>))}
                    <td><button>Remove</button><button>Edit</button></td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default ConfigurationList;
