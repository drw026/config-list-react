import React from 'react';
import Input from '../Input/Input';

const AddConfiguration = () => (
    <form className="AppConfiguration">
        <div className="form-group">
            <Input name='input1' label='Input1' />
        </div>
        <div className="form-group">
            <Input name='input2' label='Input2'/>
        </div>
        <div className="form-group">
            <Input name='input3' label='Input3' />
        </div>
    </form>
);

export default AddConfiguration;
