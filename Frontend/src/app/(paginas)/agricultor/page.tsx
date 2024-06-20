"use client";
import React, { useState, useEffect, useRef } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { DataGrid as MuiDataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { FormControl } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { Grid } from "@mui/material";
import { IconButton } from "@mui/material";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";
import BarraBusquedaInput from "../../components/searchBar/BarraBusquedaInput";
import Datatable from "../../components/table/DataTable";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import InputMask from "react-input-mask";
import { validateField, validateForm } from "../../../utiles/validarFormFields";

const AgricultorGanadero = ({ onSearchChange, onAddClick }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [filteredRows, setFilteredRows] = useState([]);
  const DataGrid = MuiDataGrid;
  const [personId, setPersonId] = useState<string>("");
  const [estadoModal, setEstadoModal] = useState<"add" | "update">("add");
  const [selectedClientId, setSelectedClientId] = useState(null);

  const handleClientSelect = (clientId) => {
    setSelectedClientId(clientId);

    const selectedClient = rows.find((row) => row.id === clientId);
    if (selectedClient) {
      setFormData({
        personRazonSocial: selectedClient.razonSocial,
        personDomicilio: selectedClient.direccion,
        personTelefono: selectedClient.telefono,
        personMail: selectedClient.mail,
        personLocalidad: selectedClient.localidad,
        personProvincia: selectedClient.provincia,
        personCondFrenteIva: selectedClient.condFrenteIva,
        personDocumento: selectedClient.documento,
      });
    }
  };

  const [formData, setFormData] = useState({
    //personId: "",
    personRazonSocial: "",
    personDomicilio: "",
    personTelefono: "",
    personMail: "",
    personLocalidad: "",
    personProvincia: "",
    personCondFrenteIva: "",
    personDocumento: "",
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

  const condFrenteIvaOptions = [
    "IVA Responsable Inscripto",
    "IVA Responsable no Inscripto",
    "IVA no Responsable",
    "IVA Sujeto Exento",
    "Consumidor Final",
    "Responsable Monotributo",
    "Sujeto no Categorizado",
    "Proveedor del Exterior",
    "Cliente del Exterior",
    "IVA Liberado",
    "Pequeño Contribuyente Social",
    "Monotributista Social",
    "Pequeño Contribuyente Eventual",
  ];

  const handleOpenAdd = () => {
    setEstadoModal("add");
    clearFrom();
    setOpen(true);
  };

  const clearFrom = () => {
    setFormData({
      personRazonSocial: "",
      personDomicilio: "",
      personTelefono: "",
      personMail: "",
      personLocalidad: "",
      personProvincia: "",
      personCondFrenteIva: "",
      personDocumento: "",
    });
    setError({});
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

  const handleSearchClick = () => {
    setIsSearchBarOpen(!isSearchBarOpen);
  };

  const columns = [
    // {
    //   field: "id",
    //   headerName: "",
    //   width: 100,
    //   headerClassName: "custom-header",
    //   renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    // },
    {
      field: "razonSocial",
      headerName: "Razón Social",
      width: 285,
      headerClassName: "custom-header",
    },
    {
      field: "direccion",
      headerName: "Direccíon",
      width: 285,
      headerClassName: "custom-header",
    },
    {
      field: "telefono",
      headerName: "Teléfono",
      width: 165,
      headerClassName: "custom-header",
    },
    {
      field: "mail",
      headerName: "Mail",
      width: 165,
      headerClassName: "custom-header",
    },
    {
      field: "lugar",
      headerName: "Lugar",
      width: 285,
      headerClassName: "custom-header",
    },
    {
      field: "condFrenteIva",
      headerName: "Condicíon",
      width: 275,
      headerClassName: "custom-header",
    },
    {
      field: "documento",
      headerName: "Documento",
      width: 140,
      headerClassName: "custom-header",
    },
    // {
    //   field: "actions",
    //   headerName: "Acciones",
    //   width: 205,
    //   headerClassName: "custom-header",
    //   renderCell: (params) => (
    //     <Grid container alignItems="center">
    //       <Grid item xs={6} sm={6}>
    //         <Button
    //           variant="outlined"
    //           size="small"
    //           onClick={() => handleDeleteCliente(params.row.id)}
    //           style={{ color: "#FF0000" }}
    //         >
    //           <DeleteIcon />
    //         </Button>
    //       </Grid>
    //       <Grid item xs={6} sm={6}>
    //         <Button
    //           variant="outlined"
    //           size="small"
    //           //onClick={() => handleEditCliente(params.row)}
    //           style={{ color: "#008000" }}
    //         >
    //           <EditIcon />
    //         </Button>
    //       </Grid>
    //       /{" "}
    //     </Grid>
    //   ),
    // },
  ];

  /*AGREGAR AGRICULTOR/GANADERO*/
  const handleAddCliente = async () => {
    const lugar = `${formData.personLocalidad} - ${formData.personProvincia}`;
    const nuevaPersona = {
      razonSocial: formData.personRazonSocial,
      direccion: formData.personDomicilio,
      telefono: formData.personTelefono,
      mail: formData.personMail,
      lugar: lugar,
      condFrenteIva: formData.personCondFrenteIva,
      documento: formData.personDocumento,
    };

    const errors = validateForm(formData, {
      personRazonSocial: {
        valid: (v: string) => /^[a-zA-Z\s]+$/.test(v),
        error: "Introdroduzca su Nombre y Apellido",
      },
      personDomicilio: {
        valid: (v: string) => /^[a-zA-Z0-9\s.Ññ]*$/.test(v),
        error: "Introdroduzca su Direccion",
      },
      personTelefono: {
        valid: (v: string) => /[0-9]+(?:\s{0,1}[0-9]+)*$/g.test(v),
        error: "Introdroduzca su Teléfono",
      },
      personMail: {
        valid: (v: string) =>
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v),
        error: "Introdroduzca su Emal",
      },
      personLocalidad: {
        valid: (v: string) => /^[a-zA-Z\s]+$/.test(v),
        error: "Introdroduzca su Localidad",
      },
      personProvincia: {
        valid: (v: string) => /[a-zA-Z]+(?:\s{0,1}[a-zA-Z]+)*$/g.test(v),
        error: "Seleccione la Provincia",
      },
      personCondFrenteIva: {
        valid: (v: string) => /[a-zA-Z]+(?:\s{0,1}[a-zA-Z]+)*$/g.test(v),
        error: "Seleccione la Condícion",
      },
      personDocumento: {
        valid: (v: string) => /[0-9]+(?:\s{0,1}[0-9]+)*$/g.test(v),
        error: "Introduzca su Documento",
      },
    });

    console.log(errors);
    if (errors) {
      setError(errors);
      return;
    }

    // Mostrar cada dato individual en la consola
    console.log("Razón Social:", nuevaPersona.razonSocial);
    console.log("Dirección:", nuevaPersona.direccion);
    console.log("Teléfono:", nuevaPersona.telefono);
    console.log("Mail:", nuevaPersona.mail);
    console.log("Lugar:", lugar);
    console.log("Condición Frente IVA:", nuevaPersona.condFrenteIva);
    console.log("Documento:", nuevaPersona.documento);

    try {
      const res = await fetch("http://localhost:8080/api/agricultor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaPersona),
      });
      // Verificar si la solicitud de guardado fue exitosa
      if (!res.ok) {
        throw new Error("Error al guardar el cliente");
      }

      clearFrom();
      const dataClientes = await fetchClientes();
      setRows(dataClientes);
      setOpen(false);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  /*CARGAR AGRICULTOR/GANADERO EN EL DATAGRID*/
  const fetchClientes = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/agricultor");
      if (!res.ok) {
        throw new Error("Error al obtener los clientes");
      }
      const dataClientes = await res.json();
      return dataClientes;
    } catch (error) {
      console.error("Error en la solicitud:", error);
      // Devolver un valor predeterminado en caso de error
      return [];
    }
  };

  useEffect(() => {
    const getData = async () => {
      const dataClientes = await fetchClientes();
      setRows(dataClientes);
    };

    getData();
  }, []);

  /*BUSCAR AGRICULTOR/GANADERO*/
  const handleSearhCliente = async (value) => {
    const filteredData = rows.filter((row) => {
      // Filtra las filas según el valor de búsqueda
      return (
        row.razonSocial.toLowerCase().includes(value.toLowerCase()) ||
        row.direccion.toLowerCase().includes(value.toLowerCase()) ||
        row.telefono.toLowerCase().includes(value.toLowerCase()) ||
        row.mail.toLowerCase().includes(value.toLowerCase()) ||
        row.lugar.toLowerCase().includes(value.toLowerCase()) ||
        row.condFrenteIva.toLowerCase().includes(value.toLowerCase()) ||
        row.documento.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredRows(filteredData);
  };

  /*ELIMINAR AGRICULTOR/GANADERO*/
  const handleDeleteCliente = async (id) => {
    console.log("Cliente a eliminar:", id);

    try {
      const res = await fetch(`http://localhost:8080/api/agricultor/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        console.log("Cliente eliminado exitosamente.");
        // Actualizar el estado de las filas después de eliminar un cliente
        const dataClientes = await fetchClientes();
        setRows(dataClientes);
      } else {
        console.error("Error al eliminar el cliente:", id);
      }
    } catch (error) {
      console.error("Error en la solicitud de eliminación:", error);
    }
  };

  /*CLICK BOTON MODIFICAR(LAPIZ)*/
  const handleEdit = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/agricultor/${id}`, {
        method: "GET",
      });

      if (res.ok) {
        console.log("Cliente obtenido exitosamente.");

        const agricultor = await res.json();
        setFormData({
          personRazonSocial: agricultor.razonSocial,
          personDomicilio: agricultor.direccion,
          personTelefono: agricultor.telefono,
          personMail: agricultor.mail,
          personLocalidad: agricultor.lugar.split(" - ")[0].trim(), // Corregido
          personProvincia: agricultor.lugar.split(" - ")[1].trim(), // Corregido
          personCondFrenteIva: agricultor.condFrenteIva,
          personDocumento: agricultor.documento,
        });
      } else {
        console.error("Error al modificar el cliente:", id);
      }
    } catch (error) {
      console.error("Error en la solicitud de eliminación:", error);
    }

    setEstadoModal("update");
    setOpen(true);
  };

  /*MODIFICAR AGRICULTOR/GANADERO PARA GAURDAR*/
  const handleUpdateCliente = async () => {
    if (!selectedRow) return;
    const lugar = `${formData.personLocalidad} - ${formData.personProvincia}`;
    const nuevaPersona = {
      id: selectedRow.id,
      razonSocial: formData.personRazonSocial,
      direccion: formData.personDomicilio,
      telefono: formData.personTelefono,
      mail: formData.personMail,
      lugar: lugar,
      condFrenteIva: formData.personCondFrenteIva,
      documento: formData.personDocumento,
    };

    // Mostrar cada dato individual en la consola
    // console.log("Id:", nuevaPersona.id);
    console.log("Razón Social:", nuevaPersona.razonSocial);
    console.log("Dirección:", nuevaPersona.direccion);
    console.log("Teléfono:", nuevaPersona.telefono);
    console.log("Mail:", nuevaPersona.mail);
    console.log("Lugar:", lugar);
    console.log("Condición Frente IVA:", nuevaPersona.condFrenteIva);
    console.log("Documento:", nuevaPersona.documento);

    try {
      const res = await fetch(`http://localhost:8080/api/agricultor`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaPersona),
      });
      // Verificar si la solicitud de guardado fue exitosa
      if (!res.ok) {
        throw new Error("Error al guardar el cliente");
      }

      // Actualizar el estado rows
      const updatedRows = rows.map((row) => {
        if (row.id === nuevaPersona.id) {
          return nuevaPersona; // Actualizar el cliente modificado
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
  const selectCondIvaRef = useRef(null);
  const documentoRef = useRef(null);

  const handleLocalidadKeyDown = (event) => {
    if (event.key === "Enter") {
      selectProvinciaRef.current.focus();
    }
  };

  const handleProvinciaChange = (event) => {
    handleInputChange(event);
    setTimeout(() => {
      selectCondIvaRef.current.focus();
    }, 0);
  };

  const handleCondIvaChange = (event) => {
    handleInputChange(event);
    setTimeout(() => {
      documentoRef.current.focus();
    }, 0);
  };

  return (
    <>
      <div
        style={{
          border: "1px solid #D3D3D3",
          padding: "20px",
          marginTop: "20px",
          boxSizing: "border-box",
          backgroundColor: "#FFFAFA",
        }}
      >
        <h6
          style={{
            marginBottom: 0,
            fontSize: "18px",
            marginTop: "3px",
            display: "inline-block",
            fontWeight: 700,
            color: "#424242",
          }}
        >
          Agricultor/Ganadero
        </h6>
      </div>

      <div
        style={{
          border: "1px solid #D3D3D3",
          padding: "20px",
          borderRadius: "5px",
          marginTop: "20px",
          backgroundColor: "#FFFAFA",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "20px",
          }}
        >
          {/* Panel de Busqueda Cliente y Boton Agregar Cliente */}
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
                onChangeValue={handleSearhCliente}
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

          <Dialog open={open} onClose={handleClickClose}>
            <DialogTitle>
              {estadoModal === "add"
                ? "Agregar Agricultor/Ganadero"
                : "Editar Agricultor/Ganadero"}
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
                  <Grid
                    item
                    xs={12}
                    style={{ marginTop: "25px", padding: "8px" }}
                  >
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Typography
                          variant="subtitle1"
                          color={"textSecondary"}
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          Identificación
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Razón Social"
                          variant="outlined"
                          id="razonSocial"
                          name="personRazonSocial"
                          type="text"
                          error={validateField(error, "personRazonSocial")}
                          helperText={validateField(error, "personRazonSocial")}
                          fullWidth
                          required
                          onChange={handleInputChange}
                          value={formData.personRazonSocial}
                          disabled={estadoModal === "update"}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Domicilio"
                          variant="outlined"
                          id="domicilio"
                          name="personDomicilio"
                          type="text"
                          error={validateField(error, "personDomicilio")}
                          helperText={validateField(error, "personDomicilio")}
                          fullWidth
                          required
                          onChange={handleInputChange}
                          value={formData.personDomicilio}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
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
                          Contacto
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <InputMask
                          mask="(9999)-999999"
                          value={formData.personTelefono}
                          onChange={handleInputChange}
                        >
                          {() => (
                            <TextField
                              id="telefono"
                              label="Teléfono"
                              type="tel"
                              name="personTelefono"
                              error={validateField(error, "personTelefono")}
                              helperText={validateField(
                                error,
                                "personTelefono"
                              )}
                              required
                              fullWidth
                            />
                          )}
                        </InputMask>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        md={6}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <TextField
                          label="Email"
                          variant="outlined"
                          id="email"
                          name="personMail"
                          type="email"
                          required
                          fullWidth
                          error={validateField(error, "personMail")}
                          helperText={validateField(error, "personMail")}
                          onChange={handleInputChange}
                          value={formData.personMail}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
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
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Localidad"
                          variant="outlined"
                          id="localidad"
                          name="personLocalidad"
                          type="text"
                          error={validateField(error, "personLocalidad")}
                          helperText={validateField(error, "personLocalidad")}
                          fullWidth
                          required
                          onChange={handleInputChange}
                          onKeyDown={handleLocalidadKeyDown}
                          value={formData.personLocalidad}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl
                          fullWidth
                          error={validateField(error, "personProvincia")}
                        >
                          <InputLabel id="demo-simple-select-label">
                            Provincias
                          </InputLabel>
                          <Select
                            label="Provincias"
                            id="provincias"
                            name="personProvincia"
                            labelId="demo-simple-select-label"
                            fullWidth
                            value={formData.personProvincia}
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
                              {validateField(error, "personProvincia")}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
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
                          Datos Fiscales
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={7}>
                        <FormControl
                          fullWidth
                          error={validateField(error, "personCondFrenteIva")}
                        >
                          <InputLabel id="demo-simple-select-label">
                            Cond. Frente al IVA
                          </InputLabel>
                          <Select
                            label="Cond. Frente al IVA"
                            id="condIva"
                            name="personCondFrenteIva"
                            labelId="demo-simple-select-label"
                            fullWidth
                            value={formData.personCondFrenteIva}
                            onChange={handleCondIvaChange}
                            inputRef={selectCondIvaRef}
                          >
                            {condFrenteIvaOptions.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                          {error && (
                            <FormHelperText>
                              {validateField(error, "personCondFrenteIva")}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <InputMask
                          mask="99-99999999-9"
                          value={formData.personDocumento}
                          onChange={handleInputChange}
                        >
                          {() => (
                            <TextField
                              id="documento"
                              label="Documento"
                              name="personDocumento"
                              error={validateField(error, "personDocumento")}
                              helperText={validateField(
                                error,
                                "personDocumento"
                              )}
                              required
                              fullWidth
                              inputRef={documentoRef}
                            />
                          )}
                        </InputMask>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{ margin: "8px 0", padding: "8px" }}
                  >
                    <Grid container spacing={1}>
                      <Grid
                        item
                        xs={12}
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Button
                          variant="contained"
                          type="submit"
                          onClick={
                            estadoModal === "add"
                              ? handleAddCliente
                              : handleUpdateCliente
                          }
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
            optionDeleteFunction={handleDeleteCliente}
            optionUpdateFunction={handleEdit}
            setSelectedRow={setSelectedRow}
            selectedRow={selectedRow}
          />
        </div>
      </div>
    </>
  );
};

export default AgricultorGanadero;
