// @ts-nocheck
import React, { useContext, useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { ConfigurationListContext } from "../../context/ConfigurationListContext";

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
    },
    {
        Header: 'Start date',
        accessor: 'startDate',
    },
    {
        Header: 'End date',
        accessor: 'endDate'
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
