"use client";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Paper, Grid, Avatar, Typography, Button } from "@mui/material";
import IconoPersonalizado from "../../components/icon/IconoPersonalizado";
import ButtonInput from "../../components/button/ButtonInput";
import TextInput from "../../components/text/TextInput";

/*Registar se encarga de manejar un formulario y tiene un estilo definido en el objeto paperStyle. 
La función useForm() se utiliza para obtener información relacionada con el formulario.*/
const Registar = () => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  /*Funcion onSubmit con palabra clave async para indicar que es asincronica con argumentos data(datos)*/
  const onSubmit = async () => {};
  /*Hook de estado useState.*/
  /*Variable de estado llamada showTooltip y su función de actualización setShowTooltip.*/
  const [showTooltip, setShowTooltip] = useState(false);
  /* Variable de estado llamada showIcon y su función de actualización setShowIcon.*/
  const [showIcon, setShowIcon] = useState(false);
  /* Variable de estado llamada validate y su función de actualización setValidate.*/
  const [validate, setValidate] = useState(false);

  const [userNombre, setUserNombre] = useState<string>("");
  const [userApellido, setUserApellido] = useState<string>("");
  const [userMail, setUserMail] = useState<string>("");
  const [userContraseña, setUserContraseña] = useState<string>("");

  const clickHandler = async () => {
    const nuevoUsuario = {
      nombre: userNombre,
      apellido: userApellido,
      mail: userMail,
      password: userContraseña,
    };
    try {
      const res = await fetch("http://localhost:8080/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoUsuario),
      });

      //const data = await res.json();
      /*if (!data) {
        console.log("contaseña y mail erroneos:", data);
        return;
      }*/
      //console.log("Solicitud exitosa:", data);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  /*definen un estado para rastrear el estado de los campos de un formulario. 
  Cada campo tiene dos propiedades booleanas que pueden utilizarse para controlar la visualización de elementoscomo iconos o información adicional en la interfaz de usuario.*/
  const [fieldStates, setFieldStates] = useState({
    nombre: { showTooltip: false, showIcon: false },
    apellido: { showTooltip: false, showIcon: false },
    mail: { showTooltip: false, showIcon: false },
    password: { showTooltip: false, showIcon: false },
  });

  /*se actualiza el estado del campo especificado para mostrar tanto el tooltip como el icono*/
  const handleClickField = (fieldName) => {
    setFieldStates((prevStates) => ({
      ...prevStates,
      [fieldName]: { showTooltip: true, showIcon: true },
    }));
  };

  /*se utiliza para devolver un valor desde una función o componente.*/
  return (
    <div
      style={{
        padding: 20,
        height: "45vh",
        width: 500,
        margin: "25px auto 80px",
        border: "1px solid black",
      }}
    >
      <Avatar
        sx={{
          width: 60,
          height: 60,
          backgroundColor: "#FFFFFF",
          margin: "0 auto",
          border:"1px solid red"
        }}
      >
        <IconoPersonalizado icono="registrar.png" width={32} height={32} />
      </Avatar>

      <Typography
        sx={{
          margin: "auto",
          variant: "title",
          align: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontWeight: "bold",
          
        }}
      >
        Registrarse
      </Typography>

      <Grid container justifyContent="center" >
        <Typography
          sx={{
            margin: "auto",
            variant: "subtitle1",
            align: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          ¡Por favor complete este formulario para crear una cuenta!
        </Typography>
      </Grid>

      <Grid container spacing={2} marginLeft={-1} marginTop={1}>
        <Grid item xs={12} sm={6} sx={{  paddingRight: 2 }}>
          <TextInput
            type={"text"}
            toolTipPosition={"left"}
            label={"Nombre"}
            value={userNombre}
            onChange={(value) => setUserNombre(value)}
            style={undefined}
          />
        </Grid>

        <Grid item xs={12} sm={6} sx={{  paddingRight: 2 }}>
          <TextInput
            type={"text"}
            toolTipPosition={"right"}
            label={"Apellido"}
            value={userApellido}
            onChange={(value) => setUserApellido(value)}
            style={undefined}
          />
        </Grid>

        <Grid item xs={12} sm={6} sx={{ paddingRight: 2 }}>
          <TextInput
            type={"email"}
            toolTipPosition={"left"}
            label={"Email"}
            value={userMail}
            onChange={(value) => setUserMail(value)}
            style={undefined}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          sx={{ paddingRight: 2}}
        >
          <TextInput
            type={"password"}
            toolTipPosition={"right"}
            label={"Contraseña"}
            value={userContraseña}
            onChange={(value) => setUserContraseña(value)}
            style={undefined}
          />
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        sx={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          marginTop: 3,
        }}
      >
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={async () => {
            //console.log(userNombre, userApellido, userMail, userContraseña);
            clickHandler();
            setValidate(true);
          }}
        >
          {" "}
          Registrarse
        </Button>
      </Grid>
    </div>
  );
};

export default Registar;
