// @ts-nocheck
import React, { Fragment } from 'react';
import formatDate from '../../utilities/formatDate';

const TableSubRow = ({ row }) => (
    <table className='table table-sm table-responsive table-borderless'>
        <tbody>
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
                {row.original.testSegments.map((test, index) => (
                    <Fragment key={index}>
                        <span className='badge badge-info'>{test}</span>{`\n`}
                    </Fragment>
                ))}
            </td>
        </tr>
        <tr>
            <td>Reference segments:</td>
            <td>
                {row.original.referenceSegments.map((test, index) => (
                    <Fragment key={index}>
                        <span className='badge badge-info'>{test}</span>{`\n`}
                    </Fragment>
                ))}
            </td>
        </tr>
        </tbody>
    </table>
)

export default TableSubRow;
