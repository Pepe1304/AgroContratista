import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Fullscreen,
  FullscreenExit,
  LocationOn,
  Map as MapIcon,
  Satellite as SatelliteIcon,
} from "@mui/icons-material";
import Map, { Marker, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { blue, green, red } from "@mui/material/colors";
import * as turf from "@turf/turf";

const MapDialog = ({ openDialog, handleCloseDialog, onPointsSelected }) => {
  const [viewport, setViewport] = useState({
    latitude: -30.5667,
    longitude: -62.0833,
    zoom: 14,
  });
  const [points, setPoints] = useState([]);
  const [polygon, setPolygon] = useState([]);
  const [averageCoordinate, setAverageCoordinate] = useState("");
  const [areaInHectares, setAreaInHectares] = useState("");
  const [isMaximized, setIsMaximized] = useState(false);
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/streets-v11"
  );
  const [error, setError] = useState("");
  const [parcels, setParcels] = useState([]);
  const [parcelData, setParcelData] = useState([]);
  const mapRef = useRef(null);

  const toggleMapStyle = () => {
    setMapStyle((prevStyle) =>
      prevStyle === "mapbox://styles/mapbox/streets-v11"
        ? "mapbox://styles/mapbox/satellite-streets-v11"
        : "mapbox://styles/mapbox/streets-v11"
    );
  };

  useEffect(() => {
    if (points.length === 4) {
      const lastPoint = points[0];
      const polygonCoords = [...points, lastPoint].map((p) => [
        p.longitude,
        p.latitude,
      ]);
      setPolygon(polygonCoords);

      const polygonGeoJSON = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [polygonCoords],
        },
      };

      const areaInSquareMeters = turf.area(polygonGeoJSON as turf.AllGeoJSON);
      const areaInHectares = areaInSquareMeters / 10000;

      const avgLongitude =
        points.reduce((sum, point) => sum + point.longitude, 0) / points.length;
      const avgLatitude =
        points.reduce((sum, point) => sum + point.latitude, 0) / points.length;

      const avgCoordinate = `(${avgLatitude.toFixed(6)}, ${avgLongitude.toFixed(
        6
      )})`;

      setAverageCoordinate(avgCoordinate);
      setAreaInHectares(areaInHectares.toFixed(2));
    } else {
      setPolygon([]);
      setAverageCoordinate("");
      setAreaInHectares("");
    }

    if (mapRef.current) {
      mapRef.current.getMap().resize();
    }

    // Calculate parcel data
    const newParcelData = parcels.map((parcel) => {
      const parcelGeoJSON = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [parcel.longitude, parcel.latitude],
        },
      };

      return {
        coordinates: `(${parcel.latitude.toFixed(
          6
        )}, ${parcel.longitude.toFixed(6)})`,
        area: turf.area(parcelGeoJSON as turf.AllGeoJSON),
      };
    });

    setParcelData(newParcelData);
  }, [points, parcels, isMaximized]);

  const handleMapClick = (event) => {
    const { lngLat } = event;
    const longitude = lngLat.lng;
    const latitude = lngLat.lat;

    if (points.length < 4) {
      setPoints([...points, { longitude, latitude }]);
      setError("");
    } else if (points.length === 4) {
      setParcels([...parcels, { longitude, latitude }]);
      setError("");
    } else {
      setError(
        "Solo puedes marcar hasta 4 puntos para el lote y agregar parcelas."
      );
    }
  };

  const handleSaveCoordinates = () => {
    if (onPointsSelected) {
      onPointsSelected({ coordinates: averageCoordinate, areaInHectares });
    }
    handleCloseDialog();
  };

  const handleRemoveLastPoint = () => {
    if (points.length > 0) {
      setPoints(points.slice(0, -1));
    } else if (parcels.length > 0) {
      setParcels(parcels.slice(0, -1));
    }
    setError("");
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      maxWidth="md"
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          width: isMaximized ? "100%" : "auto",
          height: isMaximized ? "100%" : "auto",
          maxWidth: isMaximized ? "100%" : "1200px",
          maxHeight: "800px",
        },
      }}
    >
      <DialogTitle>
        Marcar Coordenadas
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <IconButton
          aria-label={isMaximized ? "Salir de pantalla completa" : "Maximizar"}
          onClick={toggleMaximize}
          sx={{ position: "absolute", right: 48, top: 8 }}
        >
          {isMaximized ? <FullscreenExit /> : <Fullscreen />}
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <div style={{ marginBottom: "10px", color: "#555" }}>
          Haz clic en el mapa para marcar hasta 4 puntos del lote y luego marcar
          las parcelas dentro del lote. La coordenada promedio y el área se
          calcularán automáticamente.
        </div>
        <div
          style={{
            position: "relative",
            height: isMaximized ? "100%" : "500px",
            border: "2px solid black",
          }}
        >
          <Map
            ref={mapRef}
            {...viewport}
            mapStyle={mapStyle}
            onMove={(evt) => setViewport(evt.viewState)}
            onClick={handleMapClick}
            mapboxAccessToken="pk.eyJ1IjoicGVwZW1hcGJveDg2IiwiYSI6ImNtMHBoYzRsbzAxNGIycnBza2RzbmRudHQifQ.440E50Y_qT002C9sFQWm5A"
            style={{ width: "100%", height: "100%" }}
          >
            {points.map((point, index) => (
              <Marker
                key={index}
                longitude={point.longitude}
                latitude={point.latitude}
              >
                <LocationOn
                  style={{
                    color: "red",
                    fontSize: "24px",
                    animation: "bounce 0.5s",
                  }}
                />
              </Marker>
            ))}
            {parcels.map((point, index) => (
              <Marker
                key={`parcel-${index}`}
                longitude={point.longitude}
                latitude={point.latitude}
              >
                <LocationOn
                  style={{
                    color: "blue",
                    fontSize: "24px",
                    animation: "bounce 0.5s",
                  }}
                />
              </Marker>
            ))}
            {polygon.length > 0 && (
              <Source
                id="polygon-source"
                type="geojson"
                data={{
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "Polygon",
                    coordinates: [polygon],
                  },
                }}
              >
                <Layer
                  id="polygon-layer"
                  type="fill"
                  paint={{ "fill-color": "#ff7f0e", "fill-opacity": 0.3 }}
                />
              </Source>
            )}
          </Map>
        </div>

        {error && <div style={{ color: "red", marginTop: "8px" }}>{error}</div>}

        <TextField
          variant="outlined"
          label="Coordenada Promedio"
          value={averageCoordinate}
          InputProps={{ readOnly: true }}
          sx={{ mt: 2, mr: 2, width: "calc(50% - 8px)" }}
        />
        <TextField
          variant="outlined"
          label="Área en Hectáreas"
          value={areaInHectares}
          InputProps={{ readOnly: true }}
          sx={{ mt: 2, width: "calc(50% - 8px)" }}
        />

        <div style={{ marginTop: "16px" }}>
          <div style={{ marginBottom: "8px", color: "#555" }}>Parcelas:</div>
          <List>
            {parcelData.map((data, index) => (
              <ListItem key={`parcel-data-${index}`}>
                <ListItemText
                  primary={`Parcela ${index + 1}`}
                  secondary={`Coordenadas: ${
                    data.coordinates
                  }, Área: ${data.area.toFixed(2)} m²`}
                />
              </ListItem>
            ))}
          </List>
        </div>

        <Button
          onClick={toggleMapStyle}
          sx={{
            mt: 2,
            backgroundColor: green[600],
            "&:hover": { backgroundColor: green[800] },
          }}
          startIcon={
            mapStyle === "mapbox://styles/mapbox/streets-v11" ? (
              <SatelliteIcon />
            ) : (
              <MapIcon />
            )
          }
          variant="contained"
        >
          {mapStyle === "mapbox://styles/mapbox/streets-v11"
            ? "Satélite"
            : "Calles"}
        </Button>
      </DialogContent>

      <DialogActions sx={{ mt: 2 }}>
        <Button
          onClick={handleRemoveLastPoint}
          color="primary"
          sx={{ color: red[500] }}
        >
          Eliminar último punto
        </Button>
        <Button
          onClick={handleSaveCoordinates}
          sx={{ backgroundColor: blue[700], color: "#ffffff" }}
          color="primary"
        >
          Obtener Datos
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MapDialog;
