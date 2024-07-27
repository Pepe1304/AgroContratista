// package agro.parcelas.controlador;

// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RestController;
// import agro.parcelas.ParcelasCampo;
// import agro.parcelas.modelo.ParcelaModelo;
// import lombok.RequiredArgsConstructor;

// @RestController
// // @RequestMapping("/api/establecimientos")
// @RequiredArgsConstructor
// @CrossOrigin(origins = "*")

// public class ParcelasControlador {
//     private final ParcelasCampo parcelasCampo;

//      @PostMapping
//     /* Metodo para Guardar Establecimientos */
//     public void guardarParcela(@SuppressWarnings("rawtypes") @RequestBody ParcelaModelo parcelaNueva) {
//         try {
//             parcelasCampo.guardarParcela(parcelaNueva);
//         } catch (Exception e) {
//             e.printStackTrace();
//         }

//     }
// }
