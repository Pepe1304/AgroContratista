"use client";

import { useEffect, useRef, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid as MuiDataGrid } from "@mui/x-data-grid";
import BarraBusquedaInput from "../../components/searchBar/BarraBusquedaInput";
import {
  Autocomplete,
  Checkbox,
  Collapse,
  DialogActions,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { InputAdornment } from "@mui/material";
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
import { Search } from "@mui/icons-material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import React from "react";
import { blue, green, red } from "@mui/material/colors";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import MapDialog from "../../components/mapboxcomponent/MapBoxComponent "; // Asegúrate de la ruta correcta

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
  const [selectedEstablecimientoId, setSelectedEstablecimientoId] =
    useState(null);

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

  //AGREGAR ESTABLECIMIENTO
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
        row.lote.toLowerCase().includes(value.toLowerCase()) ||
        row.parcelas.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredRows(filteredData);
  };

  //ELIMINAR ESTABLECIMIENTOS
  const handleDeleteEstablecimiento = async (id) => {
    console.log("Establecimiento a eliminar:", id);

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
    // console.log("Id:", newFarm.id);
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

  //CARGAR AGRICULTORES PARA MOSTRAR EN AUTOCOMPLETE
  const [propietarios, setPropietarios] = useState<any[]>([]);
  const obtenerClientes = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/agricultor");
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de agricultores");
      }
      const data = await response.json(); // Convertir la respuesta a JSON

      if (Array.isArray(data)) {
        setPropietarios(data); // Establecer el estado con los datos obtenidos
      } else {
        console.error("Los datos obtenidos no son un array:", data);
        // Manejar el caso en el que los datos no son un array (quizás mostrar un mensaje de error)
      }
    } catch (error) {
      console.error("Error al obtener agricultores:", error);
      // Manejar errores aquí, por ejemplo, mostrando un mensaje al usuario
    }
  };

  useEffect(() => {
    obtenerClientes(); // Llamar a la función para obtener clientes cuando el componente se monte
  }, []);

  const handleInputAutoCompleteChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  /*PARA AGREGAR LOTE Y PARCELA A LA LISTA*/
  const [nombre, setNombre] = useState("");
  const [coordenadas, setCoordenadas] = useState("");
  const [superficie, setSuperficie] = useState("");
  const [lotes, setLotes] = useState([]);
  const [selectedLoteId, setSelectedLoteId] = useState(null);
  const [isParcelas, setIsParcelas] = useState(false);
  const [expandedLoteId, setExpandedLoteId] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleAddPlotParcel = () => {
    if (isParcelas && selectedLoteId) {
      // Encuentra el lote seleccionado
      const loteSeleccionado = lotes.find((lote) => lote.id === selectedLoteId);

      // Suma de las superficies de las parcelas existentes
      const sumaParcelas = loteSeleccionado.parcelas.reduce(
        (total, parcela) => total + parseFloat(parcela.superficie),
        0
      );

      // Nueva superficie sumada a la suma existente
      const nuevaSuma = sumaParcelas + parseFloat(superficie);

      // Validación: Verifica si la nueva suma excede la superficie del lote
      if (nuevaSuma > parseFloat(loteSeleccionado.superficie)) {
        setShowTooltip(true); // Muestra el tooltip
        setTimeout(() => setShowTooltip(false), 3000); // Oculta el tooltip después de 3 segundos
        return; // Sale de la función sin agregar la parcela
      }

      // Si la validación pasa, agrega la parcela al lote
      const newParcelas = [
        ...loteSeleccionado.parcelas,
        { id: new Date().getTime(), nombre, coordenadas, superficie },
      ];

      const updatedLotes = lotes.map((lote) =>
        lote.id === selectedLoteId ? { ...lote, parcelas: newParcelas } : lote
      );

      setLotes(updatedLotes);
      setNombre("");
      setCoordenadas("");
      setSuperficie("");
    } else if (!isParcelas) {
      // Lógica para agregar un nuevo lote
      const newLote = {
        id: new Date().getTime(),
        nombre,
        coordenadas,
        superficie,
        parcelas: [],
      };

      setLotes([...lotes, newLote]);
      setNombre("");
      setCoordenadas("");
      setSuperficie("");
    }
  };

  const handleRowClick = (id) => {
    setExpandedLoteId(expandedLoteId === id ? null : id);
  };

  const handleCheckboxChange = (id) => {
    setSelectedLoteId(id === selectedLoteId ? null : id);
    setIsParcelas(id !== selectedLoteId);
  };

  const handleDeleteLote = (id) => {
    setLotes(lotes.filter((lote) => lote.id !== id));
    if (selectedLoteId === id) {
      setSelectedLoteId(null);
      setExpandedLoteId(null);
    }
  };

  const handleDeleteParcela = (loteId, parcelaId) => {
    setLotes(
      lotes.map((lote) =>
        lote.id === loteId
          ? {
              ...lote,
              parcelas: lote.parcelas.filter(
                (parcela) => parcela.id !== parcelaId
              ),
            }
          : lote
      )
    );
  };

  // const cellStyle = {
  //   verticalAlign: "top",
  //   margin: "8px",
  // };

  const boldTextStyle = {
    fontWeight: "bold",
  };

  const [openDialog, setOpenDialog] = useState(false); // Estado para controlar el Dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  /*MAPBOX */
  const [lotPoints, setLotPoints] = useState([]);
  const [parcelPoints, setParcelPoints] = useState([]);

  const handleLotPointsSelected = (points) => {
    setLotPoints(points);
    // Calcular la ubicación promedio del lote
    const avgLat =
      points.reduce((sum, p) => sum + p.latitude, 0) / points.length;
    const avgLng =
      points.reduce((sum, p) => sum + p.longitude, 0) / points.length;
    console.log(`Ubicación promedio del lote: Lat ${avgLat}, Lng ${avgLng}`);
  };

  const handleParcelPointsSelected = (points) => {
    setParcelPoints(points);
    // Calcular la ubicación promedio de las parcelas
    const avgLat =
      points.reduce((sum, p) => sum + p.latitude, 0) / points.length;
    const avgLng =
      points.reduce((sum, p) => sum + p.longitude, 0) / points.length;
    console.log(
      `Ubicación promedio de las parcelas: Lat ${avgLat}, Lng ${avgLng}`
    );
  };

  const handlePointsSelected = ({ coordinates, areaInHectares }) => {
    setCoordenadas(coordinates); // Update the state for coordinates
    setSuperficie(areaInHectares); // Update the state for area
  };

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
            //maxWidth="md"
            // fullWidth
            PaperProps={{ sx: { width: "1025px", maxWidth: "none" } }}
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

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ padding: "0 24px" }}
            >
              <DialogContent>
                <Grid container spacing={2}>
                  {/* IDENTIFICACION */}
                  <Grid
                    item
                    xs={12}
                    sx={{ marginTop: "25px", paddingBottom: "25px" }}
                  >
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
                              target: { name: "farmOwner", value: newValue },
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
                                style: { height: 57, padding: "0 14px" },
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Search />
                                  </InputAdornment>
                                ),
                              }}
                              InputLabelProps={{
                                ...params.InputLabelProps,
                                style: { height: 44 },
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

                  <div style={{ padding: "20px" }}>
                    <Typography variant="subtitle1" color="textSecondary">
                      {isParcelas ? "Parcelas" : "Lote"}
                    </Typography>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={3}>
                        <TextField
                          label="Nombre"
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                          name={isParcelas ? "parcelName" : "plotLandName"}
                          sx={{ margin: "1px 10px 10px 0" }} // Ajusta el margen superior e inferior
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          label="Coordenadas"
                          value={coordenadas}
                          onChange={(e) => setCoordenadas(e.target.value)}
                          name={
                            isParcelas
                              ? "parcelCoordinates"
                              : "plotLandCoordinates"
                          }
                          sx={{ margin: "1px 10px 10px 0", width: "100%" }} // Ajusta el margen superior e inferior
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <Button
                          variant="contained"
                          onClick={handleOpenDialog}
                          sx={{
                            backgroundColor: "#0FB60B",
                            color: "#ffffff",
                            margin: "0px 5px",
                            width: "100%", // Hace que el botón ocupe todo el ancho disponible
                          }}
                        >
                          <AddLocationIcon />
                        </Button>
                      </Grid>
                      <Grid item xs={4}>
                        <Grid container spacing={1} alignItems="center">
                          <Grid item xs={8}>
                            <TextField
                              label="Superficie"
                              value={superficie}
                              onChange={(e) => setSuperficie(e.target.value)}
                              name={isParcelas ? "parcelArea" : "plotLandArea"}
                              sx={{
                                margin: "1px 1px 10px 10px",
                                width: "65%", // Hace que el campo de superficie ocupe todo el ancho disponible en su contenedor
                              }}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Tooltip
                              title="La superficie total de las parcelas no puede exceder la superficie del lote."
                              open={showTooltip}
                              arrow
                              PopperProps={{
                                modifiers: [
                                  {
                                    name: "arrow",
                                    enabled: true,
                                    options: {
                                      padding: 5,
                                    },
                                  },
                                ],
                              }}
                              componentsProps={{
                                tooltip: {
                                  sx: {
                                    backgroundColor: blue[600], // Cambia el color de fondo del tooltip
                                    color: "#ffffff", // Cambia el color del texto
                                    fontSize: "13px",
                                  },
                                },
                                arrow: {
                                  sx: {
                                    color: blue[900], // Cambia el color de la flecha del tooltip
                                  },
                                },
                              }}
                            >
                              <Button
                                variant="contained"
                                size="large"
                                onClick={handleAddPlotParcel}
                                sx={{
                                  backgroundColor: "#0FB60B",
                                  color: "#ffffff",
                                  width: "auto", // Ajusta el ancho automáticamente para que se alinee mejor
                                  ml: -6, // Ajusta el margen izquierdo negativo para moverlo hacia la izquierda
                                }}
                              >
                                <AddRoundedIcon />
                              </Button>
                            </Tooltip>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <div>
                      <MapDialog
                        openDialog={openDialog}
                        handleCloseDialog={handleCloseDialog}
                        onPointsSelected={handlePointsSelected}
                      />
                    </div>

                    <div style={{ marginTop: "25px" }}>
                      <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell
                                sx={{ backgroundColor: "#0FB60B" }}
                              ></TableCell>
                              <TableCell
                                sx={{
                                  backgroundColor: "#0FB60B",
                                  color: "#ffffff",
                                  fontWeight: "bold",
                                }}
                              >
                                Nombre
                              </TableCell>
                              <TableCell
                                sx={{
                                  backgroundColor: "#0FB60B",
                                  color: "#ffffff",
                                  fontWeight: "bold",
                                }}
                              >
                                Coordenadas
                              </TableCell>
                              <TableCell
                                sx={{
                                  backgroundColor: "#0FB60B",
                                  color: "#ffffff",
                                  fontWeight: "bold",
                                }}
                              >
                                Superficie
                              </TableCell>
                              <TableCell
                                sx={{
                                  backgroundColor: "#0FB60B",
                                  color: "#ffffff",
                                  fontWeight: "bold",
                                }}
                              >
                                Acciones
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {lotes.map((lote) => (
                              <React.Fragment key={lote.id}>
                                <TableRow hover>
                                  <TableCell>
                                    {lote.parcelas.length > 0 && (
                                      <IconButton
                                        aria-label="expand row"
                                        size="small"
                                        onClick={() => handleRowClick(lote.id)}
                                      >
                                        {expandedLoteId === lote.id ? (
                                          <KeyboardArrowUpRoundedIcon
                                            sx={{ color: blue[900] }}
                                          />
                                        ) : (
                                          <KeyboardArrowDownRoundedIcon
                                            sx={{ color: blue[900] }}
                                          />
                                        )}
                                      </IconButton>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    <Box
                                      display="flex"
                                      flexDirection="column"
                                      alignItems="flex-start"
                                    >
                                      <Typography
                                        variant="body1"
                                        sx={boldTextStyle}
                                      >
                                        {lote.nombre}
                                      </Typography>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    <Box
                                      display="flex"
                                      flexDirection="column"
                                      alignItems="flex-start"
                                    >
                                      <Typography
                                        variant="body1"
                                        sx={boldTextStyle}
                                      >
                                        {lote.coordenadas}
                                      </Typography>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    <Box
                                      display="flex"
                                      flexDirection="column"
                                      alignItems="flex-start"
                                    >
                                      <Typography
                                        variant="body1"
                                        sx={boldTextStyle}
                                      >
                                        {lote.superficie}
                                      </Typography>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    <Checkbox
                                      checked={selectedLoteId === lote.id}
                                      onChange={() =>
                                        handleCheckboxChange(lote.id)
                                      }
                                    />
                                    <IconButton
                                      onClick={() => handleDeleteLote(lote.id)}
                                    >
                                      <DeleteRoundedIcon
                                        sx={{ color: red[500] }}
                                      />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell
                                    style={{ paddingBottom: 0, paddingTop: 0 }}
                                    colSpan={6}
                                  >
                                    <Collapse
                                      in={expandedLoteId === lote.id}
                                      timeout="auto"
                                      unmountOnExit
                                    >
                                      <Box margin={1}>
                                        <Typography
                                          variant="h6"
                                          gutterBottom
                                          component="div"
                                        >
                                          Parcelas
                                        </Typography>
                                        {lote.parcelas.map((parcela) => (
                                          <Box
                                            key={parcela.id}
                                            sx={{ marginLeft: 2 }}
                                          >
                                            <Typography
                                              variant="body2"
                                              sx={boldTextStyle}
                                            >
                                              {parcela.nombre}
                                            </Typography>
                                            <Typography variant="body2">
                                              {parcela.coordenadas}
                                            </Typography>
                                            <Typography variant="body2">
                                              {parcela.superficie}
                                            </Typography>
                                            {/* <Divider /> */}
                                          </Box>
                                        ))}
                                      </Box>
                                    </Collapse>
                                  </TableCell>
                                </TableRow>
                              </React.Fragment>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      padding: "8px",
                    }}
                  >
                    <Button
                      variant="contained"
                      type="submit"
                      onClick={
                        estadoModal === "add"
                          ? handleAddEstablecimiento
                          : handleUpdateEstablecimiento
                      }
                    >
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
