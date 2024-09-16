package agro.parcelas.controlador;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import agro.parcelas.ParcelasCampo;
import agro.parcelas.modelo.ParcelaModelo;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/parcelas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")

public class ParcelasControlador {
    private final ParcelasCampo parcelasCampo;

    @PostMapping
    /* Metodo para Guardar Parcelas */
    public void guardarParcela(@RequestBody ParcelaModelo parcelaNueva) {
        try {
            parcelasCampo.guardarParcela(parcelaNueva);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    /* Metodo para List Parcelas en el DataTable */
    @GetMapping
    public List<ParcelaModelo> getListaParcelas() {
        return parcelasCampo.listaParcela();
    }

    /* Metodo para Eliminar Parcelas */
    @DeleteMapping("{id}")
    public void eliminarParcelas(@PathVariable("id") String id) {
        parcelasCampo.eliminarParcelaPorId(id);
    }

    /* Metodo para Modificar Datos del Parcelas */
    @PutMapping()
    public void modificarParcelas(@RequestBody ParcelaModelo parcelasActualizadas) {
        try {
            parcelasCampo.modificarParcelaPorId(parcelasActualizadas);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @GetMapping("{id}")
    public ParcelaModelo obtenerParcelas(@PathVariable("id") String id) {
        return parcelasCampo.obtenerParcelaPorId(id);
    }
}