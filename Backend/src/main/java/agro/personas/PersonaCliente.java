package agro.personas;

import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import agro.personas.modelo.PersonaModelo;
import agro.personas.repositorio.PersonaRepositorio;
import lombok.RequiredArgsConstructor;

/*Persona contienen la lógica de negocio de la aplicación.Logica de negocio @Persona*/
@RequiredArgsConstructor
@Service

public class PersonaCliente {

    private final PersonaRepositorio personaRepositorio;

    /* Guardar Persona */
    public void guardarPersona(PersonaModelo personaNueva) {
        if (personaNueva == null) {
            throw new IllegalArgumentException("La persona proporcionada es nula.");
        }

        String documentoString = personaNueva.getDocumento();
        if (personaRepositorio.existsByDocumento(documentoString)) {
            throw new IllegalArgumentException("Ya existe una persona con el mismo documento.");
        }

        personaRepositorio.save(personaNueva);
    }

    /* Lista Persona */
    public List<PersonaModelo> listaPersona() {

        return personaRepositorio.findAll();
    }

    /* Eliminar Persona */
    public void eliminarPersonaPorId(String idPersona) {
        personaRepositorio.deleteById(UUID.fromString(idPersona));
    }

    /* Obtener Persona */
    public PersonaModelo obtenerPersonaPorId(String idPersona) {
        return personaRepositorio.findById(UUID.fromString(idPersona))
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));

    }

    /* Modificar Persona */
    public void modificarPersonaPorId(PersonaModelo personaActualizada) {

        PersonaModelo personaExistente = personaRepositorio.findById(personaActualizada.getId())
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));
        personaExistente.setRazonSocial(personaActualizada.getRazonSocial());
        personaExistente.setDireccion(personaActualizada.getDireccion());
        personaExistente.setTelefono(personaActualizada.getTelefono());
        personaExistente.setMail(personaActualizada.getMail());
        personaExistente.setLugar(personaActualizada.getLugar());
        personaExistente.setCondFrenteIva(personaActualizada.getCondFrenteIva());
        personaExistente.setDocumento(personaActualizada.getDocumento());
        personaRepositorio.save(personaExistente);

    }

}
