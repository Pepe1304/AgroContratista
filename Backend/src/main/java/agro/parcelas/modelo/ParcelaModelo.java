package agro.parcelas.modelo;

import java.util.UUID;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "parcelas")
@NoArgsConstructor
@AllArgsConstructor
@Data

public class ParcelaModelo {
    @Id /* Indica que el campo id es la clave primaria de la entidad. */
    @GeneratedValue /* Indica que Id se generará automáticamente */

    private UUID id;
    private String nombre;
    private String coordenadasParcelas;
    private String superficieParcela;
    private String usoParcela;// • Uso de la parcela (cultivo específico, pastoreo, etc.)
}
