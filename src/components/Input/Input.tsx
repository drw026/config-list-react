import React from 'react';

interface Input {
    name: string,
    label?: string
}

const Input = ({ name, label } : Input) => {
    const hasLabel = label ? <label htmlFor={ name }>{ label }</label> : '';
    return (
        <div>
            { hasLabel }
            <input className="form-control" type="text" name={ name }/>
        </div>
    );
}

export default Input;
