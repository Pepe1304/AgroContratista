// import React, { useState, useEffect } from "react";
// import TextField from "@mui/material/TextField";
// import { InputAdornment } from "@mui/material";
// import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
// import { styled } from "@mui/material/styles";

// const MaskedInput = ({
//   type,
//   style,
//   value,
//   onChange,
//   id = undefined,
//   onKeyUp = undefined,
// }) => {
//   const [error, setError] = useState("");
//   const [showErrorIcon, setShowErrorIcon] = useState(false);

//   const handleInputChange = (event) => {
//     const inputValue = event.target.value;

//     if (type === "telefono") {
//       // Validar y aplicar máscara para teléfono
//       const maskedValue = inputValue
//         .replace(/\D/g, "") // Eliminar todos los caracteres que no sean dígitos
//         .replace(/^(\d{4})(\d{0,6}).*/, "$1-$2"); // Aplicar la máscara 0000-000000

//       onChange(maskedValue);
//     } else if (type === "documento") {
//       // Validar y aplicar máscara para documento
//       const maskedValue = inputValue
//         .replace(/\D/g, "") // Eliminar todos los caracteres que no sean dígitos
//         .replace(/^(\d{2})(\d{0,8})(\d{0,1}).*/, "$1-$2-$3"); // Aplicar la máscara 00-00000000-0

//       onChange(maskedValue);
//     }
//   };

//   useEffect(() => {
//     if (value.trim() === "") {
//       setError("Campo requerido");
//     } else {
//       setError("");
//     }
//   }, [value]);

//   const CustomMaskField = styled(TextField)(({ theme }) => ({
//     "& .MuiInputBase-input": {
//       fontFamily: "var(--font-sans)",
//     },
//     "& .MuiInputLabel-root": {
//       fontFamily: "var(--font-serif)",
//     },
//     "& .MuiFormHelperText-root": {
//       fontFamily: "var(--font-serif)",
//     },
//   }));

//   return (
//     <CustomMaskField
//       label={type === "telefono" ? "Teléfono" : "Documento"}
//       variant="outlined"
//       type="text"
//       value={value}
//       onChange={handleInputChange}
//       onKeyUp={onKeyUp}
//       placeholder={type === "telefono" ? "0000-000000" : "00-00000000-0"}
//       fullWidth
//       style={style}
//       error={error !== ""}
//       helperText={error}
//       InputProps={{
//         id: id,
//         sx: { marginY: "1px" },
//         endAdornment: (
//           <InputAdornment position="end">
//             {error !== "" && (
//               <ErrorOutlineOutlinedIcon sx={{ color: "#ff1744" }} />
//             )}
//           </InputAdornment>
//         ),
//       }}
//       InputLabelProps={{
//         className: "font-sans", // Aplicar fuente sans al label
//       }}
//       FormHelperTextProps={{
//         className: "font-serif", // Aplicar fuente serif al texto de ayuda
//       }}
//     />
//   );
// };

// export default MaskedInput;
