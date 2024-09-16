
export const verificarLogin = async (router) => {
  if (typeof window !== "undefined") {
    try {
      // Agrega un console.log para verificar el contenido de localStorage
      console.log("Contenido de localStorage en verificarLogin antes de la verificación:", localStorage.getItem("Login"));

      const login = JSON.parse(localStorage.getItem("Login"));
      
      if (login && login.loginCorrecto === true) {
        router.push("/dashboard");
      } else {
        router.push("/auth/container");
      }
  
    } catch (error) {
      console.error("Error al verificar login:", error);
      return false;
    }
  }

  return false;
};