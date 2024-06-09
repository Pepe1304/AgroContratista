import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const ErrorTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#be4b49",
    color: "#fff;",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: 0,
    borderRadius: "2px",
    boxShadow: "0 0 0 1px rgba(139, 3, 0, .75), 0 1px 10px rgba(0, 0, 0, .35)",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#be4b49", // Color de la flecha
  },
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    fontFamily: "var(--font-sans)",
  },
  "& .MuiInputLabel-root": {
    fontFamily: "var(--font-serif)",
  },
  "& .MuiFormHelperText-root": {
    fontFamily: "var(--font-serif)",
  },
}));

function TextInput({
  toolTipPosition,
  label,
  type,
  onChange,
  value,
  style,
  onKeyUp = undefined,
  id = undefined,
  size = undefined,
  disabled = undefined,
}) {
  const [showValidateIcon, setShowValidateIcon] = useState(false);
  const [showErrorIcon, setShowErrorIcon] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showBuscar, setShowBuscar] = React.useState(false);
  const [error, setError] = React.useState("Campo Requerido");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (event) => {
    let value = event.target.value;
    onChange(value);
  };

  const verficarMail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let errorMessage = "";

    if (type === "email" && !emailRegex.test(value.trim())) {
      errorMessage = "Formato de correo electrónico inválido";
    }
    if (value.length === 0) {
      errorMessage = "Campo requerido";
    }
    if (errorMessage) {
      setError(errorMessage);
      setShowErrorIcon(true);
      setShowValidateIcon(false);
    } else {
      setError("");
      setShowErrorIcon(false);
      setShowValidateIcon(true);
    }
  };
  const verificarInput = () => {
    const regex = /[a-zA-Z]+(?:\s{0,1}[a-zA-Z]+)*$/g;

    let errorMessage = "";

    if (type === "text" && !regex.test(value.trim())) {
      errorMessage = "Se permiten solo letras";
    }

    if (value.length === 0) {
      errorMessage = "Campo requerido";
    }
    if (value.length > 20) {
      errorMessage = "Máximo 20 caracteres";
    }
    if (errorMessage) {
      setError(errorMessage);
      setShowErrorIcon(true);
      setShowValidateIcon(false);
    } else {
      setError("");
      setShowErrorIcon(false);
      setShowValidateIcon(true);
    }
  };

  const verificarDomicilio = () => {
    const regex = /^[a-zA-Z0-9\s.]*$/; // Expresión regular para letras, números, espacios y punto

    let errorMessage = "";
    if (value.length === 0) {
      errorMessage = "Campo requerido";
    } else if (!regex.test(value.trim())) {
      errorMessage = "Solo se permiten letras, espacios, números y puntos";
    }

    if (errorMessage) {
      setError(errorMessage);
      setShowErrorIcon(true);
      setShowValidateIcon(false);
      return false;
    } else {
      setError("");
      setShowErrorIcon(false);
      setShowValidateIcon(true);
      return true;
    }
  };

  const verificarNumero = () => {
    const regex = /[0-9]+(?:\s{0,1}[0-9]+)*$/g;

    let errorMessage = "";

    if (type === "number" && !regex.test(value.trim())) {
      errorMessage = "Formato de número inválido";
    }
    if (value.length === 0) {
      errorMessage = "Campo requerido";
    }
    if (value.length > 6) {
      errorMessage = "Máximo 6 caracteres";
    }

    if (errorMessage) {
      setError(errorMessage);
      setShowErrorIcon(true);
      setShowValidateIcon(false);
    } else {
      setError("");
      setShowErrorIcon(false);
      setShowValidateIcon(true);
    }
  };
  const verificarToken = () => {
    const regex = /^[0-9]+$/; // Esta expresión regular solo acepta números

    let errorMessage = "";
    if (type === "numberWithoutArrows" && !regex.test(value.trim())) {
      errorMessage = "Formato de número inválido";
    }
  };
  useEffect(() => {
    if (type === "email") {
      verficarMail();
    } else if (type === "text") {
      verificarInput();
    } else if (type === "password") {
      verificarInput();
    } else if (type === "number") {
      verificarNumero();
    } else if (type === "token") {
      verificarToken();
    } else if (type === "domicilio") {
      const isValid = verificarDomicilio();
      if (!isValid) {
        setShowErrorIcon(true);
        setShowValidateIcon(false);
      }
    }
  }, [value]);

  return (
    <div style={{ maxWidth: "300px" }}>
      <CustomTextField
        size={size}
        type={showPassword ? "text" : type}
        label={label}
        value={value}
        onChange={handleInputChange}
        onKeyUp={onKeyUp}
        fullWidth
        disabled={disabled}
        error={showErrorIcon}
        helperText={showErrorIcon && error}
        style={style}
        InputProps={{
          id: id,
          sx: { marginY: "1px" },
          endAdornment: (
            <InputAdornment position="end">
              {showErrorIcon && (
                <ErrorOutlineOutlinedIcon sx={{ color: "#ff1744" }} />
              )}
              {showValidateIcon && (
                <CheckCircleOutlineOutlinedIcon sx={{ color: "#227442" }} />
              )}
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {type === "password" &&
                  (showPassword ? <VisibilityOff /> : <Visibility />)}
                {type === "buscar" &&
                  (showBuscar ? (
                    <SearchOutlinedIcon />
                  ) : (
                    <SearchOutlinedIcon />
                  ))}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

export default TextInput;
