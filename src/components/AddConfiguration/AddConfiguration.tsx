import React, {useEffect, useState} from 'react';
import Input from '../Input/Input';
import SegmentSelector from "../SegmentSelector/SegmentSelector";

type FormState = {
    title: string
    type: string
    testSegments: number[],
    referenceSegments: number[],
    file: File | null,
    activateOnUpload: boolean
}

export type Segments = {
    [index: string]: string
}

const AddConfiguration = () => {
    const [formState, setFormState] = useState<FormState>({
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

    const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formState);

        setFormState({
           title: '',
           type: '',
           testSegments: [],
           referenceSegments: [],
           file: null,
           activateOnUpload: false
        });
    }

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

    const formatSegments = (segments: Segments, filter: string) => (
        Object.keys(segments)
            .filter((segment) => (segments[segment] === filter))
            .map((segment) => parseInt(segment.replace('g', ''), 10))
    )

    useEffect(() => {
        setFormState({
            ...formState,
            testSegments: formatSegments(segments, 'test'),
            referenceSegments: formatSegments(segments, 'reference')
        })
    }, [segments]);

    return (
        <form className="addConfiguration" onSubmit={submitHandler}>
            <div className="form-row">
                <div className="col-12">
                    <Input name='title' type='text' onChange={inputHandler} label='Title'/>
                </div>
            </div>
            <div className="form-row">
                <div className="col-md-4">
                    <label htmlFor="type">Type</label>
                    <select defaultValue={''} id='type' name='type' className="form-control" disabled={formState.title === ''} onChange={selectHandler}>
                        <option value="" disabled>Choose type</option>
                        <option value="direction-markers">Direction Markers</option>
                        <option value="url-filters">URL filters</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <SegmentSelector
                        segments={segments}
                        prefix='test'
                        label='Test'
                        referenceName='reference'
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            console.log(segments[event.target.value]);
                            selectSegmentHandler((segments[event.target.value] ? '' : 'test'), event.target.value);
                        }}
                    />
                </div>
                <div className="col-md-4">
                    <SegmentSelector
                        segments={segments}
                        prefix='reference'
                        label='Reference'
                        referenceName='test'
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            selectSegmentHandler((segments[event.target.value] ? '' : 'reference'), event.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="col-auto">
                    <label className=
                               {(formState.testSegments.length === 0 || formState.referenceSegments.length === 0)
                               ? "form-control file-label--disabled"
                               : "form-control"}>
                        <input name="uploadConfig"
                               type="file"
                               id="file"
                               className="file-input"
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
                    <button className="btn btn-primary" type="submit"
                        disabled={formState.file === null}>Add test</button>
                </div>
            </div>
        </form>
    )
};

export default AddConfiguration;
