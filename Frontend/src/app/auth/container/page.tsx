"use client";
import React, { useState } from "react";
import { Tabs, Tab, Paper, Typography, Stack } from "@mui/material";
import IniciarSesion from "../login/page";
import Registar from "../sign/page";
import RecuperarPassword from "../recuperar/page";
import IconoPersonalizado from "../../components/icon/IconoPersonalizado";

const Contenedorsesiónsalida = () => {
  const [value, setValue] = useState<number>(0);
  const [registroHabilitado, setRegistroHabilitado] = useState(false);
  const [recuperarPasswordHabilitado, setRecuperarPasswordHabilitado] =useState(false);

  const paperStyle: React.CSSProperties = {
    padding: 20,
    height: "60vh",
    width: 550,
    margin: "150px auto",
    border: "1px solid black",
    fontWeight: "bold",
    backgroundColor: "#F5F5F5",
  };

  const handleRegistroClick = () => {
    setRegistroHabilitado(true);
    setValue(1); // Cambiar a la pestaña de "Inscribirse"
  };

  const handleRecuperarClick = () => {
    setRecuperarPasswordHabilitado(true);
    setValue(2); // Cambiar a la pestaña de "Recuperar Contraseña"
  };

  return (
    <>
    <Stack direction="row"alignItems="center"justifyContent="center"spacing={1}style={{ marginBottom: -125,marginTop: 75 }}>

      <IconoPersonalizado icono="logotractor.png" width={64}height={64}style={{ marginRight: 10 }}/>
      
      <Typography  variant="h4"style={{color: "#EC9107",letterSpacing: "2px"}}>
        AgroContratistas
      </Typography>

    </Stack>
    <Paper elevation={20} style={paperStyle}>
      
      <Tabs value={value} indicatorColor="primary"textColor="primary"aria-label="disabled tabs example"onChange={(event, newValue) => setValue(newValue)}>
        <Tab
          label={
            <Typography variant="subtitle2"style={{ textTransform: "none", fontSize: "1rem" }}>
              Iniciar Sesión
            </Typography>
          }
        />
        <Tab
          label={
            <Typography variant="subtitle2" style={{ textTransform: "none", fontSize: "1rem" }}>
              Inscribirse
            </Typography>
          }
          disabled={!registroHabilitado}
        />
        <Tab
          label={
            <Typography variant="subtitle2"style={{ textTransform: "none", fontSize: "1rem" }}
            >
              Recuperar Contraseña
            </Typography>
          }
          disabled={!recuperarPasswordHabilitado}
        />
      </Tabs>

      <div style={{ marginTop: 20 }}>
        {value === 0 && (
          <IniciarSesion
            activarInscribirse={handleRegistroClick}
            activarRecuperarPassword={handleRecuperarClick}
          />
        )}
        {value === 1 && <Registar />}
        {value === 2 && <RecuperarPassword goToLogin={() => setValue(0)} />}
      </div>
    </Paper>
  </>
  );
};

export default Contenedorsesiónsalida;
