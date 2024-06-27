"use client";

import React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { Toolbar as MuiToolbar, Stack, Typography } from "@mui/material";
import List from "@mui/material/List";
import { IconButton as MuiIconButton } from "@mui/material";
import ElementoLista from "./ElementoLista";
import IconoPersonalizado from "../icon/IconoPersonalizado";
import { useRouter } from "next/navigation";
import MenuIconMaterial from "@mui/icons-material/Menu";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(6)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    marginLeft: `calc(${theme.spacing(7)} + 1px)`,
    width: `calc(100% - ${theme.spacing(7)} - 1px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const StyledToolbar = styled(MuiToolbar)({
  backgroundColor: "#4CAF50",
  color: "#FFF",
  height: "80px",
  padding: "0 16px",
  boxShadow: "0px 1px 10px 1px rgba(0,0,0,0.1)",
  fontFamily: "var(--font-sans)", // Aplicar la fuente sans-serif
});

const StyledIconButton = styled(MuiIconButton)({
  color: "#FFF",
});

const CustomTypography = styled(Typography)({
  fontFamily: "var(--font-serif)", // Aplicar la fuente serif
});

const MenuIcon = styled(MenuIconMaterial)({
  fontSize: "32px",
});

interface ElementoListaProps {
  key: string;
  icon: React.ReactNode;
  open: boolean;
  text: string;
  onClick: () => void;
  selected: boolean;
  tooltipText: string;
  disableHoverBackground?: boolean; // Nueva prop para deshabilitar el fondo al pasar el cursor
}

export default function MenuPrincipal({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (index: number, path: string) => {
    setSelectedIndex(index);
    router.push(path);
  };

  const items = [
    {
      text: "Dashboard",
      icon: <IconoPersonalizado icono={"panel.png"} width={32} height={32} />,
      path: "/dashboard",
      tooltip: "Dashboard",
    },
    {
      text: "Agricultor/Ganadero",
      icon: (
        <IconoPersonalizado icono={"granjero.png"} width={32} height={32} />
      ),
      path: "/agricultor",
      tooltip: "Agricultor/Ganadero",
    },
    {
      text: "Establecimiento",
      icon: (
        <IconoPersonalizado
          icono={"establecimiento.png"}
          width={32}
          height={32}
        />
      ),
      path: "/establecimiento",
      tooltip: "Establecimiento",
    },
    {
      text: "Cultivos",
      icon: (
        <IconoPersonalizado icono={"cultivos.png"} width={32} height={32} />
      ),
      path: "/cultivos",
      tooltip: "Cultivos",
    },
    {
      text: "Productos",
      icon: (
        <IconoPersonalizado icono={"productos.png"} width={32} height={32} />
      ),
      path: "/productos",
      tooltip: "Productos",
    },
    {
      text: "Servicios",
      icon: (
        <IconoPersonalizado icono={"servicios.png"} width={32} height={32} />
      ),
      path: "/servicios",
      tooltip: "Servicios",
    },
    {
      text: "Entidades",
      icon: (
        <IconoPersonalizado icono={"entidades.png"} width={32} height={32} />
      ),
      path: "/entidades",
      tooltip: "Entidades",
    },
    {
      text: "Documentos",
      icon: (
        <IconoPersonalizado icono={"documentos.png"} width={32} height={32} />
      ),
      path: "/documentos",
      tooltip: "Documentos",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#0FB60B" }}>
        <StyledToolbar>
          <StyledIconButton
            color="inherit"
            aria-label={open ? "close drawer" : "open drawer"}
            onClick={() => setOpen(!open)} // Modificar el onClick para alternar entre abrir y cerrar el menú
            edge="start"
          >
            <MenuIcon />
          </StyledIconButton>
        </StyledToolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader></DrawerHeader>
        <List>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconoPersonalizado
              icono="tractores.png"
              width={32}
              height={32}
              style={{ marginTop: "-85px", marginLeft: "15px" }}
            />
            <CustomTypography
              variant="h6"
              style={{
                marginTop: "-85px",
                paddingLeft: "2px",
                color: "#EC9107",
                letterSpacing: "1px",
              }}
            >
              AgroContratistas
            </CustomTypography>
          </Stack>
        </List>
        <List sx={{ marginTop: 2 }}>
          {items.map((item, index) => (
            <ElementoLista
              key={item.text}
              icon={item.icon}
              open={open}
              text={item.text}
              onClick={() => handleListItemClick(index + 1, item.path)}
              selected={selectedIndex === index + 1}
              tooltipText={item.tooltip}
              //disableHoverBackground={undefined}
            />
          ))}
        </List>
        <div style={{ marginTop: "auto" }}>
          <List>
            <ElementoLista
              icon={
                <IconoPersonalizado
                  icono={"salir.png"}
                  width={32}
                  height={32}
                />
              }
              open={open}
              text={"Cerrar Sesión"}
              onClick={() => {
                router.push("/auth/container");
              }}
              selected={false}
              tooltipText={""}
            />
          </List>
        </div>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: open
            ? `${drawerWidth}px`
            : `calc(${theme.spacing(7)} + 1px)`,
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          fontFamily: "var(--font-sans)",
        }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
