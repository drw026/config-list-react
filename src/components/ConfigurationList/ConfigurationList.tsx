// @ts-nocheck
import React, { useContext, useMemo, useCallback, Fragment } from 'react';
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
            if (props.value === 'Ready') classStatus += ' badge-warning'
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
                <ul>
                    <li>Creation date: {formatDate(row.original.creationDate)}</li>
                    <li>
                        Test segments: {row.original.testSegments.map((test) => (<span className='badge badge-pill badge-info'>{test}</span>))}
                    </li>
                    <li>
                        Reference segments: {row.original.referenceSegments.map((test) => (<span className='badge badge-pill badge-info'>{test}</span>))}
                    </li>
                </ul>
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

    return (
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
                        <Fragment {...row.getRowProps()}>
                            <tr>
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
                        </Fragment>
                    )
                })}
                </tbody>
            </table>

        </>
    )
}

export default ConfigurationList;
