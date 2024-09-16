package agro.parcelas.modelo;

import java.util.UUID;

import agro.lotes.modelo.LoteModelo;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "parcelas")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ParcelaModelo {

    @Id
    @GeneratedValue
    private UUID id;

    private String nombre;
    private String coordenadas;
    private String superficie;

    @ManyToOne
    @JoinColumn(name = "id_lote")
    private LoteModelo lote;
}
