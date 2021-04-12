import React from "react";

type Options = {
    [index: string]: string
}

interface SegmentSelect {
    name: string
    disabled: boolean
    optionList: Options
    referenceName: string
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const SegmentSelect = ({name, disabled, optionList, referenceName, onChange}: SegmentSelect) => {
    return (
        <select name={name}
                className="form-control"
                multiple
                disabled={disabled}
                onChange={onChange}>
            {Object.keys(optionList).map((option, index) => (
                <option
                    key={index}
                    value={option}
                    disabled={optionList[option] === referenceName}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default SegmentSelect;
