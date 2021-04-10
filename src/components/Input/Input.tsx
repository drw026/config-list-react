import React from 'react';

interface Input {
    name: string,
    disabled?: boolean
    label?: string,
    type?: string
    id?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ name, label, type = 'text', id, onChange, disabled = false } : Input) => {
    const hasLabel = label ? <label htmlFor={ name }>{ label }</label> : '';
    return (
        <div>
            { hasLabel }
            <input
                className="form-control"
                type={type}
                name={ name }
                id={id ? id : ''}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    );
}

export default Input;
