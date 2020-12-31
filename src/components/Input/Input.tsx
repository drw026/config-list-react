import React from 'react';

interface Input {
    name: string,
    label?: string,
    type?: string
}

const Input = ({ name, label, type = 'text' } : Input) => {
    const hasLabel = label ? <label htmlFor={ name }>{ label }</label> : '';
    return (
        <div>
            { hasLabel }
            <input className="form-control" type={type} name={ name }/>
        </div>
    );
}

export default Input;
