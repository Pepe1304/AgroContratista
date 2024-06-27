"use client";

import { useEffect, useRef, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid as MuiDataGrid } from "@mui/x-data-grid";
import BarraBusquedaInput from "../../components/searchBar/BarraBusquedaInput";
import {Box, Button, Dialog, DialogContent, DialogTitle,FormControl,FormHelperText,Grid,IconButton,InputLabel,MenuItem,Select,TextField, Typography,} from "@mui/material";
import { validateField, validateForm } from "../../../utiles/validarFormFields";
import Datatable from "../../components/table/DataTable";

const Establecimientos = (onSearchChange, onAddClick) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [filteredRows, setFilteredRows] = useState([]);
  const DataGrid = MuiDataGrid;
  const [establecimientoId, setEstablecimientoId] = useState<string>("");
  const [estadoModal, setEstadoModal] = useState<"add" | "update">("add");
  const [selectedEstablecimientoId, setSelectedEstablecimientoId] = useState(null);

  const handleEstablecimientoSelect = (establecimientoId) => {
    setSelectedEstablecimientoId(establecimientoId);

    const selectedEstablecimiento = rows.find(
      (row) => row.id === establecimientoId
    );
    if (selectedEstablecimiento) {
      setFormData({
        establecimientoNombre: selectedEstablecimiento.nombre,
        establecimientoPropietario: selectedEstablecimiento.propietario,
        establecimientoLocalidad: selectedEstablecimiento.localidad,
        establecimientoProvincia: selectedEstablecimiento.provincia,
        establecimientoCoordenadas: selectedEstablecimiento.coordenadas,
        establecimientoSuperficie: selectedEstablecimiento.superficie,
        establecimientoParcelas: selectedEstablecimiento.parcela,
      });
    }
  };

  const [formData, setFormData] = useState({
    establecimientoNombre: "",
    establecimientoPropietario: "",
    establecimientoLocalidad: "",
    establecimientoProvincia: "",
    establecimientoCoordenadas: "",
    establecimientoSuperficie: "",
    establecimientoParcelas: "",
  });

  const [error, setError] = useState<
    { [fieldName: string]: any } | undefined
  >();

  const provincias = [
    "Buenos Aires",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Córdoba",
    "Corrientes",
    "Entre Ríos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuquén",
    "Río Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego",
    "Tucumán",
  ];

  const handleOpenAdd = () => {
    setEstadoModal("add");
    clearFrom();
    setOpen(true);
  };

  const clearFrom = () => {
    setFormData({
      establecimientoNombre: "",
      establecimientoPropietario: "",
      establecimientoLocalidad: "",
      establecimientoProvincia: "",
      establecimientoCoordenadas: "",
      establecimientoSuperficie: "",
      establecimientoParcelas: "",
    });
    setError({});
  };

  const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      width: 285,
      headerClassName: "custom-header",
    },
    {
      field: "dueño",
      headerName: "Dueño",
      width: 285,
      headerClassName: "custom-header",
    },
    {
      field: "lugar",
      headerName: "Lugar",
      width: 285,
      headerClassName: "custom-header",
    },
    {
      field: "coordenadasEstablecimiento",
      headerName: "Coordenadas",
      width: 165,
      headerClassName: "custom-header",
    },
    {
      field: "superficieEstablecimiento",
      headerName: "Superficie",
      width: 165,
      headerClassName: "custom-header",
    },

    {
      field: "parcelas",
      headerName: "Parcelas",
      width: 275,
      headerClassName: "custom-header",
    },
    {
      field: "tipoEstablecimiento",
      headerName: "Tipo",
      width: 140,
      headerClassName: "custom-header",
    },
  ];

  const handleSearchClick = () => {
    setIsSearchBarOpen(!isSearchBarOpen);
  };

  const handleClickClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setError((prevFormData) => ({
      ...prevFormData,
      [name]: undefined,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  /*AGREGAR AGRICULTOR/GANADERO*/
  const handleAddEstablecimiento = async () => {
    const lugar = `${formData.establecimientoLocalidad} - ${formData.establecimientoProvincia}`;
    const nuevoEstablecimiento = {
      nombre: formData.establecimientoNombre,
      dueño: formData.establecimientoPropietario,
      lugar: lugar,
      coordenadas: formData.establecimientoCoordenadas,
      superficie: formData.establecimientoSuperficie,
      parcelas: formData.establecimientoParcelas,
    };

    const errors = validateForm(formData, {
      establecimientoNombre: {
        valid: (v: string) => /^[a-zA-Z\s.Ññ]+$/.test(v),
        error: "Introdroduzca su Nombre del Establecimiento",
      },
      establecimientoDueño: {
        valid: (v: string) => /^[a-zA-Z0-9\s.Ññ]*$/.test(v),
        error: "Seleccione al Dueño",
      },
      establecimientoLocalidad: {
        valid: (v: string) => /^[a-zA-Z\s]+$/.test(v),
        error: "Introdroduzca su Localidad",
      },
      establecimientoProvincia: {
        valid: (v: string) => /[a-zA-Z]+(?:\s{0,1}[a-zA-Z]+)*$/g.test(v),
        error: "Seleccione la Provincia",
      },

      establecimientoCoordenadas: {
        valid: (v: string) =>/[0-9]+(?:\s{0,1}[0-9]+)*$|^(\d{1,3})°(\d{1,2})'(\d{1,2}\.\d{1})"([NS])\s(\d{1,3})°(\d{1,2})'(\d{1,2}\.\d{1})"([WE])$/.test( v),
        error: "Introdroduzca las Coordenadas",
      },
      establecimientoSuperficie: {
        valid: (v: string) => /^[0-9]+$/.test(v),
        error: "Introdroduzca la Superficie",
      },

      establecimientoParcelas: {
        valid: (v: string) => /[a-zA-Z]+(?:\s{0,1}[a-zA-Z]+)*$/g.test(v),
        error: "Seleccione la Parcelas",
      },
    });

    console.log(errors);
    if (errors) {
      setError(errors);
      return;
    }

    // Mostrar cada dato individual en la consola
    console.log("Nombre:", nuevoEstablecimiento.nombre);
    console.log("Dueño:", nuevoEstablecimiento.dueño);
    console.log("Coordenadas:", nuevoEstablecimiento.coordenadas);
    console.log("MaiSuperficiel:", nuevoEstablecimiento.superficie);
    console.log("Lugar:", lugar);
    console.log("Parcelas:", nuevoEstablecimiento.parcelas);

    try {
      const res = await fetch("http://localhost:8080/api/establecimiento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoEstablecimiento),
      });
      // Verificar si la solicitud de guardado fue exitosa
      if (!res.ok) {
        throw new Error("Error al guardar el establecimiento");
      }

      clearFrom();
      const dataClientes = await fetchEstablecimientos();
      setRows(dataClientes);
      setOpen(false);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  /*CARGAR ESTABLECIMIENTO EN EL DATAGRID*/
  const fetchEstablecimientos = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/establecimiento");
      if (!res.ok) {
        throw new Error("Error al obtener los establecimientos");
      }
      const dataEstablecimientos = await res.json();
      return dataEstablecimientos;
    } catch (error) {
      console.error("Error en la solicitud:", error);
      // Devolver un valor predeterminado en caso de error
      return [];
    }
  };

  useEffect(() => {
    const getData = async () => {
      const dataEstablecimientos = await fetchEstablecimientos();
      setRows(dataEstablecimientos);
    };

    getData();
  }, []);

  /*BUSCAR ESTABLECIMIENTO*/
  const handleSearhEstablecimiento = async (value) => {
    const filteredData = rows.filter((row) => {
      // Filtra las filas según el valor de búsqueda
      return (
        row.nombre.toLowerCase().includes(value.toLowerCase()) ||
        row.propietario.toLowerCase().includes(value.toLowerCase()) ||
        row.lugar.toLowerCase().includes(value.toLowerCase()) ||
        row.coordenadas.toLowerCase().includes(value.toLowerCase()) ||
        row.superficie.toLowerCase().includes(value.toLowerCase()) ||
        row.parcelas.toLowerCase().includes(value.toLowerCase()) ||
        row.tipo.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredRows(filteredData);
  };

  /*ELIMINAR ESTABLECIMIENTOS*/
  const handleDeleteEstablecimiento = async (id) => {
    console.log("Cliente a eliminar:", id);

    try {
      const res = await fetch(
        `http://localhost:8080/api/establecimiento/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        console.log("Establecimiento eliminado exitosamente.");
        // Actualizar el estado de las filas después de eliminar un cliente
        const dataClientes = await fetchEstablecimientos();
        setRows(dataClientes);
      } else {
        console.error("Error al eliminar el establecimiento:", id);
      }
    } catch (error) {
      console.error("Error en la solicitud de eliminación:", error);
    }
  };

  /*CLICK BOTON MODIFICAR(LAPIZ)*/
  const handleEdit = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/establecimiento/${id}`,
        {
          method: "GET",
        }
      );

      if (res.ok) {
        console.log("Establecimiento obtenido exitosamente.");

        const establecimiento = await res.json();

        setFormData({
          establecimientoNombre: establecimiento.nombre,
          establecimientoPropietario: establecimiento.propietario,
          establecimientoLocalidad: establecimiento.lugar
            .split(" - ")[0]
            .trim(),
          establecimientoProvincia: establecimiento.lugar
            .split(" - ")[1]
            .trim(),
          establecimientoCoordenadas: establecimiento.coordenadas,
          establecimientoSuperficie: establecimiento.superficie,
          establecimientoParcelas: establecimiento.parcelas,
        });
      } else {
        console.error("Error al modificar el establecimiento:", id);
      }
    } catch (error) {
      console.error("Error en la solicitud de eliminación:", error);
    }

    setEstadoModal("update");
    setOpen(true);
  };

  /*MODIFICAR AGRICULTOR/GANADERO PARA GAURDAR*/
  const handleUpdateEstablecimiento = async () => {
    if (!selectedRow) return;
    const lugar = `${formData.establecimientoLocalidad} - ${formData.establecimientoProvincia}`;
    const nuevoEStablecimiento = {
      id: selectedRow.id,
      nombre: formData.establecimientoNombre,
      dueño: formData.establecimientoPropietario,
      lugar: lugar,
      coordenadas: formData.establecimientoCoordenadas,
      superficie: formData.establecimientoSuperficie,
      parcelas: formData.establecimientoParcelas,
    };

    // Mostrar cada dato individual en la consola
    // console.log("Id:", nuevaPersona.id);
    console.log("Razón Social:", nuevoEStablecimiento.nombre);
    console.log("Dirección:", nuevoEStablecimiento.dueño);
    console.log("Lugar:", lugar);
    console.log("Coordenadas:", nuevoEStablecimiento.coordenadas);
    console.log("MaiSuperficie:", nuevoEStablecimiento.superficie);
    console.log("Parcela:", nuevoEStablecimiento.parcelas);

    try {
      const res = await fetch(`http://localhost:8080/api/establecimiento`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoEStablecimiento),
      });
      // Verificar si la solicitud de guardado fue exitosa
      if (!res.ok) {
        throw new Error("Error al guardar el cliente");
      }

      // Actualizar el estado rows
      const updatedRows = rows.map((row) => {
        if (row.id === nuevoEStablecimiento.id) {
          return nuevoEStablecimiento; // Actualizar el cliente modificado
        }
        return row;
      });
      setRows(updatedRows);
      clearFrom();
      setOpen(false);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const selectProvinciaRef = useRef(null);
  const handleLocalidadKeyDown = (event) => {
    if (event.key === "Enter") {
      selectProvinciaRef.current.focus();
    }
  };

  const handleProvinciaChange = (event) => {
    handleInputChange(event);
    setTimeout(() => {
      //selectCondIvaRef.current.focus();
    }, 0);
  };

  return (
    <>
      <div style={{ border: "1px solid #D3D3D3", padding: "20px", marginTop: "20px", boxSizing: "border-box", backgroundColor: "#4CAF50",}}>
        <h6 style={{marginBottom: 0,fontSize: "18px",marginTop: "3px", display: "inline-block", fontWeight: 700, color: "#fff",}}>
          Establecimiento Agricola
        </h6>
      </div>
      <div style={{border: "1px solid #D3D3D3",padding: "20px",borderRadius: "5px", marginTop: "20px", backgroundColor: "#FFFAFA",}}>
        <div style={{ display: "flex",flexDirection: "column", marginBottom: "20px", }}>
          {/* Panel de Busqueda Establecimientos y Boton Agregar Establecimientos */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginBottom: "15px",
            }}
          >
            <div style={{ marginRight: "25px" }}>
              <BarraBusquedaInput
                onChangeValue={handleSearhEstablecimiento}
                onSearchClick={handleSearchClick}
              />
            </div>
            <Button
              variant="contained"
              size="large"
              onClick={handleOpenAdd}
              style={{ backgroundColor: "#0FB60B", color: "#ffffff" }}
            >
              <AddOutlinedIcon />
            </Button>
          </div>
          <Dialog
            open={open}
            onClose={handleClickClose}
            maxWidth={false} // Desactiva el tamaño máximo predefinido
            PaperProps={{
              sx: {
                width: "950px", // Ajusta este valor según tus necesidades
                maxWidth: "none", // Asegúrate de que no se aplique ningún ancho máximo
              },
            }}
          >
            <DialogTitle>
              {estadoModal === "add"
                ? "Agregar Establecimiento"
                : "Editar Establecimiento"}
              <IconButton
                aria-label="close"
                onClick={() => handleClickClose(null, "closeButtonClick")}
                sx={{ position: "absolute", right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <Box component="form" onSubmit={handleSubmit}>
              <DialogContent>
                <Grid container spacing={2} style={{ padding: "0 24px" }}>
                  {/* IDENTIFICACION */}
                  <Grid
                    item
                    xs={12}
                    style={{ marginTop: "25px", paddingBottom: "25px" }}
                  >
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={12}>
                        <Typography
                          variant="subtitle1"
                          color={"textSecondary"}
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          Identificación
                        </Typography>
                      </Grid>
                      <Grid item xs={5}>
                        <TextField
                          label="Nombre"
                          variant="outlined"
                          id="nombre"
                          name="establecimientoNombre"
                          type="text"
                          error={validateField(error, "establecimientoNombre")}
                          helperText={validateField( error, "establecimientoNombre")}
                          fullWidth
                          required
                          onChange={handleInputChange}
                          value={formData.establecimientoNombre}
                          disabled={estadoModal === "update"}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <TextField
                          label="Arrendador/Arrendatario"
                          variant="outlined"
                          id="arrendadorArrendatario"
                          name="establecimientoPropietario"
                          type="text"
                          error={validateField( error, "establecimientoPropietario")}
                          helperText={validateField( error,"establecimientoPropietario")}
                          fullWidth
                          required
                          onChange={handleInputChange}
                          value={formData.establecimientoPropietario}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          variant="contained"
                          size="large"
                          onClick={handleOpenAdd}
                          style={{
                            backgroundColor: "#0FB60B",
                            color: "#ffffff",
                            marginLeft: "5px",
                          }}
                        >
                          <AddOutlinedIcon />
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* LUGAR */}
                  <Grid
                    item
                    xs={12}
                    style={{ margin: "8px 0", padding: "8px" }}
                  >
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Typography
                          variant="subtitle1"
                          color={"textSecondary"}
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          Lugar
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Localidad"
                          variant="outlined"
                          id="localidad"
                          name="establecimientoLocalidad"
                          type="text"
                          error={validateField( error, "establecimientoLocalidad" )}
                          helperText={validateField( error,"establecimientoLocalidad")}
                          fullWidth
                          required
                          onChange={handleInputChange}
                          onKeyDown={handleLocalidadKeyDown}
                          value={formData.establecimientoLocalidad}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormControl
                          fullWidth
                          error={validateField( error,"establecimientoProvincia" )}>
                          <InputLabel id="demo-simple-select-label">
                            Provincias
                          </InputLabel>
                          <Select
                            label="Provincias"
                            id="provincias"
                            name="establecimientoProvincia"
                            labelId="demo-simple-select-label"
                            fullWidth
                            value={formData.establecimientoProvincia}
                            onChange={handleProvinciaChange}
                            inputRef={selectProvinciaRef}
                          >
                            {provincias.map((provincia) => (
                              <MenuItem key={provincia} value={provincia}>
                                {provincia}
                              </MenuItem>
                            ))}
                          </Select>
                          {error && (
                            <FormHelperText>
                              {validateField(error, "establecimientoProvincia")}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* UBICACION */}
                  <Grid
                    item
                    xs={12}
                    style={{ margin: "8px 0", padding: "8px" }}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12}>
                        <Typography
                          variant="subtitle1"
                          color="textSecondary"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          Ubicación
                        </Typography>
                      </Grid>
                      <Grid item xs={10} sm={4}>
                        <TextField
                          label="Coordenadas"
                          variant="outlined"
                          id="coordenadas"
                          name="establecimientoCoordenadas"
                          type="text"
                          error={validateField( error,"establecimientoCoordenadas")}
                          helperText={validateField( error, "establecimientoCoordenadas" )}
                          fullWidth
                          required
                          onChange={handleInputChange}
                          onKeyDown={handleLocalidadKeyDown}
                          value={formData.establecimientoCoordenadas}
                        />
                      </Grid>
                      <Grid item xs={2} sm={1}>
                        <Button
                          variant="contained"
                          size="large"
                          onClick={handleOpenAdd}
                          style={{
                            backgroundColor: "#0FB60B",
                            color: "#ffffff",
                            marginRight: "5px",
                          }}
                        >
                          <AddOutlinedIcon />
                        </Button>
                      </Grid>
                      <Grid item xs={6} sm={2} style={{ marginLeft: "10px" }}>
                        <TextField
                          label="Superficie"
                          variant="outlined"
                          id="superficie"
                          name="establecimientoSuperficie"
                          type="text"
                          error={validateField(error,"establecimientoSuperficie" )}
                          helperText={validateField(error, "establecimientoSuperficie")}
                          fullWidth
                          required
                          onChange={handleInputChange}
                          value={formData.establecimientoSuperficie}
                        />
                      </Grid>
                      <Grid item xs={6} sm={3} style={{ marginLeft: "5px" }}>
                        <TextField
                          label="Parcelas"
                          variant="outlined"
                          id="parcelas"
                          name="establecimientoParcelas"
                          type="text"
                          error={validateField(error,"establecimientoParcelas")}
                          helperText={validateField(error,"establecimientoParcelas")}
                          fullWidth
                          required
                          onChange={handleInputChange}
                          value={formData.establecimientoParcelas}
                        />
                      </Grid>
                      <Grid item xs={2} sm={1}>
                        <Button
                          variant="contained"
                          size="large"
                          onClick={handleOpenAdd}
                          style={{
                            backgroundColor: "#0FB60B",
                            color: "#ffffff",
                            marginLeft: "5px",
                          }}
                        >
                          <AddOutlinedIcon />
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    style={{ margin: "8px 0", padding: "8px" }}
                  >
                    <Grid container spacing={1}>
                      <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-end" }} >
                        <Button
                          variant="contained"
                          type="submit"
                          onClick={
                            estadoModal === "add"? handleAddEstablecimiento : handleUpdateEstablecimiento }
                        >
                          {estadoModal === "add" ? "Agregar" : "Guardar"}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContent>
            </Box>
          </Dialog>

          <Datatable
            columns={columns}
            rows={filteredRows.length > 0 ? filteredRows : rows}
            option={true}
            optionDeleteFunction={handleDeleteEstablecimiento}
            optionUpdateFunction={handleEdit}
            setSelectedRow={setSelectedRow}
            selectedRow={selectedRow}
          />
        </div>
      </div>
    </>
  );
};
export default Establecimientos;
