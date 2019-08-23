import React from 'react'
import styled from 'styled-components'

import { useTable, usePagination, useExpanded, useTableState } from 'react-table'

const Wrapper = styled.div.attrs(() => ({
}))`
  table {
    width: 100%;
    color: #12263f;
    border-collapse: collapse;
    box-sizing: border-box;

    vertical-align: middle;

    th {
      font-size: .625rem;
      background-color: #f9fbfd;
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: .08em;
      color: #95aac9;
      vertical-align: bottom;
      border-top: 1px solid #edf2f9;
      border-bottom: 1px solid #edf2f9;
      white-space: nowrap;
      padding: .9375rem;
    }

    tbody {
      font-size: .8125rem;

      td {
        white-space: nowrap;
            padding: .9375rem;
            vertical-align: top;
    border-top: 1px solid #edf2f9;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

function Table({ columns, data, renderRowSubComponent }) {
  const tableState = useTableState({ pageIndex: 0 })

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: [{ expanded, pageIndex, pageSize }],
  } = useTable(
    {
      columns,
      data,
      state: tableState,
    },
    useExpanded,
    usePagination,
  )

  return (
    <Wrapper>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {page.map(
            (row, i) =>
              prepareRow(row) || (
                <React.Fragment>
                  <tr key={i} {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      )
                    })}
                  </tr>
                  {row.isExpanded ? (
                    <tr>
                      <td colSpan={columns.length}>
                        {/*
                          Inside it, call our renderRowSubComponent function. In reality,
                          you coul pass whatever you want as props to
                          a component like this, including the entire
                          table instance. But for this example, we'll just
                          pass the row
                        */}
                        {renderRowSubComponent({ row })}
                      </td>
                    </tr>
                  ) : null}
                </React.Fragment>
              )
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </Wrapper>
  )
}

export default Table
