package agro.lotes.controlador;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import agro.lotes.LoteCampo;
import agro.lotes.modelo.LoteModelo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/lotes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")

public class LotesControlador {
    private final LoteCampo loteCampo;

    @PostMapping
    /* Metodo para Guardar Lotes */
    public void guardarLotes(@RequestBody LoteModelo loteNuevo) {
        try {
            loteCampo.guardarLotes(loteNuevo);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
     /* Metodo para List Lotes en el DataTable */
    @GetMapping
    public List<LoteModelo> getListaLotes() {
        return loteCampo.listaLote();
    }

    /* Metodo para Eliminar Lotes */
    @DeleteMapping("{id}")
    public void eliminarLotes(@PathVariable("id") String id) {
        loteCampo.eliminarLotePorId(id);

    }

    /* Metodo para Modificar Datos del Lote */
    @PutMapping()
    public void modificarLote(@RequestBody LoteModelo LoteActualizado) {
        try {
            loteCampo.modificarLotePorId(LoteActualizado);
        } catch (Exception e) {

            e.printStackTrace();
        }

    }

}
