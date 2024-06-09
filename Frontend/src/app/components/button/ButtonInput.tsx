// import { Button,  } from "@mui/material"; // Importa CSSProperties
// import { ReactNode ,CSSProperties} from "react";

// interface ButtonInputProps {
//   //children: ReactNode;
//   onClick: () => void;
//   style?: CSSProperties;

// }

// const ButtonInput = ({ onClick, style, ...props}: ButtonInputProps) => {
//   return (
//     <Button
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         textAlign: "center",
//         fontSize: "14px",
//         marginY: "1px",
//         padding: "5px 50px",
//         style // Aplica los estilos
//       }}
//       {...props}
//       type="submit"
//       color="primary"
//       fullWidth
//       onClick={onClick}>

//     </Button>
//   );
// };
// export default ButtonInput;

import { Button } from "@mui/material";
import { CSSProperties } from "react";

interface ButtonInputProps {
  onClick: () => void;
  style?: CSSProperties;
}

const ButtonInput = ({ onClick, style, ...props }: ButtonInputProps) => {
  return (
    <Button
      sx={{
        fontFamily: "var(--font-sans)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontSize: "14px",
        marginY: "1px",
        padding: "5px 50px",
        ...style, // Combina los estilos sx con los estilos personalizados
      }}
      {...props}
      type="submit"
      color="primary"
      fullWidth
      onClick={onClick}
    />
  );
};

export default ButtonInput;
