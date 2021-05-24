// @ts-nocheck
import React, { useContext, useMemo, useCallback, Fragment } from 'react';
import { useTable, useSortBy, useExpanded } from 'react-table';
import { ConfigurationListContext } from "../../context/ConfigurationListContext";
import TableColumns from '../TableColumns/TableColumns';
import TableSubRow from '../TableSubRow/TableSubRow';

const ConfigurationList: React.FC = () => {
    const { configList, isConfigListLoading } = useContext(ConfigurationListContext) as ConfigurationListContextType;
    const Columns = useMemo(() => TableColumns, []);
    const SubRow = useCallback(TableSubRow, []);

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
            columns: Columns,
            initialState: {
                sortBy: [{ id: 'startDate', desc: true }]
            }
        },
        useSortBy,
        useExpanded
    )

    return (isConfigListLoading
        ? (
            <div className='container'>
                Loading...
            </div>
        )
        : (configList.length > 0 &&
            <table className="table table-bordered table-hover" {...getTableProps()}>
                <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, index) => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <Fragment key={i}>
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps({
                                        style: {
                                            width: `${cell.column.width}%`
                                        }
                                    })}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                            {row.isExpanded ? (
                                <tr>
                                    <td colSpan={visibleColumns.length}>
                                        {SubRow({ row })}
                                    </td>
                                </tr>
                            ) : null}
                        </Fragment>
                    )
                })}
                </tbody>
            </table>
        )
    );
}

export default ConfigurationList;
