import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import IconoPersonalizado from "../icon/IconoPersonalizado";
import "../../globals.css";

// Definir estilos utilizando Styled Components
const CustomTableContainer = styled(TableContainer)(({ theme }) => ({
  boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.2)",
  borderRadius: "2px",
  border: "1px solid #ccc",
  fontFamily: "var(--font-sans)",
}));

const ActionIconButton = styled(IconButton)`
  color: ${({ color }) => color || "inherit"};
`;

const CustomTableHead = styled(TableHead)`
  && {
    text-align: center;
    background-color: #424242;
    color: #000000;
    font-family: var(--font-mono); // Aplica la fuente para el encabezado
    .MuiTableCell-root {
      padding-right: 24px; /* Relleno entre columnas de al menos 32dp */
      padding-left: 24px;
    }
  }
`;

const CustomHeaderCell = styled(TableCell)`
  && {
    color: #ffffff;
  }
`;

const CustomTableRow = styled(TableRow)`
  && {
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
      background-color: #edf4fb !important;
      & > .MuiTableCell-root {
        color: #424242 !important;
      }
    }
    font-family: var(--font-sans); // Aplica la fuente para el cuerpo
  }
`;

const CustomPageNumberContainer = styled("div")`
  display: inline-block;
  width: 36px; /* Aumentamos el ancho para incluir el círculo */
  height: 36px; /* Aumentamos la altura para incluir el círculo */
  line-height: 36px; /* Centramos verticalmente el número */
  text-align: center;
  border-radius: 50%; /* Borde circular */
  background-color: #424242; /* Color de fondo del círculo */
  color: #fff; /* Color del texto */
  margin-right: 4px; /* Espacio entre los círculos */
  font-family: var(--font-serif);
`;

export default function Datatable({
  columns,
  rows,
  option,
  optionDeleteFunction,
  optionUpdateFunction,
  setSelectedRow,
  selectedRow,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <CustomTableContainer>
      <Table>
        <CustomTableHead>
          <TableRow>
            {columns.map((column, index) => (
              <CustomHeaderCell key={index}>
                {column.headerName}
              </CustomHeaderCell>
            ))}
            {option && <CustomHeaderCell>Opciones</CustomHeaderCell>}
          </TableRow>
        </CustomTableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <CustomTableRow
                key={index}
                onClick={() => {
                  setSelectedRow(row);
                }}
                className={selectedRow === row ? `is-selected` : ""}
              >
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    style={{
                      visibility: column.field === "id" ? "hidden" : "visible",
                    }}
                  >
                    {row[column.field]}
                  </TableCell>
                ))}
                {option && (
                  <TableCell>
                    <ActionIconButton
                      onClick={() => optionDeleteFunction(row.id)}
                      style={{ color: "red" }}
                    >
                      <IconoPersonalizado
                        icono={"borrar.png"}
                        width={32}
                        height={32}
                      />
                    </ActionIconButton>
                    <ActionIconButton
                      onClick={() => optionUpdateFunction(row.id)}
                      style={{ color: "green" }}
                    >
                      <IconoPersonalizado
                        icono={"lapiz.png"}
                        width={32}
                        height={32}
                      />
                    </ActionIconButton>
                  </TableCell>
                )}
              </CustomTableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
        nextIconButtonProps={{ style: { color: "#424242" } }}
        backIconButtonProps={{ style: { color: "#424242" } }}
        SelectProps={{
          MenuProps: {
            sx: {
              "& .MuiMenuItem-root": {
                color: "#424242",
                fontFamily: "var(--font-sans)",
              },
            },
          },
        }}
        style={{ color: "#424242" }} // Cambiar el color del texto "1-2 of 2"
        labelDisplayedRows={({ from, to, count }) =>
          Array.from({ length: Math.ceil(count / rowsPerPage) }, (_, index) => (
            <CustomPageNumberContainer key={index}>
              {index + 1}
            </CustomPageNumberContainer>
          ))
        }
      />
    </CustomTableContainer>
  );
}
