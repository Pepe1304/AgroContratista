package agro.establecimientos.modelo;

import java.util.List;
import java.util.UUID;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/*Representan las entidades o estructuras de datos de la aplicacion.Representa una  Tabla en la Base de Datos = Entidad*/

@Entity(name = "establecimientos")
@NoArgsConstructor
@AllArgsConstructor
@Data

public class EstablecimientoModelo {

    @Id /* Indica que el campo id es la clave primaria de la entidad. */
    @GeneratedValue /* Indica que Id se generará automáticamente */

    private UUID id;
    private UUID idPersona;
    private String lugar;
    private String coordenadasEstablecimiento;
    private String superficieEstablecimiento;
    List<String> parcelas;

}
