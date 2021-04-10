import React, {useEffect, useState} from 'react';
import Input from '../Input/Input';

type AppState = {
    title: string
    type: string
    testSegments: string[],
    referenceSegments: string[],
    file: File | null,
    activateOnUpload: boolean
}

type Segments = {
    [index: string]: string
}

const AddConfiguration = () => {
    const [formState, setFormState] = useState<AppState>({
        title: '',
        type: '',
        testSegments: [],
        referenceSegments: [],
        file: null,
        activateOnUpload: false
    });
    const [segments, setSegments] = useState<Segments>({
        g1: '', g2: '', g3: '', g4: '', g5: '', g6: '', g7: '', g8: '', g9: '', g10: '',
        g11: '', g12: '', g13: '', g14: '', g15: '', g16: '', g17: '', g18: '', g19: '', g20: ''
    });

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            title: event.target.value
        })
    }

    const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormState({
            ...formState,
            type: event.target.value
        })
    }

    const selectSegmentHandler = (type: string, segment: string) => {
        setSegments({
            ...segments,
            [segment]: type
        })
    }

    const fileInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;

        if (files) {
            setFormState({
                ...formState,
                file: files[0]
            })
        }
    }

    useEffect(() => {
        setFormState({
            ...formState,
            testSegments: Object.keys(segments).filter((segment) => (segments[segment] === 'test')),
            referenceSegments: Object.keys(segments).filter((segment) => (segments[segment] === 'reference'))
        })
    }, [segments]);

    return (
        <form className="addConfiguration">
            <div className="form-row">
                <div className="col-auto">
                    <Input name='title' type='text' onChange={inputHandler}/>
                </div>
                <div className="col-auto">
                    <select name='type' className="form-control" disabled={formState.title === ''} onChange={selectHandler}>
                        <option value="direction-markers">Direction Markers</option>
                        <option value="url-filters">URL filters</option>
                    </select>
                </div>
                <div className="col-auto">
                    <select name='type'
                            className="form-control"
                            multiple
                            disabled={formState.type === ''}
                            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                selectSegmentHandler((segments[event.target.value] ? '' : 'test'), event.target.value);
                    }}>
                        {Object.keys(segments).map((segment, index) => (
                            <option
                                key={index}
                                value={segment}
                                disabled={segments[segment] === 'reference'}>
                                {segment}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-auto">
                    <select name='type'
                            className="form-control"
                            multiple
                            disabled={formState.type === ''}
                            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                selectSegmentHandler((segments[event.target.value] ? '' : 'reference'), event.target.value);
                    }}>
                        {Object.keys(segments).map((segment, index) => (
                            <option
                                key={index}
                                value={segment}
                                disabled={segments[segment] === 'test'}>
                                {segment}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-auto">
                    <label htmlFor="file">
                        <Input name='uploadConfig' type='file' id="file"
                               onChange={fileInputHandler}
                               disabled={(formState.testSegments.length === 0 || formState.referenceSegments.length === 0)}
                        />
                    </label>
                </div>
                <div className="col-auto">
                    <div className="form-check mb-2">
                        <input type="checkbox" className="form-check-input" id="active-test" disabled={formState.file === null}/>
                        <label className="form-check-label" htmlFor="active-test">Activate on upload</label>
                    </div>
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary"
                        disabled={formState.file === null}>Add test</button>
                </div>
            </div>
        </form>
    )
};

export default AddConfiguration;
