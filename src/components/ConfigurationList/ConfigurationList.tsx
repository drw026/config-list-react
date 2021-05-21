// @ts-nocheck
import React, { useContext, useMemo, useCallback } from 'react';
import { useTable, useSortBy, useExpanded } from 'react-table';
import { Trash, Download, CaretDownFill, CaretRightFill } from 'react-bootstrap-icons';
import { ConfigurationListContext } from "../../context/ConfigurationListContext";
import formatDate from '../../utilities/formatDate';
import { removeTest, changeStatusTest } from '../../utilities/statusActions';

const COLUMNS = [
    {
        Header: () => null,
        id: 'expander',
        Cell: ({ row }) => (
            <button className='btn btn-sm' {...row.getToggleRowExpandedProps()}>
                {row.isExpanded ? <CaretDownFill/> : <CaretRightFill/> }
            </button>
        )
    },
    {
        Header: 'Title',
        accessor: 'title',
    },
    {
        Header: 'Type',
        accessor: 'type',
    },
    {
        Header: 'Status',
        accessor: 'status',
        Cell: (props) => {
            let classStatus = 'badge';

            if (props.value === 'Active') classStatus += ' badge-success'
            if (props.value === 'Ready' || props.value === 'Processing') classStatus += ' badge-warning'
            if (props.value === 'Failed') classStatus += ' badge-danger'
            if (props.value === 'Ended') classStatus += ' badge-light'

            return (<span className={classStatus}>{props.value}</span>)
        }
    },
    {
        Header: 'Start date',
        accessor: 'startDate',
        Cell: (props) => (props.value ? formatDate(props.value) : '-'),
    },
    {
        Header: 'End date',
        accessor: 'endDate',
        Cell: (props) => (props.value ? formatDate(props.value) : '-'),
    },
    {
        Header: () => null,
        id: 'statusActions',
        Cell: ({ row }) => {
            return (
                <>
                    {row.original.status === 'Ready' && (
                        <button className='btn btn-primary btn-sm'
                                onClick={() => changeStatusTest({ id: row.original.id, status: 1 })}
                        >Start</button>)}
                    {row.original.status === 'Active' && (
                        <button className='btn btn-primary btn-sm'
                                onClick={() => changeStatusTest({ id: row.original.id, status: 2 })}
                        >End</button>)}
                </>
            )
        }
    },
    {
        Header: () => null,
        id: 'actions',
        Cell: ({ row }) => {
            return (
                <div className='btn-group'>
                    <button className='btn btn-primary btn-sm' onClick={() => removeTest(row.original.id)}><Trash/></button>
                    <button className='btn btn-primary btn-sm'><Download /></button>
                </div>
            )
        }
    }
];

const ConfigurationList: React.FC = () => {
    const { configList } = useContext(ConfigurationListContext) as ConfigurationListContextType;
    const columns = useMemo(() => COLUMNS, []);

    const renderRowSubComponent = useCallback(
        ({ row }) => (
            <>
                <table className='table table-sm table-responsive'>
                    <tr>
                        <td>Test ID:</td>
                        <td>{row.original.id ? row.original.id : '-'}</td>
                    </tr>
                    <tr>
                        <td>Creation date:</td>
                        <td>{row.original.creationDate ? formatDate(row.original.creationDate) : '-'}</td>
                    </tr>
                    <tr>
                        <td>Test segments:</td>
                        <td>
                            {row.original.testSegments.map((test, index) => (<><span key={index} className='badge badge-info'>{test}</span>&nbsp;</>))}
                        </td>
                    </tr>
                    <tr>
                        <td>Reference segments:</td>
                        <td>
                            {row.original.referenceSegments.map((test, index) => (<><span key={index} className='badge badge-info'>{test}</span>&nbsp;</>))}
                        </td>
                    </tr>
                </table>
            </>
        ),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        rows,
        prepareRow,
        headerGroups,
        visibleColumns,
    } = useTable(
        {
            data: configList,
            columns,
            initialState: {
                sortBy: [{ id: 'startDate', desc: true }]
            }
        },
        useSortBy,
        useExpanded
    )

    return (configList.length > 0
        ? (
            <>
                <table className="table table-bordered table-hover" {...getTableProps()}>
                    <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <>
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                                {row.isExpanded ? (
                                    <tr>
                                        <td colSpan={visibleColumns.length}>
                                            {renderRowSubComponent({ row })}
                                        </td>
                                    </tr>
                                ) : null}
                            </>
                        )
                    })}
                    </tbody>
                </table>
            </>
        )
        : (
            <div className='container'>
                <div className="alert alert-warning">No tests to display. Add tests by using the form.</div>
            </div>
        )
    );
}

export default ConfigurationList;
