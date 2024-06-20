// import styled from "@emotion/styled";
// import {
//   InputAdornment,
//   TextField,
//   Tooltip,
//   TooltipProps,
//   tooltipClasses,
// } from "@mui/material";
// import React, {useEffect, useState } from "react";
// import Typography from "@mui/material/Typography";
// import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
// import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

// const ErrorTooltip = styled(({ className, ...props }: TooltipProps) => (
//   <Tooltip {...props} classes={{ popper: className }} />
// ))(({ theme }) => ({
//   [`& .${tooltipClasses.tooltip}`]: {
//     backgroundColor: "#be4b49",
//     color: "#fff;",
//     maxWidth: 220,
//     //fontSize: theme.typography.pxToRem(12),
//     border: 0,
//     borderRadius: "2px",
//     boxShadow: "0 0 0 1px rgba(139, 3, 0, .75), 0 1px 10px rgba(0, 0, 0, .35)",
//   },
//   [`& .${tooltipClasses.arrow}`]: {
//     color: "#be4b49", // Color de la flecha
//   },
// }));

// const MailInput = ({toolTipPosition, label}) => {
//   const [inputValue, setInputValue] = useState("");
//   const [isValidEmail, setIsValidEmail] = useState(true);
//   const [showValidateIcon, setShowValidateIcon] = useState(false);
//   const [showErrorIcon, setShowErrorIcon] = useState(false);

//   const handleInputChange = (event) => {
//     let value = event.target.value;
//     setInputValue(value);
//   };
//   const verificarInput = () => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailRegex.test(inputValue)) {

//       setShowErrorIcon(true);
//       setShowValidateIcon(false);
//     } else {

//       setShowErrorIcon(false);
//       setShowValidateIcon(true);
//     }
//   };
//   useEffect(() => {
//     verificarInput();
//   }, [inputValue]);

//   return (
//     <div>
//       <ErrorTooltip
//         arrow
//         placement="left"
//         title={
//           <React.Fragment>
//             <Typography color="inherit">Campo Requerido</Typography>
//           </React.Fragment>
//         }
//         open={showErrorIcon}
//       >
//         <TextField
//           size="medium"
//           type={"text"}
//           label= {label}
//           value={inputValue}
//           onChange={handleInputChange}
//           fullWidth
//           error={!isValidEmail}
//           helperText={!isValidEmail ? "Formato incorrecto" : ""}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 {showErrorIcon && (
//                   <ErrorOutlineOutlinedIcon sx={{ color: "#ff1744" }} />
//                 )}
//                  {showValidateIcon&& (
//                   <CheckCircleOutlineOutlinedIcon sx={{ color: "#227442" }} />

//                 )}
//               </InputAdornment>

//             ),
//           }}
//         />
//       </ErrorTooltip>
//     </div>
//   );
// };

// export default MailInput;
