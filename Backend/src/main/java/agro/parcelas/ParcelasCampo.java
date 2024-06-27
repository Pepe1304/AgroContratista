package agro.parcelas;

import java.util.UUID;
import java.util.List;
import org.springframework.stereotype.Service;
import agro.parcelas.modelo.ParcelaModelo;
import agro.parcelas.repositorio.ParcelasRepositorio;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service

public class ParcelasCampo {

    private final ParcelasRepositorio parcelasRepositorio;

    /* Guardar Parcelas */
    public void guardarParcela(ParcelaModelo parcelaNueva) {
        if (parcelaNueva == null) {
            throw new IllegalArgumentException("La parcela proporcionada es nulo.");
        }

        String nombreString = parcelaNueva.getCoordenadasParcelas();
        if (parcelasRepositorio.existsByNombre(nombreString)) {
            throw new IllegalArgumentException("Ya existe una parcela con el mismo nombre.");
        }

        parcelasRepositorio.save(parcelaNueva);
    }

    /* Lista Parcelas */
    public List<ParcelaModelo> listaParcela() {

        return parcelasRepositorio.findAll();
    }

    /* Eliminar Parcelas */
    public void eliminarParcelaPorId(String idParcela) {
        parcelasRepositorio.deleteById(UUID.fromString(idParcela));
    }

    /* Obtener Parcelas */
    public ParcelaModelo obtenerParcelaPorId(String idParcela) {
        return parcelasRepositorio.findById(UUID.fromString(idParcela)).orElseThrow(() -> new RuntimeException("Persona no encontrada"));

    }

    /* Modificar Parcelas */
    public void modificarParcelaPorId(ParcelaModelo parcelaActualizada) {

        ParcelaModelo parcelaExistente = parcelasRepositorio.findById(parcelaActualizada.getId()).orElseThrow(() -> new RuntimeException("Establecimiento no encontrado"));
        parcelaExistente.setNombre(parcelaActualizada.getNombre());
        parcelaExistente.setCoordenadasParcelas(parcelaActualizada.getCoordenadasParcelas());
        parcelaExistente.setSuperficieParcela(parcelaActualizada.getSuperficieParcela());
        parcelasRepositorio.save(parcelaExistente);

    }
}
