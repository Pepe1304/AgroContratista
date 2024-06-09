import React, { useState, useRef, useEffect } from "react";
import {Button,Typography,Box,Stepper,Step,StepLabel,Grid,Divider,} from "@mui/material";
import TextInput from "../../components/text/TextInput";
import IconoPersonalizado from "../../components/icon/IconoPersonalizado";
import { StepIconProps } from "@mui/material/StepIcon";
import { useRouter } from "next/navigation";

const RecuperarPassword = ({ goToLogin }: { goToLogin: () => void }) => {
  const [userMail, setUserMail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userConfirmarPassword, setUserConfirmarPassword] =useState<string>("");
  const [message, setMessage] = useState<string>("");
  const emailRef = useRef<HTMLInputElement>(null);
  const [showForm, setShowForm] = useState(true);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const steps = ["Enviar Mail", "Ingresar Token", " Ingresar Contraseña"];
  const [errorMessage, setErrorMessage] = useState(""); // Inicializa el estado del mensaje de error
  const [token, setToken] = useState(Array(5).fill("")); // Inicializa el estado del token
  const [errorMessageToken, setErrorMessageToken] = useState(""); // Inicializa el estado del mensaje de error
  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleButtonClick = () => {
    handleRecuperarClick();
    handleEnviarClick();
  };

  const handleRecuperarClick = async () => {
    const emailValue = userMail;

    // Lógica para enviar la solicitud de recuperación de contraseña
    try {
      const response = await fetch(
        "http://localhost:8080/api/usuarios/recuperar-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mail: emailValue }),
        }
      );

      const data = await response.json();
      if (data === true) {
        setActiveStep(1);
        console.log("Mail Enviado:", data);
        return;
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("Error en la solicitud de recuperación de contraseña.");
    }
  };

  const handleVerificarCodigoClick = async () => {
    const emailValue = userMail;
    console.log(emailValue, token.join(""));

    // Lógica para enviar la solicitud de recuperación de contraseña
    try {
      const response = await fetch(
        "http://localhost:8080/api/usuarios/verificar-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mail: emailValue, codigo: token.join("") }),
        }
      );

      const data = await response.json();
      if (data === true) {
        console.log("Token Verificado:", data);
        setActiveStep(2);

        //return;
      } else {
        setErrorMessageToken(" Debe ingresar token valido");
      }
    } catch (error) {
      setErrorMessageToken("Error en la solicitud de recuperación de token.");
    }
  };

  const handleGenerarNuevaContraseñaClick = async () => {
    const emailValue = userMail;

    // Lógica para enviar la solicitud de recuperación de contraseña
    try {
      const response = await fetch(
        "http://localhost:8080/api/usuarios/generar-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mail: emailValue, password: userPassword }),
        }
      );

      const data = await response.json();
      if (data === true) {
        console.log("Contraseña Generada:", data);
        goToLogin();
        //router.push("/auth/container")
      } else {
        setErrorMessageToken(" Intentelo otra vez");
      }
    } catch (error) {
      setErrorMessageToken(
        "Error en la solicitud de recuperación de contraseña"
      );
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleEnviarClick = async () => {
    setIsNextButtonDisabled(false);
  };

  const MyStepIcon = (props: StepIconProps) => {
    const { active, completed, icon } = props;

    const icons: { [index: number]: React.ReactElement } = {
      1: <IconoPersonalizado icono={"correo.png"} width={32} height={32} />,
      2: <IconoPersonalizado icono={"token.png"} width={32} height={32} />,
      3: <IconoPersonalizado icono={"password.png"} width={32} height={32} />,
    };
    // Si el paso está completado o activo, muestra el icono personalizado
    // Si no, muestra un icono deshabilitado
    return (
      <div>
        {completed || active ? (
          icons[Number(icon)]
        ) : (
          <IconoPersonalizado
            icono={icons[Number(icon)].props.icono}
            width={32}
            height={32}
            style={{ opacity: 0.5 }}
          />
        )}
      </div>
    );
  };

  const handleTokenChange = (i, value) => {
    console.log("Valor ingresado: ", value); // Imprime el valor ingresado
    const regex = /^[0-9]$/; // Esta expresión regular solo acepta números
    if (value.trim() === "" || regex.test(value.trim())) {
      console.log(value);
      // Actualiza el estado del token
      setToken((prevToken) => {
        let newToken = [...prevToken];
        newToken[i] = value;
        return newToken;
      });
    } else {
      console.log("Formato de número inválido");
    }
  };

  const handleGenerate = () => {
    if (userPassword !== userConfirmarPassword) {
      setErrorMessage("Las contraseñas no coinciden");
    } else {
      setErrorMessage("");
      console.log("Ok"); // Imprime el estado actual del mensaje de error
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
      <Box sx={{ width: "100%" }}>
        <Stepper
          activeStep={activeStep}
          sx={{ ".MuiStepConnector-line": { borderColor: "blue" } }}
        >
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            if (isStepOptional(index)) {
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel
                  StepIconComponent={MyStepIcon} // Utiliza MyStepIcon como el componente del icono
                  {...labelProps}
                  sx={{
                    flexDirection: "column", // Alinea la etiqueta debajo del número
                    alignItems: "center", // Centra la etiqueta
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ fontSize: "14px", fontWeight: "bold" }}
                  >
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment></React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 && showForm && (
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ marginTop: "25px", marginLeft: 2 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold", fontSize: "20px" }}
                  >
                    Ingrese la dirección de e-mail
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", fontSize: "17px" }}
                  >
                    Ingresa tu mail para poder recibir un token y continuar al
                    siguiente paso
                  </Typography>
                  <Divider
                    style={{ marginTop: "20px", marginBottom: "20px" }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextInput
                    type="email"
                    toolTipPosition="left"
                    label="Email"
                    value={userMail}
                    onChange={(value) => setUserMail(value)}
                    style={undefined}
                    onKeyUp={undefined}
                  />
                </Grid>
                <Grid item xs={4} style={{ marginTop: "10px", paddingLeft: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleButtonClick}
                  >
                    Enviar
                  </Button>
                </Grid>
              </Grid>
            )}
            {activeStep === 1 && (
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ marginTop: "25px" }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold", fontSize: "20px" }}
                  >
                    Ingrese el código que te enviamos por e-mail
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", fontSize: "17px" }}
                  >
                    Es un código de seguridad de 5 dígitos a {userMail}
                  </Typography>
                  <Divider
                    style={{ marginTop: "20px", marginBottom: "20px" }}
                  />
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  spacing={1}
                  style={{ marginLeft: "15px", paddingBottom: 5 }}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Grid
                      item
                      key={i}
                      style={{
                        textAlign: "center",
                        paddingBottom: 5,
                        paddingRight: 5,
                      }}
                    >
                      <TextInput
                        id={"codigo" + i}
                        type="token"
                        onChange={(e) => {
                          handleTokenChange(i, e);
                        }}
                        onKeyUp={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            if (i < 4 && token[i] !== "") {
                              document
                                .getElementById("codigo" + (i + 1))
                                .focus();
                            }
                          }
                        }}
                        value={token[i]}
                        style={{
                          width: "5ch",
                          textAlign: "center",
                          marginRight: "4px",
                          borderRadius: "4px",
                          outline: "none",
                          backgroundColor: "#f0f0f0",
                          boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                          ":focus": {
                            border: "1px solid #ffffff",
                            boxShadow: "0 0 0 3px #0000ff",
                          },
                        }}
                        toolTipPosition={undefined}
                        label={undefined}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Grid container direction="column" alignItems="center">
                  <Grid item style={{ marginTop: 25, paddingTop: 20 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={handleVerificarCodigoClick}
                      style={{}}
                    >
                      Confirmar Código
                    </Button>
                    <Grid item style={{ marginTop: 25 }}>
                      <h3 style={{ color: "red" }}>{errorMessageToken}</h3>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
            {activeStep === 2 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "25vh",
                }}
              >
                <Grid
                  container
                  spacing={2}
                  style={{ marginTop: "5px", marginLeft: 3 }}
                >
                  <Grid
                    item
                    xs={7}
                    style={{ marginTop: "35px", paddingRight: 15 }}
                  >
                    <TextInput
                      type="password"
                      toolTipPosition="left"
                      label="Contraseña"
                      value={userPassword}
                      onChange={(value) => setUserPassword(value)}
                      style={undefined}
                    />
                  </Grid>

                  <Grid item xs={7} style={{ paddingRight: 15 }}>
                    <TextInput
                      type="password"
                      toolTipPosition="left"
                      label="Confirmar Contraseña"
                      value={userConfirmarPassword}
                      onChange={(value) => setUserConfirmarPassword(value)}
                      style={undefined}
                    />
                    {errorMessage && (
                      <div style={{ color: "red" }}>{errorMessage}</div>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={5}
                    style={{
                      position: "relative",
                      top: "-50px",
                      paddingRight: 15,
                      marginTop: 15,
                    }}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={handleGenerarNuevaContraseñaClick}
                    >
                      Generar
                    </Button>
                  </Grid>
                </Grid>
              </div>
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                pt: 2,
                justifyContent: "flex-end",
                alignItems: "center",
                width: "100%",
                height: "100%",
                marginTop: "30px",
              }}
            >
              {activeStep === 1 && (
                <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                  Volver
                </Button>
              )}
              <Box sx={{ flex: "1 1 auto" }} />

              <Button
                disabled={isNextButtonDisabled}
                onClick={() => {
                  handleNext();
                  setShowForm(false); // Oculta el formulario cuando haces clic en "Siguiente"
                }}
              ></Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
};

export default RecuperarPassword;
