// @ts-nocheck
import React, { useContext, useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { Trash } from 'react-bootstrap-icons';
import { ConfigurationListContext } from "../../context/ConfigurationListContext";

const removeTest = (id) => {
    fetch(`http://localhost:3000/tests/${id}`,
        {
            method: 'DELETE'
        }
    ).then(data => {
       console.log(data);
    });
}

const changeStatusTest = ({ id, status }) => {
    fetch(`http://localhost:3000/tests/${id}/status`,
        {
            method: 'PATCH',
            body: status
        }
    )
}

const COLUMNS = [
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
            if (props.value === 'Ready for activation') classStatus += ' badge-warning'
            if (props.value === 'Failed') classStatus += ' badge-danger'
            if (props.value === 'Ended') classStatus += ' badge-light'

            return (<span className={classStatus}>{props.value}</span>)
        }
    },
    {
        Header: 'Start date',
        accessor: 'startDate',
        Cell: (props) => (props.value ? new Date(props.value).toISOString().substring(0, 10) : '-'),
    },
    {
        Header: 'End date',
        accessor: 'endDate',
        Cell: (props) => (props.value ? new Date(props.value).toISOString().substring(0, 10) : '-'),
    },
    {
        Header: () => null,
        id: 'statusActions',
        Cell: ({ row }) => {
            return (
                <>
                    {row.original.status === 'Ready for activation' && (
                        <button className='btn btn-light'
                                onClick={() => changeStatusTest({ id: row.original.id, status: 1 })}
                        >Activate</button>)}
                    {row.original.status === 'Active' && (
                        <button className='btn btn-light'
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
                <>
                    <button className='btn btn-light' onClick={() => removeTest(row.original.id)}><Trash/></button>
                </>
            )
        }
    }
];

const ConfigurationList: React.FC = () => {
    const { configList } = useContext(ConfigurationListContext) as ConfigurationListContextType;
    const columns = useMemo(() => COLUMNS, []);

    const {
        getTableProps,
        getTableBodyProps,
        rows,
        prepareRow,
        headerGroups
    } = useTable(
        {
            data: configList,
            columns
        },
        useSortBy
    )

    return (
        <>
            <table className="table" {...getTableProps()}>
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
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    )
}

export default ConfigurationList;
