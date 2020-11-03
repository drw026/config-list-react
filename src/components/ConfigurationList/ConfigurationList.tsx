import React from 'react';

const ConfigurationList = () => {
    const configs = [
        {
            field1: 'field1',
            field2: 'field2',
            field3: 'field3'
        },
        {
            field1: 'field1',
            field2: 'field2',
            field3: 'field3'
        },
        {
            field1: 'field1',
            field2: 'field2',
            field3: 'field3'
        },
        {
            field1: 'field1',
            field2: 'field2',
            field3: 'field3'
        },
    ];

    return (
        <table className="table">
            <tr>
                <th>field1</th>
                <th>field2</th>
                <th>field3</th>
                <th>controls</th>
            </tr>
            { configs.map((config, index) => (
                <tr key={index}>
                    {Object.keys(config).map((field, index) => (<td key={index}>{field}</td>))}
                    <td><button>Remove</button><button>Edit</button></td>
                </tr>
            ))}
        </table>
    )
}

export default ConfigurationList;
