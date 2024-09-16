import React, { useState } from "react";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

export default function BarraBusquedaInput({ onChangeValue, onSearchClick}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchIconClick = () => {
    setIsOpen(true);
  };

  const handleCloseIconClick = () => {
    setIsOpen(false);
    setSearchValue(""); // Limpiar el valor de búsqueda al cerrar
    onChangeValue("");
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
    onChangeValue(value); // Llama a la función onChangeValue con el nuevo valor de búsqueda
  };

  return (
    <Grid container alignItems="center" justifyContent="flex-end">
      <Grid item>
        {!isOpen && ( // Mostrar el icono de búsqueda solo si la barra de búsqueda está cerrada
          <IconButton
            onClick={handleSearchIconClick}
            style={{ color: "#007bff" }}
          >
            <SearchIcon />
          </IconButton>
        )}
        {isOpen && ( // Mostrar la barra de búsqueda solo si está abierta
          <TextField
            type="text"
            placeholder="Buscar..."
            value={searchValue}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <IconButton
                  className="search-icon"
                  onClick={() => {}}
                  style={{
                    color: "#007bff",
                  }}
                >
                  <SearchIcon />
                </IconButton>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    className="close-icon"
                    onClick={handleCloseIconClick}
                    style={{
                      color: "#007bff",
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
            style={{
              outline: "none",
              border: "none",
              height: "100%",
              width: "250px",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: "400",
              color: "#007bff",
              backgroundColor: "#fff",
              padding: "0 15px",
            }}
          />
        )}
      </Grid>
    </Grid>
  );
}
