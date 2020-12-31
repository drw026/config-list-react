import React from 'react';
import Input from '../Input/Input';

const AddConfiguration = () => (
    <form className="AppConfiguration">
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text">Configurations uploader</span>
            </div>
            <Input name='uploadConfig' type='file' />
            <div className="input-group-append">
                <button className="btn btn-primary">Upload</button>
            </div>
        </div>
    </form>
);

export default AddConfiguration;
