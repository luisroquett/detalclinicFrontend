import React, { useState } from "react";
import "./DataListTable.scss";
import { TablePagination } from "../../components";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

export default function DataListTable({
  data,
  title = "Data",
  headers,
  attributes,
  onChange,
  pagination = null,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Calcular el índice inicial y final de los elementos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar a la página siguiente
  const nextPage = () => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Cambiar a la página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Función de cambio de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="DataListTable">
      <div style={{ overflowX: "auto" }}>
        <div className="mobileTableTitle">{title}</div>
        <MDBTable
          striped
          hover
          className="bg-success bg-gradient rounded-3 bg-opacity-25 custom-table"
        >
          <MDBTableHead>
            <tr colSpan={headers.length}>
              <th>
                <div className="tableTitle">{title}</div>
              </th>
            </tr>
            <tr>
              {headers.map((th, index) => (
                <th scope="col" key={index}>
                  {th}
                </th>
              ))}
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {currentData.map((d) => (
              <tr
                scope="row"
                data-data-id={d.id}
                onClick={onChange}
                key={d.id}
              >
                {attributes.map((attr, index) => (
                  <td data-label={headers[index]} key={index}>
                    {d[attr] ? d[attr] : "No definido"}
                  </td>
                ))}
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </div>
      {pagination && (
        <TablePagination
          page={currentPage}
          count={data.length}
          totalPages={Math.ceil(data.length / itemsPerPage)}
          limit={itemsPerPage}
          onChange={handlePageChange}
          onNextPage={nextPage}
          onPrevPage={prevPage}
        />
      )}
    </div>
  );
}
