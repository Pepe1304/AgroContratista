"use client";

import { JSX, useEffect, useId, useRef, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid as MuiDataGrid } from "@mui/x-data-grid";
import BarraBusquedaInput from "../../components/searchBar/BarraBusquedaInput";
import { Autocomplete, Checkbox } from "@mui/material";
import { Divider } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemAvatar } from "@mui/material";
import { ListItemText } from "@mui/material";
import { styled } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { FormControl, FormHelperText } from "@mui/material";
import { Grid } from "@mui/material";
import { IconButton } from "@mui/material";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { validateField, validateForm } from "../../../utiles/validarFormFields";
import Datatable from "../../components/table/DataTable";
import { Delete, DeleteRounded, Search } from "@mui/icons-material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import React from "react";
import IconoPersonalizado from "../../components/icon/IconoPersonalizado";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { blue, red, yellow } from "@mui/material/colors";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { v4 as uuidv4 } from "uuid";

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

  const handleEstablecimientoSelect = (farmId) => {
    setSelectedEstablecimientoId(farmId);

    const selectedName = rows.find((row) => row.id === farmId);

    if (selectedName) {
      setFormData({
        farmName: selectedName.name,
        farmOwner: selectedName.owner,
        farmTown: selectedName.town,
        farmProvince: selectedName.province,
        plotLandName: selectedName.plot,
        plotLandCoordinates: selectedName.plotCoordinates,
        plotLandArea: selectedName.plotArea,
        parcelName: selectedName.parcel,
        parcelCoordinates: selectedName.parcelCoordinates,
        parcelArea: selectedName.parcelArea,
      });
    }
  };

  const [formData, setFormData] = useState({
    farmName: "",
    farmOwner: "",
    farmTown: "",
    farmProvince: "",
    plotLandName: "",
    plotLandCoordinates: "",
    plotLandArea: "",
    parcelName: "",
    parcelCoordinates: "",
    parcelArea: "",
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
      farmName: "",
      farmOwner: "",
      farmTown: "",
      farmProvince: "",
      plotLandName: "",
      plotLandCoordinates: "",
      plotLandArea: "",
      parcelName: "",
      parcelCoordinates: "",
      parcelArea: "",
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
      field: "lote",
      headerName: "Lote",
      width: 165,
      headerClassName: "custom-header",
    },

    {
      field: "parcela",
      headerName: "Parcela",
      width: 275,
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

    console.log("Razón Social seleccionada:", value?.razonSocial);
    console.log("NOMBRE", name);
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

  //AGREGAR ESTABLECIMIENTO*
  const handleAddEstablecimiento = async () => {
    const place = `${formData.farmTown} - ${formData.farmProvince}`;

    const newFarm = {
      farm: formData.farmName,
      owner: formData.farmOwner,
      town: place,
      plotName: formData.plotLandName,
      plotCoordinates: formData.plotLandCoordinates,
      plotArea: formData.plotLandArea,
      parcelName: formData.parcelName,
      parcelCoordinates: formData.parcelCoordinates,
      parcelArea: formData.parcelArea,
    };

    const errors = validateForm(formData, {
      farmNombre: {
        valid: (v: string) => /^[a-zA-Z\s.Ññ]+$/.test(v),
        error: "Introdroduzca su Nombre del Establecimiento",
      },
      farmDueño: {
        valid: (v: string) => /^[a-zA-Z0-9\s.Ññ]*$/.test(v),
        error: "Seleccione al Dueño",
      },
      farmLocalidad: {
        valid: (v: string) => /^[a-zA-Z\s]+$/.test(v),
        error: "Introdroduzca su Localidad",
      },
      farmProvincia: {
        valid: (v: string) => /[a-zA-Z]+(?:\s{0,1}[a-zA-Z]+)*$/g.test(v),
        error: "Seleccione la Provincia",
      },

      plotName: {
        valid: (v: string) => /^[a-zA-Z\s.Ññ]+$/.test(v),
        error: "Introdroduzca su Nombre del Establecimiento",
      },

      plotCoordinates: {
        valid: (v: string) =>
          /[0-9]+(?:\s{0,1}[0-9]+)*$|^(\d{1,3})°(\d{1,2})'(\d{1,2}\.\d{1})"([NS])\s(\d{1,3})°(\d{1,2})'(\d{1,2}\.\d{1})"([WE])$/.test(
            v
          ),
        error: "Introdroduzca las Coordenadas",
      },
      plotArea: {
        valid: (v: string) => /^[0-9]+$/.test(v),
        error: "Introdroduzca la Superficie",
      },
      parcelName: {
        valid: (v: string) => /^[a-zA-Z\s.Ññ]+$/.test(v),
        error: "Introdroduzca su Nombre del Establecimiento",
      },

      parcelCoordinates: {
        valid: (v: string) =>
          /[0-9]+(?:\s{0,1}[0-9]+)*$|^(\d{1,3})°(\d{1,2})'(\d{1,2}\.\d{1})"([NS])\s(\d{1,3})°(\d{1,2})'(\d{1,2}\.\d{1})"([WE])$/.test(
            v
          ),
        error: "Introdroduzca las Coordenadas",
      },
      parcelArea: {
        valid: (v: string) => /^[0-9]+$/.test(v),
        error: "Introdroduzca la Superficie",
      },
    });

    console.log(errors);
    if (errors) {
      setError(errors);
      return;
    }

    // Mostrar cada dato individual en la consola
    console.log("Nombre:", newFarm.farm);
    console.log("Dueño:", newFarm.owner);
    console.log("Lugar:", place);
    console.log("Lote Nombre:", newFarm.plotName);
    console.log("Lote Coordenadas:", newFarm.plotCoordinates);
    console.log("Lote Superficie:", newFarm.plotArea);
    console.log("Parcelas Nombre:", newFarm.parcelName);
    console.log("Parcelas Coordenadas:", newFarm.parcelCoordinates);
    console.log("Parcelas Superficie:", newFarm.parcelArea);

    try {
      const res = await fetch("http://localhost:8080/api/establecimiento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFarm),
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

  //CARGAR ESTABLECIMIENTO EN EL DATAGRID
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

  //BUSCAR ESTABLECIMIENTO
  const handleSearhEstablecimiento = async (value) => {
    const filteredData = rows.filter((row) => {
      // Filtra las filas según el valor de búsqueda
      return (
        row.nombre.toLowerCase().includes(value.toLowerCase()) ||
        row.propietario.toLowerCase().includes(value.toLowerCase()) ||
        row.lugar.toLowerCase().includes(value.toLowerCase()) ||
        row.coordenadas.toLowerCase().includes(value.toLowerCase()) ||
        row.superficie.toLowerCase().includes(value.toLowerCase()) ||
        row.parcelas.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredRows(filteredData);
  };

  //ELIMINAR ESTABLECIMIENTOS
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

  //CLICK BOTON MODIFICAR(LAPIZ)
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

        const farm = await res.json();
        const plotLand = await res.json();
        const parcelLand = await res.json();

        setFormData({
          farmName: farm.name,
          farmOwner: farm.owner,
          farmTown: farm.place.split(" - ")[0].trim(),
          farmProvince: farm.place.split(" - ")[1].trim(),
          plotLandName: plotLand.name,
          plotLandCoordinates: plotLand.coordinates,
          plotLandArea: plotLand.area,
          parcelName: parcelLand.name,
          parcelCoordinates: parcelLand.coordinates,
          parcelArea: parcelLand.area,
          // showParcelas: false,
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

  //MODIFICAR ESTABLECIMIENTO PARA GAURDAR
  const handleUpdateEstablecimiento = async () => {
    if (!selectedRow) return;
    const lugar = `${formData.farmTown} - ${formData.farmProvince}`;
    const newFarm = {
      id: selectedRow.id,
      name: formData.farmName,
      owner: formData.farmOwner,
      place: lugar,
      plotName: formData.plotLandName,
      plotCoordinates: formData.plotLandCoordinates,
      plotArea: formData.plotLandArea,
      parcelName: formData.parcelName,
      parcelCoordinates: formData.parcelCoordinates,
      parcelArea: formData.parcelArea,
    };

    // Mostrar cada dato individual en la consola
    // console.log("Id:", nuevaPersona.id);
    console.log("Razón Social:", newFarm.name);
    console.log("Dirección:", newFarm.owner);
    console.log("Lugar:", lugar);
    console.log(" Lote Nombre:", newFarm.plotName);
    console.log("Lote Coordenadas:", newFarm.plotCoordinates);
    console.log("Lote Superficie:", newFarm.plotArea);
    console.log("Parcela Nombre:", newFarm.parcelName);
    console.log("Parcela Coordenadas:", newFarm.parcelCoordinates);
    console.log("Parcela Superficie:", newFarm.parcelArea);

    try {
      const res = await fetch(`http://localhost:8080/api/establecimiento`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFarm),
      });
      // Verificar si la solicitud de guardado fue exitosa
      if (!res.ok) {
        throw new Error("Error al guardar el cliente");
      }

      // Actualizar el estado rows
      const updatedRows = rows.map((row) => {
        if (row.id === newFarm.id) {
          return newFarm; // Actualizar el cliente modificado
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

  //OBTENER CLIENTE PARA MOSTRAR EN AUTOCOMPLETE
  const [propietarios, setPropietarios] = useState<any[]>([]);
  const obtenerClientes = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/agricultor");
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de clientes");
      }
      const data = await response.json(); // Convertir la respuesta a JSON

      if (Array.isArray(data)) {
        setPropietarios(data); // Establecer el estado con los datos obtenidos
      } else {
        console.error("Los datos obtenidos no son un array:", data);
        // Manejar el caso en el que los datos no son un array (quizás mostrar un mensaje de error)
      }
    } catch (error) {
      console.error("Error al obtener clientes:", error);
      // Manejar errores aquí, por ejemplo, mostrando un mensaje al usuario
    }
  };

  useEffect(() => {
    obtenerClientes(); // Llamar a la función para obtener clientes cuando el componente se monte
  }, []);

  const handleInputAutoCompleteChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const [isParcelas, setIsParcelas] = useState(false);
  const [idParcelas, setIdParcelas] = useState();
  const handleCheckBoxChange = (event, id) => {
    setIsParcelas(event.target.checked);
    console.log(id);
    setIdParcelas(id);
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const [showInfoButton, setShowInfoButton] = useState({});
  const handleShowParcelas = (itemId) => {
    setSelectedItem(selectedItem === itemId ? null : itemId); // Alterna la visibilidad
  };

  /*LISTA DE LOTES*/

  const [dense, setDense] = useState(false);
  const [items, setItems] = useState([]);
  const [showBorder, setShowBorder] = useState(false);
  const borderColor = "#ccc"; // Color del borde
  const boxShadow = "2px 0px 0px 0px rgba(0, 0, 0, 0.2)"; // Sombr
  const borderRadius = "2px"; // Radio de borde

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const handleAddItem = () => {
    const newItem = {
      id: uuidv4(),
      plotLandName: formData.plotLandName,
      plotLandCoordinates: formData.plotLandCoordinates,
      plotLandArea: formData.plotLandArea,
      parcelas: [],
    };
    console.log(newItem);
    console.log(idParcelas);

    if (!isParcelas) {
      setItems([...items, newItem]);
      // Añadir la entrada para el nuevo lote en showInfoButton
      setShowInfoButton({ ...showInfoButton, [newItem.id]: false });
    } else {
      if (idParcelas) {
        // Asegurarse de que idParcelas tiene un valor válido
        const LoteSeleccionado = items.find((item) => item.id === idParcelas);
        const LoteNoSeleccionados = items.filter(
          (item) => item.id !== idParcelas
        );
        LoteSeleccionado.parcelas.push({
          id: uuidv4(),
          parcelName: formData.parcelName,
          parcelCoordinates: formData.parcelCoordinates,
          parcelArea: formData.parcelArea,
        });

        console.log(LoteSeleccionado);
        console.log(LoteNoSeleccionados);

        // Mostrar el botón de información después de agregar una parcela
        setShowInfoButton({ ...showInfoButton, [idParcelas]: true });

        setItems([...LoteNoSeleccionados, LoteSeleccionado]);
      } else {
        console.error("idParcelas es indefinido");
      }
    }

    setFormData({
      ...formData,
      plotLandName: "",
      plotLandCoordinates: "",
      plotLandArea: "",
      parcelName: "",
      parcelCoordinates: "",
      parcelArea: "",
    });
  };

  // const handleAddItem = () => {
  //   const newItem = {
  //     id: uuidv4(),
  //     plotLandName: formData.plotLandName,
  //     plotLandCoordinates: formData.plotLandCoordinates,
  //     plotLandArea: formData.plotLandArea,
  //     parcelas: [],
  //   };
  //   console.log(newItem);
  //   console.log(idParcelas);
  //   if (!isParcelas) {
  //     setItems([...items, newItem]);
  //   } else {
  //     const parcelaFiltro = items.find((item) => item.id === idParcelas);
  //     console.log(parcelaFiltro);
  //     const LoteSeleccionado = items.find((item) => item.id === idParcelas);
  //     const LoteNoSeleccionados = items.filter(
  //       (item) => item.id !== idParcelas
  //     );
  //     LoteSeleccionado.parcelas.push({
  //       id: uuidv4(),
  //       parcelName: formData.parcelName,
  //       parcelCoordinates: formData.parcelCoordinates,
  //       parcelArea: formData.parcelArea,
  //     });

  //     console.log(LoteSeleccionado);
  //     console.log(LoteNoSeleccionados);
  //     const sortedItems = items.sort((a, b) => {
  //       if (a.plotLandName < b.plotLandName) {
  //         return -1;
  //       }
  //       if (a.plotLandName > b.plotLandName) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //     setItems(sortedItems);
  //   }

  //   setFormData({
  //     ...formData,
  //     plotLandName: "",
  //     plotLandCoordinates: "",
  //     plotLandArea: "",
  //     parcelName: "",
  //     parcelCoordinates: "",
  //     parcelArea: "",
  //   });
  // };
  console.log(items);
  console.log(formData);
  return (
    <>
      <div
        style={{
          border: "1px solid #D3D3D3",
          padding: "20px",
          marginTop: "20px",
          boxSizing: "border-box",
          backgroundColor: "#4CAF50",
        }}
      >
        <h6
          style={{
            marginBottom: 0,
            fontSize: "18px",
            marginTop: "3px",
            display: "inline-block",
            fontWeight: 700,
            color: "#fff",
          }}
        >
          Establecimiento Agricola
        </h6>
      </div>
      <div style={{ border: "1px solid #D3D3D3", padding: "20px",borderRadius: "5px", marginTop: "20px", backgroundColor: "#FFFAFA", }}>
       
        <div style={{display: "flex", flexDirection: "column", marginBottom: "20px", }} >
          {/* Panel de Busqueda Establecimientos y Boton Agregar Establecimientos */}
          <div style={{display: "flex",alignItems: "center",justifyContent: "flex-end",marginBottom: "15px",}}>
            
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
          <Dialog open={open}onClose={handleClickClose}maxWidth="md"fullWidth
            // PaperProps={{
            //    sx: { width: "1025px", maxWidth: "none" },
            // }}
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
            <Box component="form" onSubmit={handleSubmit} sx={{ padding: "0 24px" }} >
              <DialogContent>
                <Grid container spacing={2}>
                  {/* IDENTIFICACION */}
                  <Grid item xs={12}sx={{ marginTop: "25px", paddingBottom: "25px" }} >
                    <Typography
                      variant="subtitle1"
                      color={"textSecondary"}
                      sx={{ fontFamily: "var(--font-sans)" }}
                    >
                      Identificación
                    </Typography>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={3}>
                        <TextField
                          label="Nombre"
                          variant="outlined"
                          id="nombre"
                          name="farmName"
                          type="text"
                          error={validateField(error, "farmName")}
                          helperText={validateField(error, "farmName")}
                          fullWidth
                          required
                          onChange={handleInputChange}
                          value={formData.farmName}
                          disabled={estadoModal === "update"}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Autocomplete
                          disablePortal
                          options={propietarios}
                          getOptionLabel={(option) => option.razonSocial}
                          isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                          }
                          value={formData.farmOwner || null}
                          onChange={(_, newValue) =>
                            handleInputChange({
                              target: {
                                name: "farmOwner",
                                value: newValue,
                              },
                            })
                          }
                          inputValue={inputValue}
                          onInputChange={handleInputAutoCompleteChange}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Dueño *"
                              variant="outlined"
                              fullWidth
                              name="farmOwner"
                              error={!!error.farmOwner}
                              helperText={error.farmOwner}
                              InputProps={{
                                ...params.InputProps,
                                style: { height: 57,padding: "0 14px", },
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Search />
                                  </InputAdornment>
                                ),
                              }}
                              InputLabelProps={{
                                ...params.InputLabelProps,
                                style: {
                                  height: 44,
                                },
                              }}
                            />
                          )}
                          noOptionsText={"No se encontró ese Dueño"}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* LUGAR */}
                  <Grid item xs={12} sx={{ margin: "8px 0", padding: "8px" }}>
                    <Typography
                      variant="subtitle1"
                      color={"textSecondary"}
                      sx={{ fontFamily: "var(--font-sans)" }}
                    >
                      Lugar
                    </Typography>

                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={3}>
                        <TextField
                          label="Localidad"
                          variant="outlined"
                          id="localidad"
                          name="farmTown"
                          type="text"
                          error={validateField(error, "farmTown")}
                          helperText={validateField(error, "farmTown")}
                          fullWidth
                          required
                          onChange={handleInputChange}
                          onKeyDown={handleLocalidadKeyDown}
                          value={formData.farmTown}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <FormControl
                          fullWidth
                          error={validateField(error, "farmProvince")}
                        >
                          <InputLabel id="demo-simple-select-label">
                            Provincias
                          </InputLabel>
                          <Select
                            label="Provincias"
                            id="provincias"
                            name="farmProvince"
                            labelId="demo-simple-select-label"
                            fullWidth
                            value={formData.farmProvince}
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
                              {validateField(error, "farmProvince")}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* LOTE */}
                  <Grid item xs={12} sx={{ margin: "8px 0", padding: "8px" }}>
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      sx={{ fontFamily: "var(--font-sans)" }}
                    >
                      {isParcelas ? "Parcelas" : "Lote"}
                    </Typography>

                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={3}>
                        <TextField
                          label={isParcelas ? "Parcelas" : "Lote"}
                          variant="outlined"
                          id={isParcelas ? "Parcelas" : "Lote"}
                          name={isParcelas ? "parcelName" : "plotLandName"}
                          type="text"
                          error={validateField(error, "plotLandName")}
                          helperText={validateField(error, "plotLandName")}
                          fullWidth
                          required
                          onChange={handleInputChange}
                          value={ isParcelas? formData.parcelName: formData.plotLandName }
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="Coordenadas"
                          variant="outlined"
                          id={isParcelas ? "parcelCoordinates" : "plotLandCoordinates" }
                          name={ isParcelas? "parcelCoordinates" : "plotLandCoordinates" }
                          type="text"
                          error={validateField(error, "plotLandCoordinates")}
                          helperText={validateField( error, "plotLandCoordinates")}
                          fullWidth
                          required
                          onChange={handleInputChange}
                          value={ isParcelas ? formData.parcelCoordinates: formData.plotLandCoordinates}
                        />
                      </Grid>
                      <Grid  item xs={2} sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                          variant="contained"
                          size="large"
                          onClick={() => setShowBorder(true)}
                          sx={{ backgroundColor: "#0FB60B", color: "#ffffff",marginRight: "40px", }}>
                          <SearchRoundedIcon />
                        </Button>
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          label="Superficie"
                          variant="outlined"
                          id={isParcelas ? "parcelArea" : "plotLandArea"}
                          name={isParcelas ? "parcelArea" : "plotLandArea"}
                          type="text"
                          error={validateField(error, "plotLandArea")}
                          helperText={validateField(error, "plotLandArea")}
                          fullWidth
                          required
                          onChange={handleInputChange}
                          value={ isParcelas? formData.parcelArea : formData.plotLandArea}
                          sx={{ marginLeft: "-40px" }}
                        />
                      </Grid>

                      <Grid item xs={1} sx={{ display: "flex", justifyContent: "center" }} >
                        <Button
                          variant="contained"
                          size="large"
                          onClick={handleAddItem}
                          sx={{ backgroundColor: "#0FB60B", color: "#ffffff",marginRight: "60px", }}>
                          <AddRoundedIcon />
                        </Button>
                      </Grid>
                    </Grid>
                    {/*LISTA DE LOTES*/}
                    <div>
                      {items.length > 0 && (
                        <div style={{boxShadow,borderRadius, border: `1px solid ${borderColor}`,padding: "16px", marginTop: "16px", }}>
                          <Typography variant="h6">Lista de Lotes</Typography>
                          <List dense={dense}>
                            {items.map((item, index) => (
                              <React.Fragment key={index}>
                                <ListItem
                                  sx={{ padding: "8px", display: "flex", justifyContent: "space-between",alignItems: "center",}}
                                  secondaryAction={
                                    <div style={{ display: "flex",  alignItems: "center",}}>
                                      <Checkbox
                                        onChange={(event) => handleCheckBoxChange(event, item.id)}
                                        inputProps={{"aria-label": "controlled", }}
                                      />
                                      <DeleteRoundedIcon sx={{ color: red[500] }} />
                                    </div>
                                  }
                                >
                                  {showInfoButton[item.id] && (
                                    <InfoRoundedIcon
                                      onClick={() =>handleShowParcelas(item.id)}
                                      style={{ marginRight: "5px" }}
                                      sx={{ color: blue[700] }}
                                    />
                                  )}
                                  {/* Icono y nombre del lote */}
                                  <div style={{display: "flex",alignItems: "center",flex: 1,}} >
                                    <ListItemAvatar>
                                      <IconoPersonalizado
                                        icono="lote.png"
                                        width={32}
                                        height={32}
                                      />
                                    </ListItemAvatar>
                                    <ListItemText
                                      primary={item.plotLandName}
                                      secondary={null}
                                      sx={{ marginLeft: "-15px" }}
                                    />
                                  </div>

                                  {/* Coordenadas */}
                                  <div style={{ display: "flex", alignItems: "center",flex: 1,marginLeft: "-175px",}} >
                                    <ListItemAvatar>
                                      <IconoPersonalizado
                                        icono="coordenadas.png"
                                        width={32}
                                        height={32}
                                      />
                                    </ListItemAvatar>
                                    <ListItemText
                                      primary={item.plotLandCoordinates}
                                      secondary={null}
                                      sx={{ marginLeft: "-15px" }}
                                    />
                                  </div>

                                  {/* Superficie */}
                                  <div style={{display: "flex", alignItems: "center", flex: 1, marginLeft: "-60px",}}>
                                    <ListItemAvatar>
                                      <IconoPersonalizado
                                        icono="superficie.png"
                                        width={32}
                                        height={32}
                                      />
                                    </ListItemAvatar>

                                    <ListItemText
                                      primary={`${item.plotLandArea} (Ha)`}
                                      secondary={null}
                                      sx={{ marginLeft: "-15px" }}
                                    />
                                  </div>
                                </ListItem>
                                {selectedItem === item.id && (
                                  <Grid container spacing={2} sx={{ pl: 4 }}>
                                    {item.parcelas.map(
                                      (parcela, parcelaIndex) => (
                                        <Grid item xs={12} key={parcelaIndex}>
                                          <ListItem
                                            sx={{display: "flex",justifyContent: "space-between",alignItems: "center",}}>
                                              
                                            <div style={{ display: "flex",alignItems: "center", flex: 1, marginLeft: "-10px", }} >
                                              <ListItemAvatar>
                                                <IconoPersonalizado
                                                  icono="lote.png"
                                                  width={32}
                                                  height={32}
                                                />
                                              </ListItemAvatar>
                                              <ListItemText
                                                primary={parcela.parcelName}
                                                secondary={null}
                                                sx={{ marginLeft: "-15px" }}
                                              />
                                            </div>
                                            <div style={{ display: "flex",alignItems: "center",flex: 1, marginLeft: "-165px", }}>
                                              <ListItemAvatar>
                                                <IconoPersonalizado
                                                  icono="coordenadas.png"
                                                  width={32}
                                                  height={32}
                                                />
                                              </ListItemAvatar>
                                              <ListItemText
                                                primary={parcela.parcelCoordinates }
                                                secondary={null}
                                                sx={{ marginLeft: "-15px" }}
                                              />
                                            </div>
                                            <div style={{ display: "flex",alignItems: "center",flex: 1, marginLeft: "-45px", }} >
                                              <ListItemAvatar>
                                                <IconoPersonalizado
                                                  icono="superficie.png"
                                                  width={32}
                                                  height={32}
                                                />
                                              </ListItemAvatar>

                                              <ListItemText
                                                primary={`${parcela.parcelArea} (Ha)`}
                                                secondary={null}
                                                sx={{ marginLeft: "-15px" }}
                                              />
                                            </div>
                                          </ListItem>
                                        </Grid>
                                      )
                                    )}
                                  </Grid>
                                )}
                                <Divider style={{ background: "#C0C0C0" }}variant="fullWidth"/>
                              </React.Fragment>
                            ))}
                          </List>
                        </div>
                      )}
                    </div>
                  </Grid>

                  {/* SUBMIT BUTTON */}
                  <Grid item xs={12}
                    sx={{ display: "flex",justifyContent: "flex-end", padding: "8px" }}>
                    <Button
                      variant="contained"
                      type="submit"
                      onClick={estadoModal === "add"? handleAddEstablecimiento : handleUpdateEstablecimiento } >
                      {estadoModal === "add" ? "Agregar" : "Guardar"}
                    </Button>
                  </Grid>
                </Grid>
              </DialogContent>
            </Box>
          </Dialog>

          {/* TABLA ESTABLECIMIENTO */}
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
