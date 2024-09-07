package agro.lotes;

import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import agro.lotes.modelo.LoteModelo;
import agro.lotes.repositorio.LoteRepositorio;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service

public class LoteCampo {
    private final LoteRepositorio loteRepositorio;

    // /* Guardar Lote */
    public void guardarLotes(LoteModelo loteNuenvo) {

        if (loteNuenvo == null) {
            throw new IllegalArgumentException("El establecimiento proporcionada es nulo.");
        }

        String nombreString = loteNuenvo.getNombre();
        if (loteRepositorio.existsByNombre(nombreString)) {
            throw new IllegalArgumentException("Ya existe ese establecimiento con ese nombre.");
        }

        loteRepositorio.save(loteNuenvo);

    }

    /* Eliminar Lotes */
    public void eliminarLotePorId(String idLote) {
        loteRepositorio.deleteAllById(UUID.fromString(idLote));
        // loteRepositorio.deleteAllById(UUID.fromString(idLote));
    }

    /* Lista Lotes */
    public List<LoteModelo> listaLote() {
        return loteRepositorio.findAll();
    }

    // /* Modificar Lote */
    public void modificarLotePorId(LoteModelo loteActualizado) {
        LoteModelo loteExistente = loteRepositorio.findById(loteActualizado.getId())
                .orElseThrow(() -> new RuntimeException("Lote no encontrado"));
        loteExistente.setNombre(loteActualizado.getNombre());
        loteExistente.setCoordenadas(loteActualizado.getCoordenadas());
        loteExistente.setSuperficie(loteActualizado.getSuperficie());
        loteExistente.setEstablecimiento(loteActualizado.getEstablecimiento());
        loteExistente.setParcelas(loteActualizado.getParcelas());
        loteRepositorio.save(loteExistente);
    }
}
