import React, { useState, useEffect } from "react";
import { Button,Dialog,DialogActions,DialogContent,DialogTitle, IconButton, TextField,} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Fullscreen, FullscreenExit } from "@mui/icons-material";
import Map, { Marker, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapDialog = ({ openDialog, handleCloseDialog, onPointsSelected }) => {
  const [viewport, setViewport] = useState({
    latitude: -30.5667, // Coordenadas para Suardi, Santa Fe
    longitude: -62.0833,
    zoom: 14,
  });
  const [points, setPoints] = useState([]);
  const [polygon, setPolygon] = useState([]);
  const [averageCoordinate, setAverageCoordinate] = useState("");
  const [isMaximized, setIsMaximized] = useState(false); // Estado para maximizar/minimizar

  // // Función para obtener la ubicación actual del GPS
  // const getCurrentLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         addPoint(latitude, longitude);
  //       },
  //       (error) => {
  //         // Manejar los diferentes tipos de errores
  //         switch (error.code) {
  //           case error.PERMISSION_DENIED:
  //             alert("Usuario denegó la solicitud de geolocalización.");
  //             break;
  //           case error.POSITION_UNAVAILABLE:
  //             alert("Información de ubicación no disponible.");
  //             break;
  //           case error.TIMEOUT:
  //             alert(
  //               "La petición para obtener la ubicación del usuario ha caducado."
  //             );
  //             break;
  //           default:
  //             alert("Error desconocido al obtener la ubicación.");
  //             break;
  //         }
  //       },
  //       { timeout: 5000 } // Establece un tiempo límite para la solicitud
  //     );
  //   } else {
  //     alert("Geolocalización no es soportada por este navegador.");
  //   }
  // };

  // // Función para agregar un punto
  // const addPoint = (latitude, longitude) => {
  //   if (points.length < 4) {
  //     setPoints([...points, { latitude, longitude }]);
  //   } else {
  //     alert("Solo puedes marcar 4 puntos.");
  //   }
  // };

  useEffect(() => {
    if (points.length === 4) {
      const lastPoint = points[0];
      const polygon = [...points, lastPoint];
      setPolygon(polygon);

      // Calcular la coordenada promedio
      const avgLongitude =
        points.reduce((sum, point) => sum + point.longitude, 0) / points.length;
      const avgLatitude =
        points.reduce((sum, point) => sum + point.latitude, 0) / points.length;

      setAverageCoordinate(
        `(${avgLatitude.toFixed(6)}, ${avgLongitude.toFixed(6)})`
      );
    } else {
      setPolygon([]);
      setAverageCoordinate("");
    }
  }, [points]);

  const handleMapClick = (event) => {
    //getCurrentLocation(); // Actualizar para usar la ubicación del GPS
    const { lngLat } = event;
    const longitude = lngLat.lng;
    const latitude = lngLat.lat;

    if (points.length < 4) {
      setPoints([...points, { longitude, latitude }]);
    } else {
      alert("Solo puedes marcar 4 puntos.");
    }
  };

  const handleSaveCoordinates = () => {
    if (onPointsSelected) onPointsSelected(averageCoordinate);
    handleCloseDialog();
  };

  const handleRemoveLastPoint = () => {
    setPoints(points.slice(0, -1));
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized); // Alterna el estado de maximizado
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      maxWidth="md"
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          width: isMaximized ? "100%" : "auto",height: isMaximized ? "100%" : "auto",maxWidth: isMaximized ? "100%" : "1200px",maxHeight: "800px",
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
          aria-label="maximize"
          onClick={toggleMaximize}
          sx={{ position: "absolute", right: 48, top: 8 }}
        >
          {isMaximized ? <FullscreenExit /> : <Fullscreen />}
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <div
          style={{
            position: "relative", height: isMaximized ? "100%" : "500px",border: "2px solid black",
          }}
        >
          <Map
            {...viewport}
            mapStyle="mapbox://styles/mapbox/streets-v11"
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
                <div
                  style={{
                    backgroundColor: "red", borderRadius: "50%",width: "12px", height: "12px",
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
                  geometry: {
                    type: "Polygon",
                    coordinates: [
                      polygon.map((p) => [p.longitude, p.latitude]),
                    ],
                  },
                }}
              >
                <Layer
                  id="polygon-layer"
                  type="fill"
                  paint={{"fill-color": "#ff7f0e","fill-opacity": 0.3,}}
                />
              </Source>
            )}
          </Map>
        </div>
        <TextField
          variant="outlined"
          label="Coordenada Promedio"
          value={averageCoordinate}
          InputProps={{
            readOnly: true,
          }}
          sx={{ mt: 2, width: "100%"}}
        />
      </DialogContent>

      <DialogActions sx={{ mt: 2 }}>
        <Button onClick={handleRemoveLastPoint} color="secondary">
          Eliminar último punto
        </Button>
        <Button onClick={handleSaveCoordinates} color="primary">
          Guardar Coordenadas
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MapDialog;

// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   TextField,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import Map, { Marker, Source, Layer } from "react-map-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import { red } from "@mui/material/colors";

// const MapDialog = ({ openDialog, handleCloseDialog, onPointsSelected }) => {
//   const [viewport, setViewport] = useState({
//     latitude: -30.5667, // Coordenadas para Suardi, Santa Fe
//     longitude: -62.0833,
//     zoom: 14,
//   });
//   const [points, setPoints] = useState([]);
//   const [polygon, setPolygon] = useState([]);
//   const [averageCoordinate, setAverageCoordinate] = useState("");

//   useEffect(() => {
//     if (points.length === 4) {
//       const lastPoint = points[0];
//       const polygon = [...points, lastPoint];
//       setPolygon(polygon);

//       // Calcular la coordenada promedio
//       const avgLongitude =
//         points.reduce((sum, point) => sum + point.longitude, 0) / points.length;
//       const avgLatitude =
//         points.reduce((sum, point) => sum + point.latitude, 0) / points.length;

//       setAverageCoordinate(
//         `(${avgLatitude.toFixed(6)}, ${avgLongitude.toFixed(6)})`
//       );
//     } else {
//       setPolygon([]);
//       setAverageCoordinate("");
//     }
//   }, [points]);

//   const handleMapClick = (event) => {
//     const { lngLat } = event;
//     const longitude = lngLat.lng;
//     const latitude = lngLat.lat;

//     if (points.length < 4) {
//       setPoints([...points, { longitude, latitude }]);
//     } else {
//       alert("Solo puedes marcar 4 puntos.");
//     }
//   };

//   const handleSaveCoordinates = () => {
//     if (onPointsSelected) onPointsSelected(averageCoordinate);
//     handleCloseDialog();
//   };

//   const handleRemoveLastPoint = () => {
//     setPoints(points.slice(0, -1));
//   };

//   return (
//     <Dialog
//       open={openDialog}
//       onClose={handleCloseDialog}
//       maxWidth="md"
//       fullWidth
//     >
//       <DialogTitle>
//         Marcar Coordenadas
//         <IconButton
//           aria-label="close"
//           onClick={handleCloseDialog}
//           sx={{ position: "absolute", right: 8, top: 8 }}
//         >
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent>
//         <div
//           style={{
//             position: "relative",
//             height: "400px",
//             border: "2px solid black",
//           }}
//         >
//           <Map
//             {...viewport}
//             mapStyle="mapbox://styles/mapbox/streets-v11"
//             onMove={(evt) => setViewport(evt.viewState)}
//             onClick={handleMapClick}
//             mapboxAccessToken="pk.eyJ1IjoicGVwZW1hcGJveDg2IiwiYSI6ImNtMHBoYzRsbzAxNGIycnBza2RzbmRudHQifQ.440E50Y_qT002C9sFQWm5A"
//             style={{ width: "100%", height: "100%" }} // Asegúrate de que el mapa ocupe todo el contenedor
//           >
//             {points.map((point, index) => (
//               <Marker
//                 key={index}
//                 longitude={point.longitude}
//                 latitude={point.latitude}
//               >
//                 <div
//                   style={{
//                     backgroundColor: "red",
//                     borderRadius: "50%",
//                     width: "12px",
//                     height: "12px",
//                   }}
//                 />
//               </Marker>
//             ))}
//             {polygon.length > 0 && (
//               <Source
//                 id="polygon-source"
//                 type="geojson"
//                 data={{
//                   type: "Feature",
//                   geometry: {
//                     type: "Polygon",
//                     coordinates: [
//                       polygon.map((p) => [p.longitude, p.latitude]),
//                     ],
//                   },
//                 }}
//               >
//                 <Layer
//                   id="polygon-layer"
//                   type="fill"
//                   paint={{
//                     "fill-color": "#ff7f0e",
//                     "fill-opacity": 0.3,
//                   }}
//                 />
//               </Source>
//             )}
//           </Map>
//         </div>
//         <TextField
//           variant="outlined"
//           label="Coordenadas"
//           value={averageCoordinate}
//           InputProps={{
//             readOnly: true,
//           }}
//           sx={{ marginTop: 2 }}
//         />
//       </DialogContent>

//       <DialogActions>
//         <Button onClick={handleRemoveLastPoint} sx={{ color: red[500] }}>
//           Eliminar último punto
//         </Button>
//         <Button onClick={handleCloseDialog} color="primary">
//           Cancelar
//         </Button>
//         <Button
//           onClick={handleSaveCoordinates}
//           sx={{
//             backgroundColor: "#007bff",
//             color: "#fff",
//             "&:hover": { backgroundColor: "#0056b3" },
//           }}
//         >
//           Guardar Coordenadas
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default MapDialog;