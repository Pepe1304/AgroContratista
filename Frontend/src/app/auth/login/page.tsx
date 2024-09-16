"use client";
import React, { useState } from "react";
import { Avatar, Button, Grid, Link, Paper, Typography } from "@mui/material";
import IconoPersonalizado from "../../components/icon/IconoPersonalizado";
import { useRouter } from "next/navigation";
import { verificarLogin } from "../../../utiles/verificarLogin";
//import TextInput from "../../components/text/TextInput";
import { useForm } from "react-hook-form";

const IniciarSesion = ({
  activarInscribirse,
  activarRecuperarPassword,
}: {
  activarInscribirse: () => void;
  activarRecuperarPassword: () => void;
}) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const [userMail, setUserMail] = useState<string>("");
  const [userPassword, setUserContraseña] = useState<string>("");

  const clickHandler = async () => {
    console.log("Botón Iniciar Sesión presionado");
    const verificarLogin = { mail: userMail, password: userPassword };
    try {
      const res = await fetch(
        "http://localhost:8080/api/usuarios/verificar-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(verificarLogin),
        }
      );

      const data = await res.json();

      console.log("Respuesta del servidor:", data);

      if (res.ok) {
        // Si la respuesta es exitosa (status code 200-299), verificar la contraseña
        localStorage.setItem("Login", JSON.stringify(data)); // Almacena la respuesta en localStorage

        if (typeof data === "boolean") {
          // Si la respuesta es un booleano, asumimos que es el valor de loginCorrecto
          if (data) {
            console.log("Inicio de sesión exitoso:", data);
            router.push("/dashboard");
          } else {
            // Contraseña incorrecta, redirigir a /auth/container
            console.log("Contraseña incorrecta o mail incorrecto");
            router.push("/auth/container");
          }
        } else {
          // Si la respuesta no es un booleano, es posible que debas ajustar la lógica según el nuevo formato de respuesta
          console.log("Formato de respuesta inesperado:", data);
          router.push("/auth/container");
        }
      } else {
        // Si la respuesta no es exitosa, redirige a /auth/container
        console.log("Inicio de sesión fallido:", data);
        router.push("/auth/container");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      // También podrías manejar el error de alguna manera aquí
    }
  };

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
          margin: "auto",
        }}
      >
        <IconoPersonalizado icono="login.png" width={32} height={32} />
      </Avatar>
      <Grid container justifyContent="center">
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
          Iniciar Sesión
        </Typography>
      </Grid>

      <Grid container justifyContent="center">
        <Typography
          sx={{
            margin: "auto",
            marginBottom: 2,
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
          ¡Bienvenido al Sistema!
        </Typography>
      </Grid>

      <Grid
        container
        spacing={2}
        style={{
          marginLeft: -10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        marginTop={2}
      >
        <Grid item xs={12} sm={6} sx={{ marginTop: 2, paddingRight: 2 }}>
          {/* <TextInput
            type={"email"}
            toolTipPosition={"left"}
            label={"Email"}
            value={userMail}
            onChange={(value) => setUserMail(value)}
            style={undefined}
            onKeyUp={undefined}
          /> */}
        </Grid>
        <Grid item xs={12} sm={6} sx={{ marginTop: 2, paddingRight: 2 }}>
          {/* <TextInput
            type={"password"}
            toolTipPosition={"right"}
            label={"Contraseña"}
            value={userPassword}
            onChange={(value) => setUserContraseña(value)}
            style={undefined}
            onKeyUp={undefined}
          /> */}
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          sx={{ marginTop: 2, paddingRight: 2, paddingBottom: 2 }}
        >
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              /*"joaquin_suardi@htomail.com" joaquin123*/
              console.log(userMail, userPassword);
              clickHandler();
              verificarLogin(router);
            }}
          >
            Iniciar Sesión
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ marginTop: 2, paddingRight: 2, paddingBottom: 2 }}
        >
          <Link
            href="/auth/container/recuperar"
            onClick={(e) => {
              e.preventDefault();
              activarRecuperarPassword();
            }}
          >
            <Typography
              sx={{
                align: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              ¿Olvidó la Contraseña?
            </Typography>
          </Link>
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            marginTop: 2,
            paddingRight: 2,
            paddingBottom: 2,
          }}
        >
          <Typography
            sx={{
              align: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            ¿No Tienes una Cuenta?
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            marginTop: 2,
            paddingRight: 2,
            paddingBottom: 2,
          }}
        >
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={async () => {
              activarInscribirse();
            }}
          >
            Inscribirse
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default IniciarSesion;
