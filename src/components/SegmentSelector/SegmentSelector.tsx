import React, { useEffect, useRef, useState } from 'react';
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
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleClick = (event: MouseEvent) => {
        if (wrapperRef.current && wrapperRef.current.contains(event.target as Node)) return;
        setDropDown(false);
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, [])

    return (
        <div className="segmentSelector">
            <label htmlFor="">{label} segments</label>
            <div className="segmentSelector__button form-control" onClick={event => setDropDown(!isDropDownOpen)}>
                {(Object.keys(segments)
                    .filter((segment) => segments[segment] === prefix)
                    .map((segment) => parseInt(segment.replace('g', ''), 10))
                    .sort(((a, b) => a - b))
                    .join(', ')
                ) || 'Select segments'}
            </div>
            {isDropDownOpen && (
                <div className="dropdown-menu show" aria-labelledby="dropdownMenuButton">
                    <div className="segmentSelector__columns" ref={wrapperRef} id={`${prefix}__columns`}>
                        {Object.keys(segments).map((option, index) => (
                            <label key={index}
                                   className={`dropdown-item ${segments[option] === referenceName ? 'disabled' : ''}`}
                                   htmlFor={`${prefix}_${option}`}
                            >
                                <input
                                    type="checkbox"
                                    className='form-check-input'
                                    id={`${prefix}_${option}`}
                                    onChange={onChange}
                                    value={option}
                                    disabled={segments[option] === referenceName}
                                    checked={segments[option] === prefix}
                                />
                                <span>{option.replace('g', '')}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SegmentSelector;
