import Image from "next/image";
import { CSSProperties } from "react"; // Importa CSSProperties

export default function IconoPersonalizado({
  icono,
  width,
  height,
  style, // Agrega 'style' a las props
  onClick,
  
}: {
  icono: string;
  width?: number;
  height?: number;
  style?: CSSProperties; // Agrega 'style' a las props
  onClick?: () => void;
}) {
  return (
    <div style={style}> {/* Aplica el estilo al div */}
      <Image
        src={"/assets/img/" + icono}
        alt={""}
        width={width || 24}
        height={height || 24}
        onClick={onClick}
      />
    </div>
  );
}