import React, {useState} from 'react';
import { Segments } from '../AddConfiguration/AddConfiguration';

interface ISegmentSelector {
    label: string
    prefix: string
    segments: Segments
    referenceName: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SegmentSelector = ({ label, prefix, segments, referenceName, onChange }: ISegmentSelector) => {
    const [isDropDownOpen, setDropDown] = useState(false);

    const toggleDropDown = () => {
        setDropDown(!isDropDownOpen);
    }

    return (
        <div className="segmentSelector">
            <label htmlFor="">{label} segments</label>
            <div className="segmentSelector__button form-control" onClick={toggleDropDown}>
                {(Object.keys(segments)
                    .filter((segment) => segments[segment] === prefix)
                    .map((segment) => parseInt(segment.replace('g', ''), 10))
                    .sort(((a, b) => a - b))
                    .join(', ')
                ) || 'Select segments'}
            </div>
            <div className={isDropDownOpen ? 'dropdown-menu show' : 'dropdown-menu'} aria-labelledby="dropdownMenuButton">
                {Object.keys(segments).map((option, index) => (
                    <label key={index}
                           className={segments[option] === referenceName ? 'dropdown-item disabled' : 'dropdown-item'}
                           htmlFor={`${prefix}_${option}`}
                    >
                        <input
                            type="checkbox"
                            className='form-check-input'
                            id={`${prefix}_${option}`}
                            onChange={onChange}
                            value={option}
                            disabled={segments[option] === referenceName}
                        />
                        <span>{option.replace('g', '')}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}

export default SegmentSelector;
