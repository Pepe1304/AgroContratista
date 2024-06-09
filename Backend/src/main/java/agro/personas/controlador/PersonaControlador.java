package agro.personas.controlador;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import agro.personas.PersonaCliente;
import agro.personas.modelo.PersonaModelo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/agricultor")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")

public class PersonaControlador {

    private final PersonaCliente personaCliente;

    @PostMapping
    /* Metodo para Guardar Clientes */
    public void guardarPersona(@RequestBody PersonaModelo personasNuevas) {
        try {
            personaCliente.guardarPersona(personasNuevas);
        } catch (Exception e) {
            e.printStackTrace();

        }

    }

    /* Metodo para List Clientes en el DataTable */
    @GetMapping
    public List<PersonaModelo> getListaPeronas() {
        return personaCliente.listaPersona();
    }

    /*Metodo para Eliminar Clientes */
    @DeleteMapping("{id}")
    public void eliminarPersona(@PathVariable("id") String id) {
        personaCliente.eliminarPersonaPorId(id);

    }

    /*Metodo para Modificar Datos del Cliente */
      @PutMapping()
     public void modificarPersona( @RequestBody PersonaModelo personaActualizada) {
         try {
             personaCliente.modificarPersonaPorId(personaActualizada);
         } catch (Exception e) {
             e.printStackTrace();
         }
    }

    @GetMapping("{id}")
    public PersonaModelo obtenerPersona(@PathVariable("id") String id) {
       return personaCliente.obtenerPersonaPorId(id);

    }

}
