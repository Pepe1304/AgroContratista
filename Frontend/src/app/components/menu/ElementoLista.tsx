"use client";

import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  TooltipProps,
  tooltipClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface ElementoListaProps {
  icon: React.ReactNode;
  open: boolean;
  text: string;
  onClick: () => void;
  selected: boolean;
  tooltipText: string;
  disableSelectedColor?: boolean;
  customStyle?: React.CSSProperties; // Add customStyle prop
}

const CustomTooltip = styled(
  ({ className, ...props }: TooltipProps & { className?: string }) => (
    <Tooltip {...props} classes={{ popper: className }} arrow />
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#000000", // Aquí puedes cambiar el color de fondo
    color: "white", // Cambia el color del texto si es necesario
    fontSize: theme.typography.pxToRem(12),
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#000000", // Aquí cambias el color de la punta de la flecha
  },
}));

const CustomListItemText = styled(ListItemText)(({ theme }) => ({
  "& .MuiListItemText-primary": {
    fontFamily: "var(--font-sans)",
  },
}));

export default function ElementoLista({
  icon,
  open,
  text,
  onClick,
  selected,
  tooltipText,
  disableSelectedColor = false,
  customStyle,
}: ElementoListaProps) {
  return (
    <CustomTooltip title={tooltipText} placement="right" arrow>
      <ListItem
        button
        selected={selected}
        onClick={onClick}
        sx={{
          backgroundColor: selected
            ? disableSelectedColor
              ? "transparent"
              : "inherit"
            : "inherit",
          "&.Mui-selected": {
            "& .MuiListItemText-primary": {
              color: disableSelectedColor ? "inherit" : "#4CAF50",
              fontFamily: "var(--font-sans)",
            },
          },
          ...customStyle,
        }}
      >
        <ListItemIcon sx={{ fontFamily: "var(--font-serif)" }}>
          {icon}
        </ListItemIcon>
        <CustomListItemText primary={text} />
      </ListItem>
    </CustomTooltip>
  );
}
