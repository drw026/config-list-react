import React from 'react';

interface Input {
    name: string
    value: string
    disabled?: boolean
    label?: string
    type?: string
    id?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ name, value, label, type = 'text', id, onChange, disabled = false } : Input) => {
    const hasLabel = label ? <label htmlFor={ name }>{ label }</label> : '';
    return (
        <div className='form-group'>
            { hasLabel }
            <input
                className="form-control"
                type={type}
                name={ name }
                id={id ? id : ''}
                onChange={onChange}
                disabled={disabled}
                value={value}
            />
        </div>
    );
}

export default Input;
