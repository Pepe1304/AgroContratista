package agro.establecimientos;

import java.util.UUID;
import java.util.List;
import org.springframework.stereotype.Service;
import agro.establecimientos.modelo.EstablecimientoModelo;
import agro.establecimientos.repositorio.EstablecimientoRepositorio;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service

public class EstablecimientoCampo {
    private final EstablecimientoRepositorio establecimientoRepositorio;

    /* Guardar Establecimiento */
    public void guardarEstablecimiento(EstablecimientoModelo establecimientoNuevo) {
        if (establecimientoNuevo == null) {
            throw new IllegalArgumentException("El establecimiento proporcionada es nulo.");
        }

        String nombreString = establecimientoNuevo.getCoordenadasEstablecimiento();
        if (establecimientoRepositorio.existsByNombre(nombreString)) {
            throw new IllegalArgumentException("Ya existe ese establecimiento con el mismo documento.");
        }

        establecimientoRepositorio.save(establecimientoNuevo);
    }

    /* Lista Establecimiento */
    public List<EstablecimientoModelo> listaEstablecimiento() {

        return establecimientoRepositorio.findAll();
    }

    /* Eliminar Establecimiento */
    public void eliminarEstablecimientoPorId(String idEstablecimiento) {
        establecimientoRepositorio.deleteById(UUID.fromString(idEstablecimiento));
    }

    /* Obtener Establecimiento */
    public EstablecimientoModelo obtenerEstablecimientoPorId(String idEstablecimiento) {
        return establecimientoRepositorio.findById(UUID.fromString(idEstablecimiento))
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));

    }

    /* Modificar Establecimiento */
    public void modificarEstablecimientoPorId(EstablecimientoModelo establecimientoActualizado) {

        EstablecimientoModelo establecimientoExistente = establecimientoRepositorio.findById(establecimientoActualizado.getId()).orElseThrow(() -> new RuntimeException("Establecimiento no encontrado"));
        establecimientoExistente.setIdPersona(establecimientoActualizado.getIdPersona());
        establecimientoExistente.setLugar(establecimientoActualizado.getLugar());
        establecimientoExistente.setCoordenadasEstablecimiento(establecimientoActualizado.getCoordenadasEstablecimiento());
        establecimientoExistente.setSuperficieEstablecimiento(establecimientoActualizado.getSuperficieEstablecimiento());
        establecimientoExistente.setParcelas(establecimientoActualizado.getParcelas());
        establecimientoRepositorio.save(establecimientoExistente);

    }

}
