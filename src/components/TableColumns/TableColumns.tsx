// @ts-nocheck
import React from 'react';
import {CaretDownFill, CaretRightFill, Download, Trash} from 'react-bootstrap-icons';
import formatDate from '../../utilities/formatDate';
import {changeStatusTest, removeTest} from '../../utilities/statusActions';

const TableColumns = [
    {
        Header: () => null,
        id: 'expander',
        width: 5,
        Cell: ({ row }) => (
            <span {...row.getToggleRowExpandedProps()}>
                {row.isExpanded ? <CaretDownFill/> : <CaretRightFill/> }
            </span>
        )
    },
    {
        Header: 'Title',
        accessor: 'title',
        width: 35,
    },
    {
        Header: 'Type',
        accessor: 'type',
        width: 15,
    },
    {
        Header: 'Status',
        accessor: 'status',
        width: 8,
        Cell: (props) => {
            let classStatus = 'badge';

            if (props.value === 'Active') classStatus += ' badge-success'
            if (props.value === 'Processing') classStatus += ' badge-info'
            if (props.value === 'Ready') classStatus += ' badge-warning'
            if (props.value === 'Failed') classStatus += ' badge-danger'
            if (props.value === 'Ended') classStatus += ' badge-secondary'

            return (<span className={classStatus}>{props.value}</span>)
        }
    },
    {
        Header: 'Start date',
        accessor: 'startDate',
        width: 10.5,
        Cell: (props) => (props.value ? formatDate(props.value) : '-'),
    },
    {
        Header: 'End date',
        accessor: 'endDate',
        width: 10.5,
        Cell: (props) => (props.value ? formatDate(props.value) : '-'),
    },
    {
        Header: () => null,
        id: 'statusActions',
        width: 5,
        Cell: ({ row }) => {
            return (
                <>
                    {row.original.status === 'Ready' && (
                        <button className='btn btn-primary btn-sm btn-block'
                                onClick={() => changeStatusTest({ id: row.original.id, status: 1 })}
                        >Start</button>)}
                    {row.original.status === 'Active' && (
                        <button className='btn btn-primary btn-sm btn-block'
                                onClick={() => changeStatusTest({ id: row.original.id, status: 2 })}
                        >End</button>)}
                </>
            )
        }
    },
    {
        Header: () => null,
        id: 'actions',
        width: 10.5,
        Cell: ({ row }) => {
            return (
                <>
                    <button className='btn btn-primary btn-sm' onClick={() => removeTest(row.original.id)}><Trash size={20} /></button>{'\n'}
                    <button className='btn btn-primary btn-sm'><Download size={20} /></button>
                </>
            )
        }
    }
];

export default TableColumns;
