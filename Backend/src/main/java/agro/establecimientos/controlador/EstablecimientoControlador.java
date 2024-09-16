 package agro.establecimientos.controlador;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
 import org.springframework.web.bind.annotation.DeleteMapping;
 import org.springframework.web.bind.annotation.GetMapping;
 import org.springframework.web.bind.annotation.PathVariable;
 import org.springframework.web.bind.annotation.RequestMapping;
 import org.springframework.web.bind.annotation.RestController;
 import agro.establecimientos.EstablecimientoCampo;
 import agro.establecimientos.modelo.EstablecimientoModelo;
 import lombok.RequiredArgsConstructor;
 import org.springframework.web.bind.annotation.PostMapping;
 import org.springframework.web.bind.annotation.PutMapping;
 import org.springframework.web.bind.annotation.RequestBody;

 @RestController
 @RequestMapping("/api/establecimiento")
 @RequiredArgsConstructor
 @CrossOrigin(origins = "*")

 public class EstablecimientoControlador {
     private final EstablecimientoCampo establecimientoCampo;

    @PostMapping
    /* Metodo para Guardar Establecimientos */
     public void guardarEstablecimiento(@RequestBody EstablecimientoModelo establacimientoNuevo) {
         try {
             establecimientoCampo.guardarEstablecimiento(establacimientoNuevo);
             
         } catch (Exception e) {
             e.printStackTrace();
         }

     }

     /* Metodo para List Establecimientos en el DataTable */
     @GetMapping
     public List<EstablecimientoModelo> getListaEstablecimientos() {
         return establecimientoCampo.listaEstablecimiento();
     }

    /* Metodo para Eliminar Establecimiento */
    @DeleteMapping("{id}")
     public void eliminarEstablecimientos(@PathVariable("id") String id) {
         establecimientoCampo.eliminarEstablecimientoPorId(id);

    }

     /* Metodo para Modificar Datos del Establecimiento */
    @PutMapping()
     public void modificarEstablecimiento(@RequestBody EstablecimientoModelo EstablecimientoActualizado) {
       try {
            establecimientoCampo.modificarEstablecimientoPorId(EstablecimientoActualizado);
         } catch (Exception e) {
            e.printStackTrace();
         }
     }

     @GetMapping("{id}")
    public EstablecimientoModelo obtenerEstablecimiento(@PathVariable("id") String id) {
        return establecimientoCampo.obtenerEstablecimientoPorId(id);

    }

 }
